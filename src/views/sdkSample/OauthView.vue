<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>Oauth Sample</h1>
			</v-container>
			<v-container>
				<h3>Redwood OAuth Library (4가지 로그인)</h3>
			</v-container>

			<v-container>
				<v-row>
					<v-col
						v-for="item in getTokenBtnList"
						:key="item"
						cols="12"
						md="6"
						max-width="250"
					>
						<v-btn width="100%" @click="fetchMethods(item.methods)">
							{{ item.title }}
						</v-btn>
					</v-col>
				</v-row>
			</v-container>

			<v-container v-if="isInputBoxShow">
				<h4>FetchTokenPassword 정보 입력</h4>
				<v-card class="ma-2 pa-4">
					<v-form class="justify-center mb-6" ref="form">
						<v-text-field
							v-model="userId"
							:counter="10"
							label="UserId"
							required
						></v-text-field>
						<v-text-field
							v-model="userPw"
							label="Password"
							required
						></v-text-field>

						<v-btn color="warning" @click="FetchTokenPassword()"> 제출 </v-btn>
					</v-form>
				</v-card>
			</v-container>

			<v-container>
				<h3>Token Result</h3>
			</v-container>
			<v-container>
				<div
					v-if="
						oauthType === getTokenBtnList[0].title ||
						oauthType === getTokenBtnList[3].title
					"
					class="d-flex justify-center mb-6"
				>
					<v-card-subtitle class="d-flex align-center"
						>토큰 재발급
						<v-tooltip activator="parent" location="bottom"
							>Authorization Code인증, Password Credentails 인증 방식에만
							Refresh Token 발급됨[관리자 페이지 가서 redirect uri 수정해야
							가능]</v-tooltip
						></v-card-subtitle
					>
					<v-btn
						class="d-flex align-center"
						style="width: 250px"
						@click="fetchRefreshToken()"
					>
						{{ refreshTokenBtn.title }}
					</v-btn>
				</div>

				<v-card>
					<v-card-item>
						<v-card-subtitle>인증타입 : {{ oauthType }}</v-card-subtitle>
					</v-card-item>

					<v-card-text :style="`min-height:200px;`">
						<v-progress-circular
							v-if="isOauthResult"
							indeterminate
							color="red"
							style="margin-left: 50%; margin-top: 50px"
						></v-progress-circular>
						<template v-else>
							{{ oauthResult }}
						</template>
					</v-card-text>
				</v-card>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import {
	getTokenAuthCode,
	getTokenAuthCodeResult,
	getTokenImplicit,
	getTokenClient,
	getTokenPassword,
	getTokenRefresh,
} from '@/api/oauthApi';
import { useAuthStore } from '@/stores/auth';
import * as OpenAPI from '@/assets/js/sdk/openApi';

import sha256 from 'sha256';

const store = useAuthStore();
const { SET_LOGIN, SET_OAUTH } = store;

const isInputBoxShow = ref(false);
const getTokenBtnList = ref([
	{
		title: '1.Authorization Code 인증',
		methods: 'FetchTokenAuthCode',
	},
	{
		title: '2.Implicit 인증',
		methods: 'FetchTokenImplicit',
	},
	{
		title: '3.Client Credentials 인증',
		methods: 'FetchTokenClient',
	},
	{
		title: '4.Password Credentials 인증',
		methods: 'FetchTokenPassword',
	},
]);
const refreshTokenBtn = ref({
	title: 'Refresh Token',
	methods: 'FetchTokenAuthCode',
});
const oauthResult = ref(null);
const isOauthResult = ref(false);
const oauthType = ref(null);
const refreshToken = ref(null);
const clickedMethods = ref(null);
const router = useRouter();
const route = useRoute();
const fetchMethods = methodsName => {
	router.push({ path: '/sdkSample/oauth', replace: true });
	oauthResult.value = null;
	oauthType.value = null;
	if (methodsName !== getTokenBtnList.value[3].methods) {
		isOauthResult.value = true;
	}
	clickedMethods.value = methodsName;
	switch (methodsName) {
		case getTokenBtnList.value[0].methods:
			isInputBoxShow.value = false;
			FetchTokenAuthCode();
			break;
		case getTokenBtnList.value[1].methods:
			isInputBoxShow.value = false;
			FetchTokenImplicit();
			break;
		case getTokenBtnList.value[2].methods:
			isInputBoxShow.value = false;
			FetchTokenClient();
			break;
		case getTokenBtnList.value[3].methods:
			isInputBoxShow.value = !isInputBoxShow.value;
			if (isInputBoxShow.value) {
				userId.value = null;
				userPw.value = null;
			}
			break;
		default:
			break;
	}
};

/**
 * Authorization Code 인증
 */
const FetchTokenAuthCode = async () => {
	try {
		await getTokenAuthCode();
	} catch (error) {
		console.error(error);
	}
};

/**
 * Implicit 인증
 */
const FetchTokenImplicit = async () => {
	try {
		await getTokenImplicit();
	} catch (error) {
		console.error(error);
	}
};

/**
 * Client Credentials 인증
 */
const FetchTokenClient = async () => {
	try {
		const response = await getTokenClient();
		SET_OAUTH(response);
		oauthResult.value = response;
		oauthType.value = getTokenBtnList.value[2].title;
	} catch (error) {
		console.error(error);
	} finally {
		isOauthResult.value = false;
	}
};

/**
 * Password Credentials 인증
 */
const userId = ref(null);
const userPw = ref(null);
const FetchTokenPassword = async () => {
	oauthResult.value = null;
	isOauthResult.value = true;
	if (!userId.value || !userPw.value) {
		alert('정보를 입력하세요');
		return false;
	}
	let userInfo = {
		userId: userId.value,
		userPw: sha256(userPw.value),
	};
	try {
		const response = await getTokenPassword(userInfo);
		oauthResult.value = response;
		SET_OAUTH(response);
		oauthType.value = getTokenBtnList.value[3].title;
		refreshToken.value = response.refresh_token;
	} catch (error) {
		console.error(error);
	} finally {
		isOauthResult.value = false;
	}
};

/**
 * refreshToken 발급
 */
const fetchRefreshToken = async () => {
	const response = await getTokenRefresh(refreshToken.value);
	SET_OAUTH(response);
	oauthResult.value = response;
	refreshToken.value = null;
};

let lhash = ref(location.hash);
let lsearch = ref(location.search);
const isCode = ref(route.query.code);
const tokenResultSet = async () => {
	if (lhash.value != undefined && lhash.value != '') {
		let accToken = lhash.value.split('&')[0].split('=')[1];
		oauthType.value = getTokenBtnList.value[1].title;
		oauthResult.value = accToken;
	} else if (lsearch.value != undefined && isCode.value) {
		let lsearchSplit = lsearch.value.split('&');
		let code = lsearchSplit[0].split('=')[1];
		const response = await getTokenAuthCodeResult(code);
		oauthResult.value = response;
		SET_OAUTH(response);
		oauthType.value = getTokenBtnList.value[0].title;
		refreshToken.value = response.refresh_token;
	} else {
		return;
	}
};

// 회원 정보 조회
const btnFetchUserInfo = async token => {
	const configToken = {
		baseUrl: 'https://api.redwoodhealth.kr',
		accessToken: token,
	};
	await OpenAPI.fetchUserInfo(configToken)
		.then(response => {
			SET_LOGIN(response);
		})
		.catch(error => {
			console.log('error', error);
		});
};

onMounted(() => {
	tokenResultSet();
});

watch(
	() => oauthResult.value,
	() => {
		if (oauthResult.value) {
			btnFetchUserInfo(oauthResult.value.access_token);
		}
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
