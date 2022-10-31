<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>FHIR Sample</h1>
			</v-container>
			<!----------------------   회원가입 API   ---------------------------->
			<v-container>
				<v-card class="ma-2 pa-4">
					<h2 class="mb-2" style="width: 250px">Patient</h2>
					<!-- <v-dialog transition="dialog-bottom-transition"> -->
					<!-- <template v-slot:activator="{ props }"> -->
					<!-- <v-btn
						v-bind="props" -->
					<v-btn
						class="mb-2 mr-4"
						v-for="item in patientFhirApiList"
						:key="item"
						@click="item.methodsNm(item.title)"
					>
						{{ item.title }}
					</v-btn>
					<!-- </template> -->
					<!-- <template v-slot:default="{ isActive }">
							<v-card>
								<v-toolbar color="primary" class="pl-3">{{
									apiName
								}}</v-toolbar>
								<v-card-text>
									<div class="pa-2">{{ apiResult }}</div>
								</v-card-text>
								<v-card-actions class="justify-end">
									<v-btn text @click="isActive.value = false">닫기</v-btn>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog> -->
				</v-card>
			</v-container>
			<!-- <h1>Redwood FHIR Library</h1>
			<h2>Patient</h2> -->
			<h3>Patient Result</h3>
			<textarea id="patient_display" cols="100" rows="15"></textarea>
			<h2>Observation</h2>
			<v-btn @click="btnObservationCreate()">Resource 생성</v-btn>
			<v-btn @click="btnObservationUpdate()">Resource 수정</v-btn>
			<v-btn @click="btnObservationDelete()">Resource 삭제</v-btn>
			<v-btn @click="btnObservationRead()">Resource 조회</v-btn>
			<v-btn @click="btnObservationReadVersion()">Resource 버전 조회</v-btn>
			<v-btn @click="btnObservationSearch()">Resource 검색</v-btn>
			<h3>Observation Result</h3>
			<textarea id="observation_display" cols="100" rows="15"></textarea>
			<h2>Common</h2>
			<v-btn @click="btnConformance()">Conformance</v-btn>
			<v-btn @click="btnResourceBundle()">Resource 일괄 처리</v-btn>
			<h3>Common Result</h3>
			<textarea id="common_display" cols="100" rows="15"></textarea>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { ref } from 'vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import { getPatient, createPatient, updatePatient } from '@/api/fhirApi.js';
// import fhir from 'fhir.js';
import * as fhir from 'fhir.js';
// import * as fhir from 'virtual:fhir-module';
import { useAuthStore } from '@/stores/auth';
// fetchFhirMethods
const oauth = useAuthStore().oauth;
const userInfo = useAuthStore().userInfo;

// // 인증 정보
// const fhirConfig = {
// 	baseUrl: 'http://fhir.redwoodhealth.kr/fhir',
// 	auth: {
// 		bearer: oauth.accessToken,
// 	},
// };

// const myClient = fhir(fhirConfig.value);

// Patient 생성
const btnPatientCreate = async () => {
	let resource = {
		resourceType: 'Patient',
		name: [
			{
				text: userInfo.userName + '생성',
			},
		],
		telecom: [
			{
				system: 'phone',
				value: userInfo.mobilePhone,
				use: 'mobile',
			},
			{
				system: 'email',
				email: userInfo.email,
			},
		],
		gender: 'male',
		birthDate: userInfo.birthday,
	};

	try {
		const response = await createPatient(resource);
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
	// myClient
	// 	.create({ resource: resource })
	// 	.then(response => {
	// 		console.log('response', response);
	// 		var resultData = JSON.stringify(response.data);
	// 		document.getElementById('patient_display').value = resultData;
	// 	})
	// 	.catch(error => {
	// 		console.log('error', error);
	// 	});
};

// Patient 수정
const btnPatientUpdate = async () => {
	var resource = {
		resourceType: 'Patient',
		id: '766371',
		name: [
			{
				text: userInfo.userName + '수정',
			},
		],
		telecom: [
			{
				system: 'phone',
				value: userInfo.mobilePhone,
				use: 'mobile',
			},
			{
				system: 'email',
				email: userInfo.email,
			},
		],
		gender: 'male',
		birthDate: userInfo.birthday,
	};
	try {
		const response = await updatePatient(resource, '766371');
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
	// myClient
	// 	.update({ type: 'Patient', id: '89937', resource: resource })
	// 	.then(response => {
	// 		console.log('response', response);
	// 		var resultData = JSON.stringify(response.data);
	// 		document.getElementById('patient_display').value = resultData;
	// 	})
	// 	.catch(error => {
	// 		console.log('error', error);
	// 	});
};

// Patient 삭제
const btnPatientDelete = () => {
	// myClient
	// 	.delete({ type: 'Patient', id: '89937' })
	// 	.then(response => {
	// 		console.log('response', response);
	// 		var resultData = response.data.issue[0].diagnostics;
	// 		document.getElementById('patient_display').value = resultData;
	// 	})
	// 	.catch(error => {
	// 		console.log('error', error);
	// 	});
};

// Patient 조회
const btnPatientRead = async () => {
	try {
		const response = await getPatient('766371');
		console.log('response', response);
	} catch (error) {
		console.error(error);
	}
	// 인증 정보
	// const fhirConfig = {
	// 	baseUrl: 'http://fhir.redwoodhealth.kr/fhir',
	// 	auth: {
	// 		bearer: oauth.accessToken,
	// 	},
	// };
	// const myClient1 = fhir(fhirConfig);
	// myClient1
	// 	.read({ type: 'Patient', id: '766371' })
	// 	// .conformance({})
	// 	.then(response => {
	// 		console.log('response', response);
	// 		var resultData = response.data;
	// 		document.getElementById('patient_display').value =
	// 			JSON.stringify(resultData);
	// 	})
	// 	.catch(error => {
	// 		console.log('error', error);
	// 	});
};

// myClient.conformance({})
// .then(response => {
//  console.log("response", response);
// })
// .catch(error => {
//  console.log("error", error);
// });

// Patient 버전 조회
const btnPatientReadVersion = () => {
	// myClient
	// 	.vread({ type: 'Patient', id: '89937', versionId: '2' })
	// 	.then(response => {
	// 		console.log('response', response);
	// 		var resultData = response.data;
	// 		document.getElementById('patient_display').value =
	// 			JSON.stringify(resultData);
	// 	})
	// 	.catch(error => {
	// 		console.log('error', error);
	// 	});
};

// Pateint 검색
const btnPatientSearch = () => {
	// myClient
	// 	.search({ type: 'Patient', query: { birthdate: '2020-02-20' } })
	// 	.then(response => {
	// 		console.log('response', response);
	// 		var entry = response.data.entry;
	// 		var resultData = '';
	// 		if (!entry) {
	// 			document.getElementById('patient_display').value =
	// 				'검색 결과 없습니다.';
	// 			return undefined;
	// 		}
	// 		for (var i in entry) {
	// 			var stringEntry = JSON.stringify(entry[i]);
	// 			resultData += stringEntry;
	// 		}
	// 		document.getElementById('patient_display').value = resultData;
	// 	})
	// 	.catch(error => {
	// 		console.log('error', error);
	// 	});
};
const patientFhirApiList = ref([
	{
		title: 'Patient 생성',
		methodsNm: btnPatientCreate,
	},
	{
		title: 'Patient 수정',
		methodsNm: btnPatientUpdate,
	},
	{
		title: 'Patient 삭제',
		methodsNm: btnPatientDelete,
	},
	{
		title: 'Patient 조회',
		methodsNm: btnPatientRead,
	},
	{
		title: 'Patient 버전 조회',
		methodsNm: btnPatientReadVersion,
	},
	{
		title: 'Patient 검색',
		methodsNm: btnPatientSearch,
	},
]);
</script>

<style lang="scss" scoped></style>
