import { useAuthStore } from '@/stores/auth';
import * as OAuth from '@/assets/js/sdk/oauth';
import { OAUTH_CONFIG } from './config';
import { handleError } from './common.js';
import router from '@/router/index.js';

function setInterceptors(instance) {
	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			config.headers = {
				'Content-Type': 'application/json;charset=utf-8',
			};
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			handleError(error);
			router.go(-1);
			return Promise.reject(error);
		},
	);
	return instance;
}

function setAuthInterceptors(instance) {
	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			const store = useAuthStore();
			// Do something before request is sent
			config.headers = {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `Bearer ${store.oauth.accessToken}`,
			};
			return config;
		},
		function (error) {
			// Do something with request error

			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			handleError(error);
			return Promise.reject(error);
		},
	);
	return instance;
}
function setAuthInterceptors_client(instance) {
	let token = '';
	OAuth.clientCredentials(OAUTH_CONFIG)
		.then(({ access_token }) => {
			token = access_token;
		})
		.catch(err => {
			console.log('error', err);
		});
	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			// console.log(config);
			config.headers = {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `Bearer ${token}`,
			};
			return config;
		},
		function (error) {
			// Do something with request error

			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			handleError(error);
			if (
				error.response.config.url != '/session/logout' &&
				error.response.status == 401
			) {
				// TODO: 세션종료 메세지
				// alert(
				//   'Session has been expired or Logged in from a different browser. Redirecting to mtsd main page.',
				// );
				// jsLogout();
			}
			return Promise.reject(error);
		},
	);
	return instance;
}
export { setInterceptors, setAuthInterceptors, setAuthInterceptors_client };
