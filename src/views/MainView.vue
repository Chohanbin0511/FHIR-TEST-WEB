<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container class="pb-0">
				<v-card-title class="mt-2"> Main </v-card-title>
				<v-banner
					class="rounded-lg"
					color="pink-darken-1"
					icon="mdi-account-box"
					lines="two"
				>
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>

					<v-banner-text v-if="!userInfo.isLogined">
						로그인 후 자신의 그룹을 생성해 Pet의 정보를 관리해보세요!
					</v-banner-text>
					<v-banner-text v-else class="d-flex fill-height align-center">
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
			</v-container>
			<v-container class="pt-0 pb-0">
				<template v-if="groupList.total > 0 && userInfo.isLogined">
					<v-card-title> Group Info</v-card-title>
					<v-banner
						color="orange-darken-1"
						icon="mdi-account-multiple"
						lines="one"
						class="rounded-lg"
					>
						<template v-slot:prepend>
							<v-avatar> </v-avatar>
						</template>
						<v-banner-text class="d-flex fill-height align-center">
							그룹명 : {{ groupList.name }}
						</v-banner-text>
					</v-banner>
				</template>
				<template v-if="groupList.total > 0 && userInfo.isLogined">
					<!-- class="pa-2" -->
					<v-slide-group
						v-model="model"
						selected-class="bg-indigo-lighten-5"
						show-arrows
					>
						<v-slide-group-item
							v-for="item in myPetList"
							:key="item"
							v-slot="{ toggle, selectedClass }"
						>
							<v-chip
								class="ma-2"
								:class="selectedClass"
								color="indigo-lighten-2"
								style="background-color: white"
								variant="outlined"
								@click="toggle"
							>
								<!-- {{ toggle }} -->
								<v-icon icon="mdi-dog-side"></v-icon>
								<div class="d-flex fill-height align-center justify-center">
									<v-scale-transition>
										{{ item.name }}
									</v-scale-transition>
								</div>
							</v-chip>
							<!-- </v-card> -->
						</v-slide-group-item>
						<v-slide-group-item>
							<!-- color="grey-lighten-5" -->
							<PetInsert
								:group-info="groupInfo"
								@update:groupList="fetchGroupList"
							></PetInsert>
						</v-slide-group-item>
					</v-slide-group>
				</template>
				<!-- <v-expand-transition class="rounded-lg">
					<v-sheet v-if="model != null"> -->
			</v-container>
			<v-container v-if="model != null" class="pt-0 pb-0">
				<!-- <v-card> -->
				<!-- <div class="d-flex justify-center"> -->
				<!-- <v-col> -->
				<v-card
					class="pa-2 mb-2 rounded-xl"
					min-width="330"
					:title="`${myPetList[model].name}`"
					:subtitle="`생일 :
							${myPetList[model].birthDate}`"
				>
					<template v-slot:append>
						<v-btn
							icon="mdi-pencil"
							size="x-small"
							color="green"
							@click="clickTest"
						></v-btn>
						<v-btn
							class="ml-1"
							icon="mdi-lock-open-variant-outline"
							size="x-small"
							color="red"
							@click="fetchDeletePetByMyGroup(myPetList[model])"
						></v-btn>
						<!-- @click="" -->
						<!-- <div>•••</div> -->
					</template>
					<v-card-text class="pb-1">
						<div>
							<span class="text-subtitle-1" style="border-radius: 1px">
								• 종 류 :
							</span>
							<v-chip color="indigo-lighten-2" variant="outlined">
								{{ myPetList[model].speices }}
							</v-chip>
						</div>
						<div>
							<span class="text-subtitle-1"> • 성 별 : </span>
							<v-chip class="ma-1" color="indigo-lighten-2" variant="outlined">
								{{ myPetList[model].genderStatus }}
							</v-chip>
						</div>
						<div>
							<span class="text-subtitle-1"> • 품 종 : </span>
							<v-chip color="indigo-lighten-2" variant="outlined">
								{{ myPetList[model].breed }}
							</v-chip>
						</div>
					</v-card-text>
					<!-- </v-card> -->
					<!-- <v-card-text> ※ PET의 정보를 나타냅니다.</v-card-text> -->
					<!-- </v-col> -->
					<!-- </div> -->
				</v-card>
				<div style="display: flex; justify-content: center">
					<v-btn
						v-for="detail in detailPetInfoList"
						:key="detail"
						class="ma-1"
						:color="
							nowBottomTab === detail.id
								? 'indigo-lighten-5'
								: 'indigo-lighten-6'
						"
						@click="nowBottomTab = detail.id"
					>
						<template v-slot:prepend>
							<v-icon :icon="detail.icon" size="small"></v-icon>
						</template>
						{{ detail.text }}</v-btn
					>
				</div>
				<!-- </v-col> -->
				<!-- </div> -->
				<!-- </v-sheet>
				</v-expand-transition> -->
			</v-container>
			<v-container>
				<v-card-title>
					{{ detailPetInfoList[nowBottomTab].text }} 리스트</v-card-title
				>
				<v-list-item v-for="i in 25" :key="i" active-color="primary">
					<template v-slot:prepend>
						<v-icon :icon="detailPetInfoList[nowBottomTab].icon"></v-icon>
					</template>

					<v-list-item-title @click="clickTest" style="cursor: pointer">
						{{ i }}. {{ detailPetInfoList[nowBottomTab].text }} 기록 리스트
						샘플</v-list-item-title
					>
				</v-list-item>
			</v-container>
			<!-- <v-container>
				<v-overlay v-model="snackbar">
					<v-snackbar v-model="snackbar" vertical :timeout="1000000">
						<v-card-title class="text-subtitle-1 pb-2" color="indigo">
							This is a Pet Detail List
						</v-card-title>

						<v-list-item
							v-for="(item, i) in detailPetInfoList"
							:key="i"
							:value="item"
							active-color="primary"
						>
							<template v-slot:prepend>
								<v-icon :icon="item.icon" style="margin-left: 50px"></v-icon>
							</template>

							<v-list-item-title @click="clickTest" style="cursor: pointer">
								{{ item.text }}</v-list-item-title
							>
						</v-list-item>
						<template v-slot:actions>
							<v-btn color="indigo" variant="text" @click="snackbar = false">
								Close
							</v-btn>
						</template>
					</v-snackbar>
				</v-overlay>
			</v-container> -->
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
// const snackbar = ref(false);

const clickTest = () => {
	console.log('click');
};
const nowBottomTab = ref(1);
const detailPetInfoList = ref([
	{ id: 0, text: '진료기록', icon: 'mdi-clipboard-text-outline' },
	{ id: 1, text: '알레르기', icon: 'mdi-block-helper' },
	{ id: 2, text: '예방접종', icon: 'mdi-pill' },
]);

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
	model.value = 0;
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

onMounted(() => {
	tokenResultSet();
	if (oauth.accessToken) btnFetchUserInfo(oauth.accessToken);
});
</script>

<style lang="scss" scoped></style>
