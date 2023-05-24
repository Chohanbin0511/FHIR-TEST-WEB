<template>
	<v-app style="background-color: whitesmoke">
		<v-main>
			<TheView />
		</v-main>
	</v-app>
	<!-- 공통 컴포넌트 -->
	<GlobalTemplatHandler :state="state"></GlobalTemplatHandler>
</template>

<script setup>
import { watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheView from '@/layouts/TheView.vue';
import GlobalTemplatHandler from '@/components/common/GlobalTemplatHandler.vue';
import { useNetwork } from '@vueuse/core';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import { useRootMethods } from '@/composables/useRootMethods';

const { isOnline } = useNetwork();
const router = useRouter();
const route = useRoute();

const { progress } = useNProgress();
provide('nprogress', progress);

// toast, modal, screenLoader
const { state, methods } = useRootMethods();
provide('rootMethods', methods);
provide('rootState', state);

watch(
	() => isOnline.value,
	() => {
		if (!isOnline.value) {
			router.push({
				name: 'network-error-page',
				query: {
					prevRoute: route.name,
				},
			});
		}
	},
);
</script>

<style>
@import url('../src/assets/css/custom.css');
@import url('../src/assets/css/progress.css');
</style>
