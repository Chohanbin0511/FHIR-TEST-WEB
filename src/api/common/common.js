import { useAuthStore } from '@/stores/auth';
import router from '@/router/index.js';
// import { createCustomAlert } from '@/composables/alertCustom';

/**
 * 오류 공통처리
 * @param {Error} error
 */
export function handleError(error) {
	const store = useAuthStore();
	const { CLEAR_SESSION, CLEAR_OAUTH } = store;
	console.log('handleError:::', error, error.response); // 로그인 페이지 오류
	if (!error.response && !error.message) {
		// createCustomAlert(
		// 	'알림',
		// 	'서버와의 통신에 문제가 있습니다. </br> 서버 상태를 확인해 주세요.',
		// 	'확인',
		// );
		alert('에러');
	}
	// 401
	else if (error.response && error.response.status == 401) {
		alert('401에러');
		// createCustomAlert(
		// 	'알림',
		// 	`세션이 만료되었거나 다른 브라우저에서 </br> 로그인 하였습니다. 로그인 화면으로 돌아갑니다.`,
		// 	'확인',
		// );
		CLEAR_SESSION();
		CLEAR_OAUTH();
		router.push('/sdkSample/oauth');
	}
	// 404
	else if (error.response && error.response.status == 404) {
		// createCustomAlert('알림', `${error.response.data.message}`, '확인');
		alert('404에러');
	}
	// else {
	// 	createCustomAlert(
	// 		'알림',
	// 		`오류가 발생했습니다. status : ${error.response.status}`,
	// 		'확인',
	// 	);
	// 	return;
	// }
}
