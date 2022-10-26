<template>
	<v-container class="align-center h-100">
		<div class="py-4 align-end">
			<div class="text-center" style="height: 250px"></div>
			<v-card
				class="text-center mx-auto pa-12 pb-8"
				elevation="8"
				max-width="448"
				rounded="lg"
			>
				<h2 class="mx-auto mb-5 align-center">간편 로그인</h2>

				<v-btn v-on:click="redwoodHealthLogin" style="height: 50px">
					<img
						:src="redwoodHealthLoginBtn"
						style="cursor: pointer; width: 40px"
					/>
					<h3 class="ml-2">레드우드 플랫폼 로그인</h3>
				</v-btn>
			</v-card>
		</div>
	</v-container>
	<!-- 공통 loading으로 검토중 -->
	<!-- <v-container v-else style="height: 600px; margin-top: 150px">
		<v-row class="fill-height" align-content="center" justify="center">
			<v-col class="text-subtitle-1 text-center" cols="12">
				잠시만 기다려 주세요.
			</v-col>
			<v-col cols="6">
				<v-progress-linear
					color="deep-purple accent-4"
					indeterminate
					rounded
					height="6"
				></v-progress-linear>
			</v-col>
		</v-row>
	</v-container> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
import {
	getTokenAuthCode,
	//  getTokenAuthCodeResult
} from '@/api/oauthApi';
const redwoodHealthLoginBtn = ref();

onMounted(async () => {
	redwoodHealthLoginBtn.value = (
		await import(/* @vite-ignore */ '@/assets/images/redwoodHealth_logo_1.png')
	).default;
});

/**
 * Authorization Code 인증
 */
const FetchTokenAuthCode = async () => {
	try {
		await getTokenAuthCode();
	} catch (error) {
		console.error(error);
	}
};

const redwoodHealthLogin = () => {
	FetchTokenAuthCode();
};
</script>

<style lang="scss" scoped></style>
