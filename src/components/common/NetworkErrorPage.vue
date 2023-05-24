<template>
	<div>
		네트워크 오류
		<br />
		현재 통신상태가 원활하지 않습니다. 네트워크 연결 상태를 확인 후 다시 시도해
		주세요.
	</div>
	<button @click="goPrev">재시도</button>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useNetwork } from '@vueuse/core';

const { isOnline } = useNetwork();

const rootMethods = inject('rootMethods');

const router = useRouter();
const route = useRoute();
const goPrev = () => {
	console.log(!route.query);
	if (!isOnline.value) {
		rootMethods.isSimpleConfirm(true, '안내', '네트워크 오류', '확인');
	} else {
		if (Object.keys(route.query).length === 0) {
			router.go(-1);
		} else {
			router.replace({ name: route.query.prevRoute });
		}
	}
};
</script>

<style scoped></style>
