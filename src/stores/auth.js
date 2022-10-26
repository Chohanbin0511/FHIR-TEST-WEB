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
		},
		oauth: {
			accessToken: null,
			refreshToken: null,
			tokenType: null,
			expiresIn: null,
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
		},
		SET_OAUTH(oauthData) {
			this.oauth.accessToken = oauthData.access_token;
			this.oauth.refreshToken = oauthData.refresh_token;
			this.oauth.tokenType = oauthData.token_type;
			this.oauth.expiresIn = oauthData.expires_in;
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
		},
		CLEAR_OAUTH() {
			this.oauth.accessToken = null;
			this.oauth.refreshToken = null;
			this.oauth.tokenType = null;
			this.oauth.expiresIn = null;
		},
	},
	persist: {
		enabled: true,
	},
});
