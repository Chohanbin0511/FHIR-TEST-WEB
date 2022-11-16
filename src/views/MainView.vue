<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>Main Page</h1>
			</v-container>

			<v-container>
				<template v-if="groupList.total === 0">
					<groupInsert @update:groupList="fetchGroupList"> </groupInsert
				></template>

				<template v-if="groupList.total > 0">
					그룹 정보 템플릿
					<div>그룹 명: {{ groupList.name }}</div>
					<div>멤버 수 : {{ groupList.memberTotal }}</div>
					<div>멤머 리스트 :{{ groupList.memberList }}</div>
					<PetInsert
						:group-info="groupInfo"
						@update:groupList="fetchGroupList"
					></PetInsert>
				</template>
				<!-- <v-btn @click="createFamily()"> 가족 생성</v-btn> -->
				<!-- <v-row>
					<v-col
						v-for="item in samplePageList"
						:key="item"
						class="mx-auto my-2"
						max-width="200"
						cols="12"
						md="4"
					>
						<v-btn width="100%" @click="goPage(item.type)">
							{{ item.title }}
						</v-btn>
					</v-col>
				</v-row> -->
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTokenAuthCodeResult } from '@/api/oauthApi';
import { getGroupList } from '@/api/fhirApi';
import { useAuthStore } from '@/stores/auth';
import * as OpenAPI from '@/assets/js/sdk/openApi';

import PetInsert from '@/components/pet/PetInsert.vue';
import groupInsert from '@/components/group/GroupInsert.vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';

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
	}
	if (total === 0) {
		CLEAR_GROUPLIST();
	}
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
	btnFetchUserInfo(oauth.accessToken);
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
