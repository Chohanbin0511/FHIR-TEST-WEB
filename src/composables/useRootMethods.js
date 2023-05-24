import { ref } from 'vue';

export const useRootMethods = () => {
	const state = ref({
		toast: {
			isShow: false,
			content: null,
		},
		screenLoader: {
			isShow: false,
			content: null,
		},
		simpleConfirm: {
			isShow: false,
			header: null,
			content: null,
			btnText: null,
		},
		webViewPopUp: {
			isShow: false,
			header: null,
			content: null,
		},
	});

	const methods = {
		openToast(content) {
			state.value.toast.isShow = true;
			state.value.toast.content = content;
			setTimeout(() => {
				state.value.toast.isShow = false;
				state.value.toast.content = null;
			}, 3000);
		},
		isScreenLoader(isShow, content) {
			state.value.screenLoader.isShow = isShow;
			state.value.screenLoader.content = content;
		},
		isSimpleConfirm(isShow, header, content, btnText) {
			state.value.simpleConfirm.isShow = isShow;
			state.value.simpleConfirm.header = header;
			state.value.simpleConfirm.content = content;
			state.value.simpleConfirm.btnText = btnText;
		},
		openWebViewPopUp(header, content) {
			state.value.webViewPopUp.isShow = true;
			state.value.webViewPopUp.header = header;
			state.value.webViewPopUp.content = content;
		},
		closeWebViewPopUp() {
			state.value.webViewPopUp.isShow = false;
		},
	};

	return {
		state,
		methods,
	};
};
