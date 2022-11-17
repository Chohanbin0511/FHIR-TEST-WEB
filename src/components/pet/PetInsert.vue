<template>
	<v-dialog v-model="dialog">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props">팻 생성</v-btn>
		</template>
		<v-card>
			<v-card-title class="mt-5">
				<span class="text-h6">팻 등록 정보</span>
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
				<v-btn color="blue-darken-1" variant="text" @click="closeInsertForm">
					Close
				</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="createFamily">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { createPatient, updateGroup } from '@/api/fhirApi';

const dialog = ref(false);

const emit = defineEmits(['update:groupList']);

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
	if (!result) {
		alert('빈칸체크!');
		return false;
	}
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
		extension: [
			{
				url: 'http://hl7.org/fhir/StructureDefinition/patient-animal',
				extension: [
					{
						url: 'species',
						valueCodeableConcept: {
							coding: [
								{
									system: 'http://hl7.org/fhir/animal-species',
									code: 'canislf',
									display: inputData.value.species,
								},
							],
						},
					},
					{
						url: 'breed',
						valueCodeableConcept: {
							coding: [
								{
									// system: 'http://snomed.info/sct',
									system: 'https://www.animal.go.kr',
									code: inputData.value.breed,
									display: inputData.value.breed,
								},
							],
						},
					},
					{
						url: 'genderStatus',
						valueCodeableConcept: {
							coding: [
								{
									// system: 'http://hl7.org/fhir/animal-genderstatus',
									// code: 'neutered',
									system: 'https://www.animal.go.kr',
									code: inputData.value.gender,
									display: inputData.value.gender,
								},
							],
						},
					},
				],
			},
		],
		// animal: {
		// 	species: {
		// 		coding: [
		// 			{
		// 				system: 'http://hl7.org/fhir/animal-species',
		// 				code: 'canislf',
		// 				display: inputData.value.species,
		// 			},
		// 		],
		// 	},
		// 	breed: inputData.value.breed,
		// 	genderStatus: {
		// 		coding: [
		// 			{
		// 				system: 'https://www.animal.go.kr',
		// 				code: inputData.value.gender,
		// 			},
		// 		],
		// 	},
		// },
		managingOrganization: {
			display: 'chohbin PET 서비스',
		},
	};
	try {
		const { data } = await createPatient(resource);
		const { active, id, birthDate } = data;
		addGroupPet(active, id, birthDate);
	} catch (error) {
		console.error(error);
	}
};

const groupList = useAuthStore().groupList;

// 그룹에 생성한 펫 추가
const addGroupPet = async (active, id, birthDate) => {
	const resource = {
		resourceType: 'Group',
		identifier: [
			{
				system: 'https://redwoodplatformtest-chohbin.netlify.app',
				value: userInfo.patientId,
			},
		],
		active: true,
		type: 'animal',
		actual: true,
		name: groupList.name,
		quantity: groupList.memberTotal + 1,
		member:
			groupList.memberList === undefined
				? [
						{
							entity: {
								reference: `Patient/${id}`,
							},
							period: {
								start: birthDate,
							},
							inactive: active,
						},
				  ]
				: [
						...groupList.memberList,
						{
							entity: {
								reference: `Patient/${id}`,
							},
							period: {
								start: birthDate,
							},
							inactive: active,
						},
				  ],
	};
	try {
		const { status } = await updateGroup(userInfo.patientId, resource);
		if (status >= 200) {
			alert('팻 추가 성공');
			emit('update:groupList');
			dialog.value = false;
			clearInputText();
		} else {
			alert(status);
		}
	} catch (error) {
		console.error(error);
	}
};
const closeInsertForm = () => {
	dialog.value = false;
	clearInputText();
};

const clearInputText = () => {
	inputData.value.name = null;
	inputData.value.birth = null;
	inputData.value.species = null;
	inputData.value.breed = null;
	inputData.value.gender = null;
	inputData.value.officialAnimalNum = null;
};
const createFamily = () => {
	createFhirPatient();
};
</script>

<style scoped></style>
