<template>
	<TheViewLayout
		:style="
			!userInfo.isLogined || myPetList.length === 0
				? 'height:' + height + 'px;'
				: ''
		"
	>
		<template #mainPanel>
			<v-container class="pb-0" v-motion-popXDelay500>
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
					<template v-slot:text>
						<v-banner-text v-if="!userInfo.isLogined">
							로그인 후 자신의 그룹을 생성해 Pet의 정보를 관리해보세요!
						</v-banner-text>
						<v-banner-text v-else class="d-flex fill-height align-center">
							Pet 추가가 가능하고 상세정보를 확인할 수 있어요.
						</v-banner-text>
					</template>
					<template v-slot:actions>
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
					</template>
				</v-banner>
			</v-container>
			<!-- group component-->
			<GroupList
				v-motion-popXDelay1000
				:my-pet-list="myPetList"
				:is-pet-insert-act="true"
				:group-model="model"
				@update:groupList="fetchGroupList"
				@update:groupModel="updateGroupModel"
			></GroupList>
			<v-container
				v-if="model != null"
				class="pt-0 pb-0"
				v-motion-popXDelay1500
			>
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
						@click="changePetActList(detail, myPetList[model])"
					>
						<template v-slot:prepend>
							<v-icon :icon="detail.icon" size="small"></v-icon>
						</template>
						{{ detail.text }}</v-btn
					>
				</div>
			</v-container>
			<v-container
				class="pt-2"
				v-if="userInfo.isLogined && model != null"
				v-motion-popXDelay2000
			>
				<v-card class="pa-2 rounded-xl">
					<v-card-title>
						{{ detailPetInfoList[nowBottomTab].text }} 리스트</v-card-title
					>
					<template v-if="detailPetInfoList[nowBottomTab].dataList">
						<v-list-item
							v-for="item in detailPetInfoList[nowBottomTab].dataList"
							:key="item"
							active-color="primary"
						>
							<template v-slot:prepend>
								<!-- <v-icon :icon="detailPetInfoList[nowBottomTab].icon"></v-icon> -->
								{{
									dayjs(`${item.resource?.period.start}`).format('YYYY/MM/DD')
								}}
							</template>
							<v-expansion-panels>
								<v-expansion-panel>
									<v-expansion-panel-title style="font-weight: bold">
										{{
											item.resource?.serviceProvider.display
										}}</v-expansion-panel-title
									>
									<v-expansion-panel-text>
										<!-- style="padding-bottom: 0px" -->
										<v-card-text class="pt-0 pb-0">
											{{
												dayjs(`${item.resource?.period.start}`).format(
													'YYYY/MM/DD hh:mm:ss',
												)
											}}</v-card-text
										>
										<v-card-text class="pt-0 pb-0">
											{{
												dayjs(`${item.resource?.period.end}`).format(
													'YYYY/MM/DD hh:mm:ss',
												)
											}}</v-card-text
										>
										<v-card-text class="pt-0 pb-0">
											{{ item.resource?.reasonCode[0].text }}</v-card-text
										>
									</v-expansion-panel-text>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-list-item>
					</template>
					<template v-if="!detailPetInfoList[nowBottomTab].dataList">
						<v-list-item active-color="primary">
							<template v-slot:prepend>
								<v-icon :icon="detailPetInfoList[nowBottomTab].icon"></v-icon>
							</template>
							<div>데이터가 없습니다.</div>
						</v-list-item>
					</template>
				</v-card>
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
import { ref, onMounted, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

import { getTokenAuthCodeResult } from '@/api/oauthApi';
import {
	getGroupList,
	getBundle,
	updateGroup,
	getEncounterList,
	// deletePatient,
} from '@/api/fhirApi';
import { useAuthStore } from '@/stores/auth';
import * as OpenAPI from '@/assets/js/sdk/openApi';

// import PetInsert from '@/components/pet/PetInsert.vue';
import groupInsert from '@/components/group/GroupInsert.vue';
import GroupList from '@/components/group/GroupList.vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';

const dayjs = inject('dayjs');

const model = ref(null);

const { height } = useWindowSize();

const clickTest = () => {
	console.log('click');
};
const nowBottomTab = ref(0);
const detailPetInfoList = ref([
	{
		id: 0,
		text: '진료기록',
		type: 'encounter',
		icon: 'mdi-clipboard-text-outline',
		length: null,
		dataList: [],
	},
	{
		id: 1,
		text: '알레르기',
		type: 'ImmunizationRecommendation',
		icon: 'mdi-block-helper',
		length: 10,
		dataList: [],
	},
	{
		id: 2,
		text: '예방접종',
		type: 'AllergyIntolerance',
		icon: 'mdi-pill',
		length: 20,
		dataList: [],
	},
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
	console.log('total', total);
	console.log('entry', entry);
	if (total > 0) {
		groupInfo.value = entry[0];
		const {
			resource: { quantity },
			resource: { name },
			resource: { member },
		} = entry[0];
		SET_GROUPLIST(total, name, quantity, member);
		if (member.length > 0) {
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
	// 진료기록 리스트 on
	changePetActList(detailPetInfoList.value[0], myPetList.value[0]);
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
	let memberList = groupList.value.memberList;
	let findIndex = memberList.findIndex(
		i => i.entity.reference === `Patient/${petInfo.id}`,
	);
	if (findIndex < 0) {
		return false;
	} else {
		delete memberList[findIndex];
	}
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

const changePetActList = (btnDetail, selectedPet) => {
	nowBottomTab.value = btnDetail.id;
	// fhir 조회예정
	switch (btnDetail.type) {
		case 'encounter':
			console.log('encounter');
			fetchGetEncounterList(selectedPet.id);
			break;
		case 'ImmunizationRecommendation':
			console.log('ImmunizationRecommendation');
			break;
		case 'AllergyIntolerance':
			console.log('AllergyIntolerance');
			break;
		default:
			break;
	}
};
const fetchGetEncounterList = async patientId => {
	const {
		data: { total },
		data: { entry },
	} = await getEncounterList(patientId);
	console.log('total', total);
	console.log('entry', entry);
	detailPetInfoList.value[0].length = total;
	detailPetInfoList.value[0].dataList = entry;
};

const updateGroupModel = idx => {
	model.value = idx;
};

onMounted(() => {
	tokenResultSet();
	if (oauth.accessToken) btnFetchUserInfo(oauth.accessToken);
});

watch(
	() => model.value,
	() => {
		changePetActList(detailPetInfoList.value[0], myPetList.value[model.value]);
	},
	{ deep: true },
);
</script>

<style scoped>
.v-expansion-panel-text__wrapper {
	padding-bottom: 0px;
}
</style>
