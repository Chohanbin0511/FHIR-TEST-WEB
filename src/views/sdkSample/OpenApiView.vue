<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>OPEN API Sample</h1>
			</v-container>
			<!----------------------   회원가입 API   ---------------------------->
			<v-container>
				<v-card class="ma-2 pa-4">
					<h2 class="mb-2">회원가입 API</h2>
					<v-dialog transition="dialog-bottom-transition">
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								class="mb-2 mr-4"
								v-for="item in userPartOpenApiList"
								:key="item"
								@click="item.methodsNm(item.title)"
							>
								{{ item.title }}
							</v-btn>
						</template>
						<template v-slot:default="{ isActive }">
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
					</v-dialog>
				</v-card>
			</v-container>

			<!----------------------   회원정보관리 API   ---------------------------->
			<v-container>
				<v-card class="ma-2 pa-4">
					<h2 class="mb-2">
						회원정보관리 API
						<v-tooltip activator="parent" location="bottom"
							>AccessToken 발급 후 코드 저장하여 사용 가능함</v-tooltip
						>
					</h2>
					<v-dialog transition="dialog-bottom-transition">
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								class="mb-2 mr-4"
								v-for="item in userInfoPartOpenApiList"
								:key="item"
								@click="item.methodsNm(item.title)"
							>
								{{ item.title }}
							</v-btn>
						</template>
						<template v-slot:default="{ isActive }">
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
					</v-dialog>
				</v-card>
			</v-container>
			<!----------------------   건강 예측 API   ---------------------------->
			<v-container>
				<v-card class="ma-2 pa-4">
					<h2 class="mb-2">
						건강 예측 API
						<v-tooltip activator="parent" location="bottom"
							>AccessToken 발급 후 코드 저장하여 사용 가능함</v-tooltip
						>
					</h2>
					<v-dialog transition="dialog-bottom-transition">
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								class="mb-2 mr-4"
								v-for="item in healthPredictOpenApiList"
								:key="item"
								@click="item.methodsNm(item.title)"
							>
								{{ item.title }}
							</v-btn>
						</template>
						<template v-slot:default="{ isActive }">
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
					</v-dialog>
				</v-card>
			</v-container>
			<!----------------------  Blockchain API   ---------------------------->
			<v-container>
				<v-card class="ma-2 pa-4">
					<h2 class="mb-2">
						Blockchain API
						<v-tooltip activator="parent" location="bottom"
							>AccessToken 발급 후, token과 PatientId를 저장하여 사용
							가능함</v-tooltip
						>
					</h2>
					<v-dialog transition="dialog-bottom-transition">
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								class="mb-2 mr-4"
								v-for="item in blockchainOpenApiList"
								:key="item"
								@click="item.methodsNm(item.title)"
							>
								{{ item.title }}
							</v-btn>
						</template>
						<template v-slot:default="{ isActive }">
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
					</v-dialog>
				</v-card>
			</v-container>
			<!----------------------  기타 API   ---------------------------->
			<v-container>
				<v-card class="ma-2 pa-4">
					<h2 class="mb-2">기타 API</h2>
					<v-dialog transition="dialog-bottom-transition">
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								class="mb-2 mr-4"
								v-for="item in etcOpenApiList"
								:key="item"
								@click="item.methodsNm(item.title)"
							>
								{{ item.title }}
							</v-btn>
						</template>
						<template v-slot:default="{ isActive }">
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
					</v-dialog>
				</v-card>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { ref } from 'vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import * as OpenAPI from '@/assets/js/sdk/openApi';
// import { OAUTH_CONFIG } from '@/api/common/config';

// 회원가입 API, 모바일 앱 버전 API에 필요한 인증정보
const config = {
	baseUrl: 'https://api.redwoodhealth.kr',
	client_id: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
	client_secret: `${import.meta.env.VITE_APP_OAUTH_CLIENT_SECRET}`,
};

const apiName = ref(null);
const apiResult = ref(null);

const resetDialogContent = () => {
	apiName.value = null;
	apiResult.value = null;
};
///////////////////////////////////////////////////////////////// 회원가입 API ////////////////////////////////////////////////////////////////////////////////////////

// 회원 아이디 중복 확인
const btnCheckExistUserId = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		userId: 'chohbin1',
	};

	OpenAPI.checkExistUserId(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 핸드폰번호 인증(SMS)
const btnIdentifyMobilePhone = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		mobilePhone: '01000000000',
	};

	OpenAPI.identifyMobilePhone(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 플랫폼 약관 목록 조회
const btnFetchStplat = title => {
	resetDialogContent();
	apiName.value = title;
	OpenAPI.fetchStplat(config)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 신규 회원 가입
const btnRegister = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		serviceId: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
		userId: 'chohbin2',
		userName: '테스트2',
		password:
			'2fa1ecf9826474fe8e18a96441c94a500cd968454eeb05ed056d0918e19cd118',
		birthday: '2020-06-09',
		weddingAnniversary: '2020-06-09',
		gender: 'M',
		email: 'test@test.com',
		mobilePhone: '01000004249',
		cablePhone: '020000000',
		zip: '07327',
		address: '서울 영등포구 여의나루로 71 동화빌딩',
		detailAddress: '502호',
		idLostQuestion: '일하는곳은 어디입니까?',
		idLostAnswer: '디케이아이테크놀로지',
		platformStplat: [
			{
				stplatSn: '1',
				agreeYn: 'Y',
			},
			{
				stplatSn: '2',
				agreeYn: 'Y',
			},
			{
				stplatSn: '3',
				agreeYn: 'Y',
			},
			{
				stplatSn: '4',
				agreeYn: 'Y',
			},
		],
	};

	OpenAPI.register(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 기존 회원 서비스 가입
const btnRegisterService = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		serviceId: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
		userId: 'test',
	};

	OpenAPI.registerService(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 이메일/핸드폰번호로 아이디 찾기
const btnSearchUserId = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		userName: '테스트사용자',
		type: 'email',
		email: 'test@test.com',
	};

	OpenAPI.searchUserId(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 질문/답변으로 아이디 찾기
const btnSearchUserIdByQuestion = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		userName: '테스트사용자',
		type: 'question',
		idLostQuestion: '일하는곳은 어디입니까?',
		idLostAnswer: '디케이아이테크놀로지',
	};

	OpenAPI.searchUserId(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 이메일/핸드폰번호로 비밀번호 찾기
const btnSearchPassword = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		userId: 'chohbin1',
		type: 'mobile',
		mobilePhone: '01000000000',
	};

	OpenAPI.searchPassword(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 인증코드 확인
const btnCheckAuthCode = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		userId: 'test',
		authCode: '755xz7',
	};

	OpenAPI.checkAuthCode(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 업데이트 패스워드
const btnUpdatePassword = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		userId: 'chohbin1',
		authCode: '755xz7',
		password:
			'2fa1ecf9826474fe8e18a96441c94a500cd968454eeb05ed056d0918e19cd118',
	};

	OpenAPI.updatePassword(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

const userPartOpenApiList = ref([
	{
		title: '회원 아이디 중복 확인',
		methodsNm: btnCheckExistUserId,
	},
	{
		title: '핸드폰번호 인증(SMS)',
		methodsNm: btnIdentifyMobilePhone,
	},
	{
		title: '플랫폼 약관 목록 조회',
		methodsNm: btnFetchStplat,
	},
	{
		title: '신규 회원가입',
		methodsNm: btnRegister,
	},
	{
		title: '기존 회원 서비스 가입',
		methodsNm: btnRegisterService,
	},
	{
		title: '이메일/핸드폰번호로 아이디 찾기',
		methodsNm: btnSearchUserId,
	},
	{
		title: '질문/답변으로 아이디 찾기',
		methodsNm: btnSearchUserIdByQuestion,
	},
	{
		title: '이메일/핸드폰번호로 비밀번호 찾기',
		methodsNm: btnSearchPassword,
	},
	{
		title: '인증코드 확인',
		methodsNm: btnCheckAuthCode,
	},
	{
		title: '업데이트 패스워드',
		methodsNm: btnUpdatePassword,
	},
]);

///////////////////////////////////////////////////////////////// 회원정보관리 API ////////////////////////////////////////////////////////////////////////////////////////

// 회원정보관리 API, 건강 예측 API, Blockchain API에 필요한 인증정보
const configToken = {
	baseUrl: 'https://api.redwoodhealth.kr',
	accessToken:
		'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaG9oYmluVGVzdCIsInN1YiI6ImNob2hiaW4xIiwidXNlcl9uYW1lIjoiY2hvaGJpbjEiLCJzY29wZSI6WyJwaHIucmVhZCIsInBoci53cml0ZSJdLCJpc3MiOiJSZWR3b29kUGxhdGZvcm0iLCJuYW1lIjoidGVzdCIsImV4cCI6MTY2NjcxNzkwNCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImNiZmM2YTBlLTFmODctNDI1NS04NGZhLTU5MmY3YzNhNWM4NSIsImNsaWVudF9pZCI6ImNob2hiaW5UZXN0In0.Kb7NLFw8Tb9cVBDJoTxabuaRxDwt3ERNzFstluNFkr58UEiCclOTya2Xzms_kzTDXfrogkTqmTrmn3o4I4VdH8YL5AtQC-PwjlbglL7ZgDTWpZbBsIIXgIXdFL_OMGYBjCWGx1dw9p0-94Nc1L-0KPMlUx5wFJpPuoshEI7FXjS9880qGxKhCHiKi1Egg79EZGjnYWPjS3GeIzs0iVB8Tl9Epi5_ZXua0aNEgiadUM-rRpsJhGiTJSVTacV_G2HM595D5pppD57CwgZ01sAMmzhdmFFjDoIJB6-MgYU9smBLaeixUJ2Cbu2x49RLMDepQfHKp1l8zPivJduHU09T8g',
};

// 회원 정보 조회
const btnFetchUserInfo = title => {
	resetDialogContent();
	apiName.value = title;
	OpenAPI.fetchUserInfo(configToken)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 패스워드 확인
const btnCheckPassword = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		password:
			'2fa1ecf9826474fe8e18a96441c94a500cd968454eeb05ed056d0918e19cd118',
	};

	OpenAPI.checkPassword(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 회원 정보 수정
const btnModifyUserInfo = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		serviceId: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
		userId: 'test',
		userName: '테스트사용자수정',
		password:
			'2fa1ecf9826474fe8e18a96441c94a500cd968454eeb05ed056d0918e19cd118',
		birthday: '2020-06-09',
		weddingAnniversary: '2020-06-09',
		gender: 'M',
		email: 'test@test.com',
		mobilePhone: '01000000000',
		cablePhone: '020000000',
		zip: '07327',
		address: '서울 영등포구 여의나루로 71 동화빌딩',
		detailAddress: '905호',
		idLostQuestion: '일하는곳은 어디입니까?',
		idLostAnswer: '디케이아이테크놀로지',
	};

	OpenAPI.modifyUserInfo(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 회원 탈퇴
const btnUnregister = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		serviceId: 'openAPIJavaScriptLibrary',
		reason: '테스트로 인한 회원탈퇴',
	};

	OpenAPI.unregister(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// PHR 공유자 추가
const btnAddPHRSharedUser = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		sharedUserId: 'test02',
	};

	OpenAPI.addPHRSharedUser(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// PHR 공유자 조회
const btnFetchPHRSharedUserList = title => {
	resetDialogContent();
	apiName.value = title;
	OpenAPI.fetchPHRSharedUserList(configToken)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// PHR 공유자 삭제
const btnRemovePHRSharedUser = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		sharedUserId: 'test02',
	};

	OpenAPI.removePHRSharedUser(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// PHR 공유자 변경
const btnModifyPHRSharedUsers = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		sharedUserIds: ['test02', 'test03'],
	};

	OpenAPI.modifyPHRSharedUsers(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

const userInfoPartOpenApiList = ref([
	{
		title: '회원 정보 조회',
		methodsNm: btnFetchUserInfo,
	},
	{
		title: '패스워드 확인',
		methodsNm: btnCheckPassword,
	},
	{
		title: '회원 정보 수정',
		methodsNm: btnModifyUserInfo,
	},
	{
		title: '회원 탈퇴',
		methodsNm: btnUnregister,
	},
	{
		title: 'PHR 공유자 추가',
		methodsNm: btnAddPHRSharedUser,
	},
	{
		title: 'PHR 공유자 조회',
		methodsNm: btnFetchPHRSharedUserList,
	},
	{
		title: 'PHR 공유자 삭제',
		methodsNm: btnRemovePHRSharedUser,
	},
	{
		title: 'PHR 공유자 수정',
		methodsNm: btnModifyPHRSharedUsers,
	},
]);

///////////////////////////////////////////////////////////////// 건강예측 API ////////////////////////////////////////////////////////////////////////////////////////

// 관상동맥질환 예측
const btnCoronaryArtery = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		params: [49, 2, 3, 69.566, 226.199556, 0, 172.757878],
	};

	OpenAPI.coronaryArtery(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 당뇨병 질환 예측
const btnDiabetes = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		params: [
			56, 2, 0, 3, 0, 1, 5, 1, 0, 1, 26.613037, 124.023, 175.355477, 129.333,
			46.123809,
		],
	};

	OpenAPI.diabetes(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 뇌졸중 질환 예측
const btnStroke = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		params: [
			1.0, 79.0, 0.0, 0.0, 149.3, 53.6, 24.046129, 2.0, 2.0, 2.0, 2.0, 3.0, 2.0,
			2.0, 4.0, 1.0, 6.0,
		],
	};

	OpenAPI.stroke(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 신체나이 예측
const btnBodyAge = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		params: [41, 180.6, 72.8, 118, 79, 92, 14.5],
	};

	OpenAPI.bodyAge(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 동맥경화성 심혈관질환 예측
const btnASCVD = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		params: [49, 2, 3, 69.566, 226.199556, 0, 172.757878],
	};

	OpenAPI.ASCVD(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 10년내 당뇨병 발병 예측
const btnDiabetesIn10Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 30,
		gender: 1,
		smoke_cat: 1,
		b_corticosteroids: 0,
		b_cvd: 0,
		b_learning: 0,
		b_atypicalantipsy: 0,
		b_manicschiz: 0,
		b_statin: 0,
		b_treatedhyp: 0,
		fh_diab: 1,
		fbs: 100,
		hba1c: 18,
		height: 180,
		weight: 78,
	};

	OpenAPI.diabetesIn10Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 10년내 심장마비 발병 예측
const btnHeartAttackIn10Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 30,
		gender: 1,
		smoke_cat: 1,
		diabetes_cat: 1,
		fh_cvd: 0,
		b_renal: 0,
		b_AF: 0,
		b_treatedhyp: 0,
		b_migraine: 1,
		b_ra: 0,
		b_sle: 0,
		b_semi: 0,
		b_atypicalantipsy: 0,
		b_corticosteroids: 0,
		b_impotence2: 0,
		rati: 5,
		sbp: 100,
		sbps5: 20,
		height: 180,
		weight: 78,
	};

	OpenAPI.heartAttackIn10Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 10년내 11종 암 발병 예측
const btnCancersIn10Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 30,
		gender: 1,
		smoke_cat: 1,
		alcohol_cat6: 1,
		b_asbestos: 0,
		b_asthma: 0,
		b_barratts: 0,
		b_bloodcancer: 0,
		b_chronicpan: 0,
		b_colitis: 0,
		b_colorectal: 0,
		b_copd: 0,
		b_lungcancer: 0,
		b_manicschiz: 0,
		b_oesgastric: 0,
		b_oralcancer: 0,
		b_pancreascancer: 0,
		b_peptic: 0,
		b_polyp: 0,
		b_prostatecancer: 0,
		b_renalcancer: 0,
		diabetes_cat: 0,
		fh_bloodcancer: 0,
		fh_gicancer: 0,
		fh_lungcancer: 0,
		fh_prostatecancer: 0,
		height: 180,
		weight: 78,
	};

	OpenAPI.cancersIn10Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 5년내 정맥 혈전 색전증(DVT) 발병 예측
const btnDvtIn5Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 29,
		gender: 1,
		smoke_cat: 1,
		b_CCF: 0,
		b_admit: 0,
		b_antipsychotic: 0,
		b_anycancer: 0,
		b_cop: 0,
		b_copd: 0,
		b_hrt: 0,
		b_ibd: 0,
		b_renal: 0,
		b_tamoxifen: 0,
		b_varicosevein: 0,
		height: 180,
		weight: 78,
	};

	OpenAPI.dvtIn5Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 5년내 중증도의 만성 신장 질환(CKD) 발병 예측
const btnCkdIn5Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 35,
		gender: 1,
		smoke_cat: 1,
		b_CCF: 0,
		b_cvd: 0,
		b_pvd: 0,
		b_ra: 0,
		b_renalstones: 0,
		b_sle: 0,
		b_treatedhyp: 0,
		diabetes_cat: 0,
		fh_kidney: 0,
		height: 180,
		weight: 78,
	};

	OpenAPI.ckdIn5Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 5년내 말기 신부전 신장 질환(ESRD) 발병 예측
const btnEsrdIn5Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 35,
		gender: 1,
		smoke_cat: 1,
		b_CCF: 0,
		b_cvd: 0,
		b_pvd: 0,
		b_ra: 0,
		b_renalstones: 0,
		b_sle: 0,
		b_treatedhyp: 0,
		diabetes_cat: 0,
		fh_kidney: 0,
		height: 180,
		weight: 78,
	};

	OpenAPI.esrdIn5Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 10년내 골다공증 골절 발병 예측
const btnOsteoporoticFractureIn10Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 30,
		gender: 1,
		smoke_cat: 1,
		alcohol_cat6: 0,
		b_antidepressant: 0,
		b_anycancer: 0,
		b_asthmacopd: 0,
		b_carehome: 0,
		b_corticosteroids: 0,
		b_cvd: 0,
		b_dementia: 0,
		b_endocrine: 0,
		b_epilepsy2: 0,
		b_falls: 0,
		b_fracture4: 0,
		b_hrt_oest: 0,
		b_liver: 0,
		b_malabsorption: 0,
		b_parkinsons: 0,
		b_ra_sle: 0,
		b_renal: 0,
		diabetes_cat: 0,
		fh_osteoporosis: 0,
		height: 180,
		weight: 78,
	};

	OpenAPI.osteoporoticFractureIn10Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 10년내 고관절 골절 발병 예측
const btnHipFractureIn10Years = title => {
	resetDialogContent();
	apiName.value = title;
	// 남성 데이터
	const data = {
		age: 30,
		gender: 1,
		smoke_cat: 1,
		alcohol_cat6: 0,
		b_antidepressant: 0,
		b_anycancer: 0,
		b_asthmacopd: 0,
		b_carehome: 0,
		b_corticosteroids: 0,
		b_cvd: 0,
		b_dementia: 0,
		b_endocrine: 0,
		b_epilepsy2: 0,
		b_falls: 0,
		b_fracture4: 0,
		b_hrt_oest: 0,
		b_liver: 0,
		b_parkinsons: 0,
		b_ra_sle: 0,
		b_renal: 0,
		diabetes_cat: 0,
		fh_osteoporosis: 0,
		height: 180,
		weight: 78,
	};

	OpenAPI.hipFractureIn10Years(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 사용자의 예측모델별 마지막 예측결과값 조회
const btnFetchLatestPredict = title => {
	resetDialogContent();
	apiName.value = title;
	// 예측모델 아이디
	const data = {
		modelId: '15',
	};

	OpenAPI.fetchLatestPredict(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

const healthPredictOpenApiList = ref([
	{
		title: '관상동맥질환 예측',
		methodsNm: btnCoronaryArtery,
	},
	{
		title: '당뇨병 질환 예측',
		methodsNm: btnDiabetes,
	},
	{
		title: '뇌졸중 질환 예측',
		methodsNm: btnStroke,
	},
	{
		title: '신체나이 예측',
		methodsNm: btnBodyAge,
	},
	{
		title: '동맥경화성 심혈관질환(ASCVD) 예측',
		methodsNm: btnASCVD,
	},
	{
		title: '10년내 당뇨병 발병 예측',
		methodsNm: btnDiabetesIn10Years,
	},
	{
		title: '10년내 심장마비 발병 예측',
		methodsNm: btnHeartAttackIn10Years,
	},
	{
		title: '10년내 11종 암 발병 예측',
		methodsNm: btnCancersIn10Years,
	},
	{
		title: '5년내 정맥 혈전 색전증 발병 예측',
		methodsNm: btnDvtIn5Years,
	},
	{
		title: '5년내 중증도의 만성 신장 질환 발병 예측',
		methodsNm: btnCkdIn5Years,
	},
	{
		title: '5년내 말기 신부전 신장 질환 발병 예측',
		methodsNm: btnEsrdIn5Years,
	},
	{
		title: '10년내 골다공증 골절 발병 예측',
		methodsNm: btnOsteoporoticFractureIn10Years,
	},
	{
		title: '10년내 고관절 골절 발병 예측',
		methodsNm: btnHipFractureIn10Years,
	},
	{
		title: '사용자의 예측모델별 마지막 예측값 조회',
		methodsNm: btnFetchLatestPredict,
	},
]);

///////////////////////////////////////////////////////////////// Blockchain API ////////////////////////////////////////////////////////////////////////////////////////

// 회원 정보 Block 생성
const btnCreateBlockchain = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		url: 'http://localhost:8080/fhir/Patient/89937',
	};

	OpenAPI.createBlockchain(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// Resource 추가
const btnAddResource = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		type: 'Observation',
		url: 'http://localhost:8080/fhir/Observation/90009',
		lastUpdated: '2020-02-20 23:59:59',
	};

	OpenAPI.addResource(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 회원 정보 Block 수정
const btnUpdateBlockchain = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		url: 'http://localhost:8080/fhir/Patient/89938',
	};

	OpenAPI.updateBlockchain(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 회원 정보 Block 조회
const btnFetchBlockchain = title => {
	resetDialogContent();
	apiName.value = title;
	OpenAPI.fetchBlockchain(configToken)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 회원 정보 Block 삭제
const btnDeleteBlockchain = title => {
	resetDialogContent();
	apiName.value = title;
	OpenAPI.deleteBlockchain(configToken)
		.then(response => {
			console.log('response', response);
			const answer = '블록을 삭제했습니다.';
			document.getElementById('openAPI_display').value = answer;
		})
		.catch(error => {
			console.log('error', error);
		});
};

const blockchainOpenApiList = ref([
	{
		title: '회원 정보 Block 생성',
		methodsNm: btnCreateBlockchain,
	},
	{
		title: 'Resource 추가',
		methodsNm: btnAddResource,
	},
	{
		title: '회원 정보 Block 수정',
		methodsNm: btnUpdateBlockchain,
	},
	{
		title: '회원 정보 Block 조회',
		methodsNm: btnFetchBlockchain,
	},
	{
		title: '회원 정보 Block 삭제',
		methodsNm: btnDeleteBlockchain,
	},
]);

///////////////////////////////////////////////////////////////// 모바일 앱 버전 API ////////////////////////////////////////////////////////////////////////////////////////

// 모바일 앱 최신 버전정보 조회
const btnPHRApp = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		appSn: '1',
	};

	OpenAPI.PHRApp(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

///////////////////////////////////////////////////////////////// 문자 메시지 발송 API ////////////////////////////////////////////////////////////////////////////////////////

// 문자 메시지 발송
const btnSendSMSMsg = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		mobilePhone: '01000000000',
		message: '안녕하세요.\n테스트 메시지입니다.',
	};

	OpenAPI.sendSMSMsg(config, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

// 유저 문자 메시지 발송
const btnSendUserSMSMsg = title => {
	resetDialogContent();
	apiName.value = title;
	const data = {
		mobilePhone: '01000000000',
		message: '안녕하세요.\n테스트 메시지입니다.',
	};

	OpenAPI.sendUserSMSMsg(configToken, data)
		.then(response => {
			console.log('response', response);
			apiResult.value = response;
		})
		.catch(error => {
			console.log('error', error);
		});
};

const etcOpenApiList = ref([
	{
		title: '모바일 앱 최신 버전정보 조회',
		methodsNm: btnPHRApp,
	},
	{
		title: '문자 메시지 발송',
		methodsNm: btnSendSMSMsg,
	},
	{
		title: '유저 문자 메시지 발송',
		methodsNm: btnSendUserSMSMsg,
	},
]);
</script>

<style lang="scss" scoped></style>
