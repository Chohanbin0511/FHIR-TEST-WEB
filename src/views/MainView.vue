<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>Main Page</h1>
			</v-container>

			<v-container>
				<PetInsert></PetInsert>
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
import { useRoute } from 'vue-router';
import { getTokenAuthCodeResult } from '@/api/oauthApi';
import { useAuthStore } from '@/stores/auth';
import * as OpenAPI from '@/assets/js/sdk/openApi';

import PetInsert from '@/components/pet/PetInsert.vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';

// const samplePageList = ref([
// 	{ title: 'Fhir Sample', type: 'fhir' },
// 	{ title: 'OAuth Sample', type: 'oauth' },
// 	{ title: 'OpenApi Sample', type: 'openApi' },
// ]);

// const router = useRouter();
// const goPage = type => {
// 	router.push(`/sdkSample/${type}`);
// };

/**
 * 로그인 후  회원 정보 store에 담기
 */
const store = useAuthStore();
const { SET_LOGIN, SET_OAUTH } = store;

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
		})
		.catch(error => {
			console.log('error', error);
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

onMounted(() => {
	tokenResultSet();
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
