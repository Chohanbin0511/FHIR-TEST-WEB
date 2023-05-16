<template>
	<v-app style="background-color: whitesmoke">
		<v-main>
			<TheView />
		</v-main>
	</v-app>
</template>

<script setup>
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheView from '@/layouts/TheView.vue';
import { useNetwork } from '@vueuse/core';

const { isOnline } = useNetwork();
const router = useRouter();
const route = useRoute();

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

<style></style>
