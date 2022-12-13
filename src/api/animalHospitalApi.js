import { animalHospital, paramsSerializer } from './index.js';

/**
 * 동물 병원 리스트 조회
 * @returns
 */
export function getAnimalHospitalList() {
	return animalHospital.get('');
}

/**
 * 동물 병원 리스트 페이지 조회
 * @returns
 */
export function getPageAnimalHospitalList(params) {
	return animalHospital.get(`?${paramsSerializer(params)}`);
}
