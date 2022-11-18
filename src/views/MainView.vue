<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<v-card-title class="mt-2"> PET LIST </v-card-title>
				<v-banner color="pink-darken-1" icon="mdi-account-box" lines="two">
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>

					<v-banner-text v-if="!userInfo.isLogined">
						로그인 후 자신의 그룹을 생성해 Pet의 정보를 관리해보세요!
					</v-banner-text>
					<v-banner-text v-else>
						Pet 추가가 가능하고 상세정보를 확인할 수 있어요.
					</v-banner-text>
					<v-banner-actions v-if="!userInfo.isLogined" class="mt-1">
						<v-btn @click="$router.push('/login')">로그인 하기</v-btn>
					</v-banner-actions>
					<v-banner-actions v-if="userInfo.isLogined" class="mt-1">
						<groupInsert
							v-if="userInfo.isLogined && groupList.total === 0"
							@update:groupList="fetchGroupList"
						>
						</groupInsert>
					</v-banner-actions>
				</v-banner>
				<template v-if="groupList.total > 0 && userInfo.isLogined">
					<v-slide-group
						v-model="model"
						class="pa-2"
						selected-class="bg-primary"
						show-arrows
					>
						<v-slide-group-item
							v-for="item in myPetList"
							:key="item"
							v-slot="{
								//  isSelected,
								toggle,
								selectedClass,
							}"
						>
							<v-card
								color="grey-lighten-5"
								:class="['ma-2', selectedClass]"
								height="80"
								width="80"
								@click="toggle"
							>
								<div class="d-flex fill-height align-center justify-center">
									<v-scale-transition>
										{{ item.name }}
									</v-scale-transition>
								</div>
							</v-card>
						</v-slide-group-item>
						<v-slide-group-item>
							<PetInsert
								color="grey-lighten-5"
								:group-info="groupInfo"
								@update:groupList="fetchGroupList"
							></PetInsert>
						</v-slide-group-item>
					</v-slide-group>
				</template>
				<v-expand-transition>
					<v-sheet v-if="model != null" height="200">
						<div class="d-flex justify-center">
							<v-col>
								<v-card
									min-width="330"
									:title="`이름 : ${myPetList[model].name}`"
									:subtitle="`생일 :
							${myPetList[model].birthDate}`"
								>
									<v-card-text>
										<div class="mt-1 my-4 text-subtitle-1">
											• 종류 : {{ myPetList[model].speices }}
										</div>
										<div class="my-4 text-subtitle-1">
											• 성별 : {{ myPetList[model].genderStatus }}
										</div>
										<div class="my-4 text-subtitle-1">
											• 품종 : {{ myPetList[model].breed }}
										</div>
									</v-card-text>
								</v-card>
							</v-col>
						</div>
						<div style="display: flex; justify-content: center">
							<v-btn class="ma-3"> 상세보기 </v-btn>
							<v-btn class="ma-3"> 정보수정 </v-btn>
							<v-btn
								class="ma-3"
								@click="fetchDeletePetByMyGroup(myPetList[model])"
							>
								펫 삭제
							</v-btn>
						</div>
					</v-sheet>
				</v-expand-transition>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTokenAuthCodeResult } from '@/api/oauthApi';
import {
	getGroupList,
	getBundle,
	updateGroup,
	// deletePatient,
} from '@/api/fhirApi';
import { useAuthStore } from '@/stores/auth';
import * as OpenAPI from '@/assets/js/sdk/openApi';

import PetInsert from '@/components/pet/PetInsert.vue';
import groupInsert from '@/components/group/GroupInsert.vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';

const model = ref(null);

/**
 * 로그인 후  회원 정보 store에 담기
 */
const store = useAuthStore();
const userInfo = useAuthStore().userInfo;
const oauth = useAuthStore().oauth;
const { SET_LOGIN, SET_OAUTH, SET_GROUPLIST, CLEAR_GROUPLIST } = store;

const router = useRouter();
// 회원 정보 조회
const btnFetchUserInfo = async token => {
	const configToken = {
		baseUrl: 'https://api.redwoodhealth.kr',
		accessToken: token,
	};
	await OpenAPI.fetchUserInfo(configToken)
		.then(response => {
			console.log('response', response);
			SET_LOGIN(response);
			router.replace('/');
			fetchGroupList();
		})
		.catch(error => {
			console.error(error);
		});
};
const groupList = ref(useAuthStore().groupList);
const groupInfo = ref(null);
const fetchGroupList = async () => {
	const {
		data: { total },
		data: { entry },
	} = await getGroupList(userInfo.patientId);
	if (total > 0) {
		groupInfo.value = entry[0];
		const {
			resource: { quantity },
			resource: { name },
			resource: { member },
		} = entry[0];
		SET_GROUPLIST(total, name, quantity, member);
		if (quantity > 0) {
			fetchBundlePetList(member);
		} else {
			myPetList.value = [];
			model.value = null;
		}
	}
	if (total === 0) {
		CLEAR_GROUPLIST();
	}
};

/**
 * 펫 bundle 조회 요청
 */
const myPetList = ref([]);
const fetchBundlePetList = async member => {
	let requestList = [];
	member.forEach((el, idx) => {
		requestList[idx] = {
			request: {
				method: 'GET',
				url: el.entity.reference,
			},
		};
	});
	const resource = {
		resourceType: 'Bundle',
		type: 'batch',
		entry: requestList,
	};
	const {
		data: { entry },
	} = await getBundle(resource);
	myPetList.value = [];
	model.value = null;
	entry.forEach((el, idx) => {
		let extensionArr = el.resource.extension;
		let extension;
		if (extensionArr) {
			extension = extensionArr[0].extension;
		}
		myPetList.value[idx] = {
			active: el.resource.active,
			birthDate: el.resource.birthDate,
			id: el.resource.id,
			animalNum: el.resource.identifier[0].value
				? el.resource.identifier[0].value
				: null,
			name: el.resource.name[0].text,
			speices: extension
				? extension[extension.findIndex(i => i.url === 'species')]
						.valueCodeableConcept.coding[0].display
				: null,
			breed: extension
				? extension[extension.findIndex(i => i.url === 'breed')]
						.valueCodeableConcept.coding[0].display
				: null,
			genderStatus: extension
				? extension[extension.findIndex(i => i.url === 'genderStatus')]
						.valueCodeableConcept.coding[0].display
				: null,
		};
	});
};
/**
 * url에 token 있는지 체크
 */
const route = useRoute();
let lsearch = ref(location.search);
const isCode = ref(route.query.code);
const tokenResultSet = async () => {
	if (lsearch.value != undefined && isCode.value) {
		let lsearchSplit = lsearch.value.split('&');
		let code = lsearchSplit[0].split('=')[1];
		const response = await getTokenAuthCodeResult(code);
		SET_OAUTH(response);
		btnFetchUserInfo(response.access_token);
	} else {
		return;
	}
};

/**
 * 펫 삭제
 */
const fetchDeletePetByMyGroup = petInfo => {
	expectedMyGroupSelectedPet(petInfo);
};

/**
 * Selected Pet expected at My Group
 */
const expectedMyGroupSelectedPet = async petInfo => {
	console.log('petInfo', petInfo);
	let memberList = groupList.value.memberList;
	let findIndex = memberList.findIndex(
		i => i.entity.reference === `Patient/${petInfo.id}`,
	);
	if (findIndex < 0) {
		return false;
	} else {
		delete memberList[findIndex];
	}
	console.log('memeberList', memberList);
	const resource = {
		resourceType: 'Group',
		identifier: [
			{
				system: 'https://redwoodplatformtest-chohbin.netlify.app',
				value: userInfo.patientId,
			},
		],
		active: true,
		type: 'animal',
		actual: true,
		name: groupList.value.name,
		quantity: groupList.value.memberTotal - 1,
		member: [memberList],
	};
	try {
		const response = await updateGroup(userInfo.patientId, resource);
		console.log('deleteResponse', response);
		fetchGroupList();
	} catch (error) {
		console.error(error);
	}
};
/**
 * Delete patient Id
 */
// const delteSelctedPetPatientId = async petInfo => {
// 	try {
// 		const response = await deletePatient(petInfo.id);
// 		console.log('response', response);
// 		alert('펫 삭제 성공');
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

onMounted(() => {
	tokenResultSet();
	if (oauth.accessToken) btnFetchUserInfo(oauth.accessToken);
});
</script>

<style lang="scss" scoped></style>
