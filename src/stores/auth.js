import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		userInfo: {
			isLogined: false,
			userId: null,
			userName: null,
			birthday: null,
			gender: null,
			email: null,
			mobilePhone: null,
			fhirResource: null,
			patientId: null,
		},
		oauth: {
			accessToken: null,
			refreshToken: null,
			tokenType: null,
			expiresIn: null,
		},
		groupList: {
			total: 0,
			name: null,
			memberTotal: 0,
			memberList: [],
		},
	}),
	actions: {
		SET_LOGIN(loginData) {
			this.userInfo.isLogined = true;
			this.userInfo.userId = loginData.userId;
			this.userInfo.userName = loginData.userName;
			this.userInfo.birthday = loginData.birthday;
			this.userInfo.gender = loginData.gender;
			this.userInfo.email = loginData.email;
			this.userInfo.mobilePhone = loginData.mobilePhone;
			this.userInfo.fhirResource = loginData.fhirResource;
			this.userInfo.patientId = loginData.fhirResource.split('/')[1];
		},
		SET_OAUTH(oauthData) {
			this.oauth.accessToken = oauthData.access_token;
			this.oauth.refreshToken = oauthData.refresh_token;
			this.oauth.tokenType = oauthData.token_type;
			this.oauth.expiresIn = oauthData.expires_in;
		},
		SET_GROUPLIST(total, name, quantity, list) {
			this.groupList.total = total;
			this.groupList.name = name;
			this.groupList.memberTotal = quantity;
			this.groupList.memberList = list;
		},
		CLEAR_SESSION() {
			this.userInfo.isLogined = false;
			this.userInfo.userId = null;
			this.userInfo.userName = null;
			this.userInfo.birthday = null;
			this.userInfo.gender = null;
			this.userInfo.email = null;
			this.userInfo.mobilePhone = null;
			this.userInfo.fhirResource = null;
			this.userInfo.patientId = null;
		},
		CLEAR_OAUTH() {
			this.oauth.accessToken = null;
			this.oauth.refreshToken = null;
			this.oauth.tokenType = null;
			this.oauth.expiresIn = null;
		},
		CLEAR_GROUPLIST() {
			this.groupList.total = 0;
			this.groupList.name = null;
			this.groupList.memberTotal = 0;
			this.groupList.memberList = [];
		},
	},
	persist: {
		enabled: true,
	},
});
