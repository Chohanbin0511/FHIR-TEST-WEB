import axios from 'axios';
import {
	setAuthInterceptors,
	setInterceptors,
	setAuthInterceptors_client,
} from './common/interceptors';

export const paramsSerializer = function (paramObj) {
	const params = new URLSearchParams();
	for (const key in paramObj) {
		if (typeof paramObj[key] === 'object') {
			for (let i in paramObj[key]) {
				params.append(key, paramObj[key][i]);
			}
		} else {
			params.append(key, paramObj[key]);
		}
	}
	return params.toString();
};

function createInstance(url) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
	});
	return setInterceptors(instance);
}

function createAuthInstance(url) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_APP_API_URL}${url}`,
	});
	return setAuthInterceptors(instance);
}

function createdFhirInstance(url) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_APP_URL_FHIR}${url}`,
	});
	return setAuthInterceptors(instance);
}

//* ==== fhir: clientCredentials interceptor === *//
function createFhirInstance_client(url) {
	const instance = axios.create({
		baseURL: `${import.meta.env.VITE_APP_URL_FHIR}${url}`,
	});
	return setAuthInterceptors_client(instance);
}

export const animalHospital = createInstance('/fhirTestWeb_animalHospital');
export const animalHospitalAuth = createAuthInstance(
	'/fhirTestWeb_animalHospital',
);

export const fhirAuth = createdFhirInstance('');
export const fhirCredentialsAuth = createFhirInstance_client('');
