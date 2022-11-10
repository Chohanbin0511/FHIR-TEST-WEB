<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<h1>Main Page</h1>
			</v-container>

			<v-container>
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
							<v-toolbar color="primary" class="pl-3">{{ apiName }}</v-toolbar>
							<v-card-text>
								<div class="pa-2">{{ apiResult }}</div>
							</v-card-text>
							<v-card-actions class="justify-end">
								<v-btn text @click="isActive.value = false">닫기</v-btn>
							</v-card-actions>
						</v-card>
					</template>
				</v-dialog>
				<!-- <v-row>
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
				</v-row> -->
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTokenAuthCodeResult } from '@/api/oauthApi';
import { useAuthStore } from '@/stores/auth';
import * as OpenAPI from '@/assets/js/sdk/openApi';

import TheViewLayout from '@/layouts/TheViewLayout.vue';

// const samplePageList = ref([
// 	{ title: 'Fhir Sample', type: 'fhir' },
// 	{ title: 'OAuth Sample', type: 'oauth' },
// 	{ title: 'OpenApi Sample', type: 'openApi' },
// ]);

// const router = useRouter();
// const goPage = type => {
// 	router.push(`/sdkSample/${type}`);
// };

const store = useAuthStore();
const { SET_LOGIN, SET_OAUTH } = store;

// 회원 정보 조회
const btnFetchUserInfo = async token => {
	const configToken = {
		baseUrl: 'https://api.redwoodhealth.kr',
		accessToken: token,
	};
	await OpenAPI.fetchUserInfo(configToken)
		.then(response => {
			console.log('response', response);
			SET_LOGIN(response);
		})
		.catch(error => {
			console.log('error', error);
		});
};

const route = useRoute();

let lsearch = ref(location.search);
const isCode = ref(route.query.code);
const tokenResultSet = async () => {
	if (lsearch.value != undefined && isCode.value) {
		let lsearchSplit = lsearch.value.split('&');
		let code = lsearchSplit[0].split('=')[1];
		const response = await getTokenAuthCodeResult(code);
		SET_OAUTH(response);
		btnFetchUserInfo(response.access_token);
	} else {
		return;
	}
};

onMounted(() => {
	tokenResultSet();
});
</script>

<style lang="scss" scoped></style>
