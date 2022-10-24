// import axios from 'axios';
// import { setAuthInterceptors, setInterceptors } from './common/interceptors';

// export const paramsSerializer = function (paramObj) {
// 	const params = new URLSearchParams();
// 	for (const key in paramObj) {
// 		if (typeof paramObj[key] === 'object') {
// 			for (let i in paramObj[key]) {
// 				params.append(key, paramObj[key][i]);
// 			}
// 		} else {
// 			params.append(key, paramObj[key]);
// 		}
// 	}
// 	return params.toString();
// };

// function createInstance(url) {
// 	const instance = axios.create({
// 		baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
// 	});
// 	return setInterceptors(instance);
// }

// function createAuthInstance(url) {
// 	const instance = axios.create({
// 		baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
// 	});
// 	return setAuthInterceptors(instance);
// }

// export const notice = createInstance('/api/notice');
// export const noticeAuth = createAuthInstance('/api/notice');
