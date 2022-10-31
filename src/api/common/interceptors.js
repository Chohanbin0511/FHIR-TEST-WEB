import { useAuthStore } from '@/stores/auth';
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
			console.log('vv', store.oauth.accessToken);
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

export { setInterceptors, setAuthInterceptors };
