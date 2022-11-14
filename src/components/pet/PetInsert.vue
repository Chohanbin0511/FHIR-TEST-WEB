<template>
	<v-container>
		<!-- <v-btn @click="createFamily()"> 가족 생성</v-btn> -->
		<v-row>
			<v-dialog v-model="dialog">
				<template v-slot:activator="{ props }">
					<v-btn color="primary" v-bind="props">가족 생성</v-btn>
				</template>
				<v-card>
					<v-card-title class="mt-5">
						<span class="text-h6">가족 등록 정보</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="inputData.name"
										label="*이름"
										required
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="inputData.birth"
										label="*생년월일 ex.2018-04-01"
										required
									></v-text-field>
								</v-col>
								<!-- <v-col cols="12" sm="6">
									<v-select
										:items="['0-17', '18-29', '30-54', '54+']"
										label="Age*"
										required
										></v-select>
									</v-col> -->
								<v-col cols="12" sm="6">
									<v-autocomplete
										v-model="inputData.species"
										:items="['Dog', 'Cat']"
										label="카테고리"
									></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="inputData.breed"
										label="*품종 ex.말티즈"
										required
									></v-text-field>
								</v-col>
								<v-col cols="12" sm="6">
									<v-autocomplete
										v-model="inputData.gender"
										:items="['수컷', '암컷', '중성화']"
										label="*성별"
									></v-autocomplete>
									<!-- multiple -->
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field
										v-model="inputData.officialAnimalNum"
										label="동물 등록 번호"
									></v-text-field>
									<!-- multiple -->
								</v-col>
							</v-row>
						</v-container>
						<small>*필수 입력 사항</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-darken-1" variant="text" @click="dialog = false">
							Close
						</v-btn>
						<v-btn color="blue-darken-1" variant="text" @click="createFamily">
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { createPatient } from '@/api/fhirApi.js';

const dialog = ref(false);

/**
 * 유저 정보
 */
const userInfo = useAuthStore().userInfo;
// 가족 생성
const inputData = ref({
	name: null,
	birth: null,
	species: null,
	breed: null,
	gender: null,
	officialAnimalNum: null,
});
// patient 생성폼 빈칸 체크 (유효성 체크 추가 예정)
const createFhirPatientValidCheck = () => {
	for (let prop in inputData.value) {
		if (prop === 'officialAnimalNum') {
			return true;
		}
		if (inputData.value[prop] === null) {
			return false;
		}
	}
	return true;
};

const createFhirPatient = async () => {
	const result = createFhirPatientValidCheck();
	console.log('result', result);
	if (!result) {
		alert('빈칸체크!');
		return false;
	}
	// console.log('Patient 생성 버튼 클릭', inputData.value);
	const resource = {
		resourceType: 'Patient',
		language: 'ko',
		identifier: [
			{
				type: {
					text: '동물 등록 번호',
				},
				system: 'https://www.animal.go.kr',
				value: inputData.value.officialAnimalNum,
			},
		],
		active: true,
		name: [
			{
				text: inputData.value.name,
				given: [inputData.value.name],
			},
		],
		// gender: inputData.value.gender,
		birthDate: inputData.value.birth,
		contact: [
			{
				relationship: [
					{
						coding: [
							{
								system: 'http://hl7.org/fhir/v2/0131',
								code: 'C',
								display: '비상 연락',
							},
						],
					},
				],
				name: [
					{
						text: userInfo.userName,
					},
				],
				telecom: [
					{
						system: 'phone',
						value: userInfo.mobilePhone,
					},
				],
			},
		],
		animal: {
			species: {
				coding: [
					{
						system: 'http://hl7.org/fhir/animal-species',
						code: 'canislf',
						display: inputData.value.species,
					},
				],
			},
			breed: inputData.value.breed,
			genderStatus: {
				coding: [
					{
						system: 'https://www.animal.go.kr',
						code: inputData.value.gender,
					},
				],
			},
		},
		managingOrganization: {
			display: 'chohbin PET 서비스',
		},
	};
	console.log('resource', resource);
	try {
		const response = await createPatient(resource);
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
};
const createFamily = () => {
	createFhirPatient();

	// todo patient
	// 1.생성 입력 폼 만든후 제출 => patient 정상 생성되면
	// 2. phr 공유자에 추가
};
</script>

<style scoped></style>
