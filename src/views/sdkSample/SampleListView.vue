<template>
	<TheViewLayout :style="'height:' + height + 'px;'">
		<template #mainPanel>
			<v-container>
				<h1>SDK Sample</h1>
			</v-container>

			<v-container>
				<v-row>
					<v-col
						v-for="item in samplePageList"
						:key="item"
						class="mx-auto my-2"
						max-width="200"
						cols="12"
						md="4"
					>
						<v-btn width="100%" @click="goPage(item.type)">
							{{ item.title }}
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

import TheViewLayout from '@/layouts/TheViewLayout.vue';

const { height } = useWindowSize();

// const innerHeight = ref(0);

// onMounted(() => {
// 	innerHeight.value = window.innerHeight;
// });

// const updateInnerHeight = () => {
// 	innerHeight.value = window.innerHeight;
// };

const samplePageList = ref([
	{ title: 'Fhir Sample', type: 'fhir' },
	{ title: 'OAuth Sample', type: 'oauth' },
	{ title: 'OpenApi Sample', type: 'openApi' },
]);

const router = useRouter();
const goPage = type => {
	router.push(`/sdkSample/${type}`);
};
</script>

<style lang="scss" scoped></style>
