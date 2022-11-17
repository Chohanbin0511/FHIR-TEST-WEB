<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<template v-if="groupList.total === 0">
					<groupInsert @update:groupList="fetchGroupList"> </groupInsert
				></template>

				<template v-if="groupList.total > 0">
					<v-card-title class="mt-2"> PET LIST </v-card-title>
					<v-banner color="pink-darken-1" icon="mdi-account-box" lines="two">
						<template v-slot:prepend>
							<v-avatar></v-avatar>
						</template>

						<v-banner-text>
							Pet 추가가 가능하고 상세정보를 확인할 수 있다.
						</v-banner-text>

						<v-banner-actions class="mt-1">
							<PetInsert
								:group-info="groupInfo"
								@update:groupList="fetchGroupList"
							></PetInsert>
						</v-banner-actions>
					</v-banner>
					<v-slide-group
						v-model="model"
						class="pa-2"
						selected-class="bg-primary"
						show-arrows
					>
						<v-slide-group-item
							v-for="item in myPetList"
							:key="item"
							v-slot="{ isSelected, toggle, selectedClass }"
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
										<v-icon
											v-if="isSelected"
											color="white"
											size="48"
											icon="mdi-close-circle-outline"
										></v-icon>
										{{ item.name }}
									</v-scale-transition>
								</div>
							</v-card>
						</v-slide-group-item>
					</v-slide-group>
				</template>
				<v-expand-transition>
					<v-sheet v-if="model != null" height="200">
						<div class="d-flex justify-center">
							<v-card
								min-width="300"
								:title="`Name : ${myPetList[model].name}`"
								:subtitle="`BirthDay :
							${myPetList[model].birthDate}`"
							>
								<v-card-text>
									<div class="mt-1 my-4 text-subtitle-1">
										• 품종 : {{ myPetList[model].speices }}
									</div>
									<div class="my-4 text-subtitle-1">
										• 성별 : {{ myPetList[model].genderStatus }}
									</div>
									<div class="my-4 text-subtitle-1">
										• 종류 : {{ myPetList[model].speices }}
									</div>
									<div class="my-4 text-subtitle-1">
										• 품종 : {{ myPetList[model].breed }}
									</div>
								</v-card-text>
							</v-card>
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
import { getGroupList, getBundle } from '@/api/fhirApi';
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
		fetchBundlePetList(member);
	}
	if (total === 0) {
		CLEAR_GROUPLIST();
	}
};

/**
 * 팻 bundle 조회 요청
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
	console.log('entry', entry);
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
	console.log('tq', myPetList.value);
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

onMounted(() => {
	tokenResultSet();
	if (oauth.accessToken) btnFetchUserInfo(oauth.accessToken);
});

// // 가족 생성
// const createFamily = () => {
// 	console.log('가족생성 버튼 클릭');
// 	// todo patient
// 	// 1.생성 입력 폼 만든후 제출 => patient 정상 생성되면
// 	// 2. phr 공유자에 추가
// };
</script>

<style lang="scss" scoped></style>
