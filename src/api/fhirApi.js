// import * as fhir from 'fhir.js';
import { fhirAuth, fhirCredentialsAuth } from './index';
// import { useAuthStore } from '@/stores/auth';

/**
 * getPatient
 * @returns
 */
export function getPatient(patientId) {
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

/**
 * 환자 삭제
 */
export function deletePatient(patientId) {
	return fhirAuth.delete(`/Patient/${patientId}`);
}

/**
 * 환자 버전 조회
 */
export function getPatientVersion(patientId, versionId) {
	return fhirAuth.get(`/Patient/${patientId}/_history/${versionId}`);
}

/**
 * 그룹 조회
 */
export function getGroupList(patientId) {
	return fhirCredentialsAuth.get(`/Group?identifier=${patientId}`);
}

/**
 * 그룹 생성
 */
export function createGroup(resource) {
	return fhirCredentialsAuth.post(`/Group`, resource);
}

/**
 * 그룹 수정
 */
export function updateGroup(patientId, resource) {
	return fhirCredentialsAuth.put(`/Group?identifier=${patientId}`, resource);
}

/**
 * 진료기록 등록
 */
export function createEncounter(resource) {
	return fhirCredentialsAuth.post(`/Encounter`, resource);
}

/**
 * 진료기록 조회
 */
export function getEncounterList(patientId) {
	return fhirCredentialsAuth.get(`/Encounter?patient=Patient/${patientId}`);
}

/**
 * Bundle 조회
 */
export function getBundle(resource) {
	return fhirAuth.post('', resource);
}
