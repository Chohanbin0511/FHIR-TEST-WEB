<template>
	<!-- 공통 컴포넌트 -->
	<ToastSimpleMessage
		v-if="state.toast.isShow"
		:content="state.toast.content"
	></ToastSimpleMessage>
	<FullScreenLoader
		v-if="state.screenLoader.isShow"
		:content="state.screenLoader.content"
	></FullScreenLoader>
	<ModalSimpleConfirm
		v-if="state.simpleConfirm.isShow"
		:header="state.simpleConfirm.header"
		:content="state.simpleConfirm.content"
		:btn-text="state.simpleConfirm.btnText"
		@clickBtn="rootMethods.isSimpleConfirm(false, null, null, null)"
	></ModalSimpleConfirm>
	<WebViewPopUp
		:is-show="state.webViewPopUp.isShow"
		:header="state.webViewPopUp.header"
		:content="state.webViewPopUp.content"
		@clickBtn="rootMethods.closeWebViewPopUp()"
	></WebViewPopUp>
</template>

<script setup>
import { inject } from 'vue';

import ToastSimpleMessage from '@/components/common/ToastSimpleMessage.vue';
import FullScreenLoader from '@/components/common/FullScreenLoader.vue';
import ModalSimpleConfirm from '@/components/common/ModalSimpleConfirm.vue';
import WebViewPopUp from '@/components/common/WebViewPopUp.vue';

defineProps({
	state: {
		type: Object,
		required: true,
	},
});

const rootMethods = inject('rootMethods');
</script>

<style scoped></style>
