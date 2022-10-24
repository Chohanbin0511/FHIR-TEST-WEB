// import OAuth from '@/assets/js/sdk/oauth';
import * as OAuth from './../assets/js/sdk/oauth';
// const OAuth = require('./../assets/js/sdk/oauth');
import { OAUTH_CONFIG } from './common/config';

/**
 * Authorization Code Grant
 * @returns
 */
export function getTokenAuthCode() {
	return OAuth.authorizationCode(OAUTH_CONFIG);
}

/**
 * Implicit Grant
 * @returns
 */
export function getTokenImplicit() {
	return OAuth.implicit(OAUTH_CONFIG);
}

/**
 * Client Credentials Grant
 * @returns
 */
export function getTokenClient() {
	return OAuth.clientCredentials(OAUTH_CONFIG);
}

/**
 * Password Credentials Grant
 * @param {*} userInfo
 */
export function getTokenPassword(userInfo) {
	// let userInfo = {
	// 	userId: 'test',
	// 	userPw: '2fa1ecf9826474fe8e54eeb05ed056d0918e19cd118',
	// };

	return OAuth.passwordCredentials(OAUTH_CONFIG, userInfo);
}

/**
 * Refresh Grant
 * @param {*} refreshToken
 * @returns
 */
export function getTokenRefresh(refreshToken) {
	return OAuth.refresh(OAUTH_CONFIG, refreshToken);
}
