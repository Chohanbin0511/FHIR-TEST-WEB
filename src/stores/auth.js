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
			expiresIn: null,
			authExpiry: null,
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
		CLEAR_SESSION() {
			this.userInfo.isLogined = false;
			this.userInfo.userId = null;
			this.userInfo.userSn = null;
			this.userInfo.userGroupCode = null;
			this.userInfo.token = null;
			this.menuList = [];
		},
	},
	persist: {
		enabled: true,
	},
});

// // 만료일
// function getExpiryDate(expiresIn) {
// 	const today = new Date();
// 	const expiryDate = new Date(today.getTime() + expiresIn * 1000);
// 	const expiryDateString = CommonMixins.methods.toISOString(expiryDate);

// 	return expiryDateString;
// }
