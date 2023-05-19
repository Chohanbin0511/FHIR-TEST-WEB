import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAuthStore = defineStore(
	'auth',
	() => {
		const userInfo = ref({
			isLogined: false,
			userId: null,
			userName: null,
			birthday: null,
			gender: null,
			email: null,
			mobilePhone: null,
			fhirResource: null,
			patientId: null,
		});
		const oauth = ref({
			accessToken: null,
			refreshToken: null,
			tokenType: null,
			expiresIn: null,
		});
		const groupList = ref({
			total: 0,
			name: null,
			memberTotal: 0,
			memberList: [],
		});
		const SET_LOGIN = loginData => {
			userInfo.value.isLogined = true;
			userInfo.value.userId = loginData.userId;
			userInfo.value.userName = loginData.userName;
			userInfo.value.birthday = loginData.birthday;
			userInfo.value.gender = loginData.gender;
			userInfo.value.email = loginData.email;
			userInfo.value.mobilePhone = loginData.mobilePhone;
			userInfo.value.fhirResource = loginData.fhirResource;
			userInfo.value.patientId = loginData.fhirResource.split('/')[1];
		};

		const SET_OAUTH = oauthData => {
			oauth.value.accessToken = oauthData.access_token;
			oauth.value.refreshToken = oauthData.refresh_token;
			oauth.value.tokenType = oauthData.token_type;
			oauth.value.expiresIn = oauthData.expires_in;
		};
		const SET_GROUPLIST = (total, name, quantity, list) => {
			groupList.value.total = total;
			groupList.value.name = name;
			groupList.value.memberTotal = quantity;
			groupList.value.memberList = list;
		};
		const CLEAR_SESSION = () => {
			userInfo.value.isLogined = false;
			userInfo.value.userId = null;
			userInfo.value.userName = null;
			userInfo.value.birthday = null;
			userInfo.value.gender = null;
			userInfo.value.email = null;
			userInfo.value.mobilePhone = null;
			userInfo.value.fhirResource = null;
			userInfo.value.patientId = null;
		};
		const CLEAR_OAUTH = () => {
			oauth.value.accessToken = null;
			oauth.value.refreshToken = null;
			oauth.value.tokenType = null;
			oauth.value.expiresIn = null;
		};
		const CLEAR_GROUPLIST = () => {
			groupList.value.total = 0;
			groupList.value.name = null;
			groupList.value.memberTotal = 0;
			groupList.value.memberList = [];
		};

		return {
			userInfo,
			oauth,
			groupList,
			SET_LOGIN,
			SET_OAUTH,
			SET_GROUPLIST,
			CLEAR_SESSION,
			CLEAR_OAUTH,
			CLEAR_GROUPLIST,
		};
	},
	{
		persist: {
			enabled: true,
		},
	},
);
