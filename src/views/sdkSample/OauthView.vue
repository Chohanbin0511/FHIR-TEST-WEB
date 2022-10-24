<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>Oauth Sample</h1>
			</v-container>
			<v-container>
				<h3>Redwood OAuth Library</h3>
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
						<!-- :style="`width:50%;`" -->
						<!-- :rules="nameRules" -->
						<v-text-field
							v-model="userId"
							:counter="10"
							label="UserId"
							required
						></v-text-field>
						<!-- :rules="emailRules" -->
						<v-text-field
							v-model="userPw"
							label="Password"
							required
						></v-text-field>

						<v-btn color="warning" @click="FetchTokenPassword()"> 제출 </v-btn>
					</v-form>
				</v-card>
			</v-container>

			<!-- <button @click="btnTokenRefresh()">Refresh Token</button> -->
			<v-container>
				<h3>Token Result</h3>
			</v-container>
			<v-container>
				<v-card>
					<!-- <v-card-item>
						<v-card-title>{{ clickedMethods }}</v-card-title>

						<v-card-subtitle>This is a subtitle</v-card-subtitle>
					</v-card-item> -->

					<v-card-text> This is content </v-card-text>
				</v-card>
			</v-container>
			<!-- <textarea id="token_display" cols="100" rows="20"></textarea> -->
		</template>
	</TheViewLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import {
	getTokenAuthCode,
	getTokenImplicit,
	getTokenClient,
	getTokenPassword,
	getTokenRefresh,
} from '@/api/oauthApi';
import sha256 from 'sha256';

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
	{
		title: 'Refresh Token',
		methods: 'FetchTokenAuthCode',
	},
]);
const clickedMethods = ref(null);
const fetchMethods = methodsName => {
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
		const response = await getTokenAuthCode();
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
};

/**
 * Implicit 인증
 */
const FetchTokenImplicit = async () => {
	try {
		const response = await getTokenImplicit();
		console.log('response', response);
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
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
};

/**
 * Password Credentials 인증
 */
const userId = ref(null);
const userPw = ref(null);
const FetchTokenPassword = async () => {
	if (!userId.value || !userPw.value) {
		alert('정보를 입력하세요');
		return false;
	}
	let userInfo = {
		userId: userId.value,
		userPw: sha256(userPw.value),
		// userPw: '2fa1ecf9826474fe8e18a96441c94a500cd968454eeb05ed056d0918e19cd118',
	};
	try {
		const response = await getTokenPassword(userInfo);
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	// FetchTokenAuthCode();
});
// 토큰 결과
// const setTokenValue = () => {
// 	let accToken = localStorage.getItem('accToken');
// 	console.log('access_token: ', accToken);

// 	if (accToken != undefined) {
// 		document.getElementById('token_display').value = accToken;
// 	}
// };
</script>

<style lang="scss" scoped></style>
