import { animalHospital } from './index.js';

/**
 * 동물 병원 리스트 조회
 * @returns
 */
export function getAnimalHospitalList() {
	return animalHospital.get('');
}
