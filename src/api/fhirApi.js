// import * as fhir from 'fhir.js';
import { fhirAuth } from './index';
// import { useAuthStore } from '@/stores/auth';

/**
 * getPatient
 * @returns
 */
export function getPatient(patientId) {
	// const oauth = useAuthStore().oauth;
	// const fhirConfig = {
	// 	baseUrl: 'https://fhir.redwoodhealth.kr/fhir',
	// 	auth: {
	// 		bearer: oauth.accessToken,
	// 	},
	// };
	// return (
	// 	fhir(fhirConfig)
	// 		.read({ type: 'Patient', id: '766371' })
	// 		// .conformance({})
	// 		.then(response => {
	// 			console.log('response', response);
	// 		})
	// 		.catch(error => {
	// 			console.log('error', error);
	// 		})
	// );
	return fhirAuth.get(`/Patient/${patientId}`);
}

/**
 * 환자 생성
 */
export function createPatient(resource) {
	return fhirAuth.post(`/Patient`, resource);
}

/**
 * 환자 수정
 */
export function updatePatient(resource, patientId) {
	return fhirAuth.put(`/Patient/${patientId}`, resource);
}
