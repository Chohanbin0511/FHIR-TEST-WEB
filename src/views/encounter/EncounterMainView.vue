<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<v-card-title class="mt-2">Encounter Main</v-card-title>
				<v-banner
					color="blue-lighten-1"
					icon="mdi-information-outline"
					lines="one"
				>
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>

					<v-banner-text class="d-flex fill-height align-center">
						Pet의 진료기록을 기록/관리 가능합니다
					</v-banner-text>
					<!-- <v-banner-actions class="mt-1">
						<v-btn>로그인 하기</v-btn>
					</v-banner-actions> -->
				</v-banner>
			</v-container>
			<v-container>
				<v-btn
					prepend-icon="mdi-map-outline"
					variant="outlined"
					rounded="lg"
					block
					style="
						height: 65px;
						font-size: 16px;
						font-weight: 600;
						background-color: white;
					"
					color="#3ca1d2"
					@click="$router.push('/animalHospital/animalHospitalMain')"
				>
					지도로 병원 찾기</v-btn
				>
			</v-container>
			<v-container>
				<AnimalHospitalList> </AnimalHospitalList>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import AnimalHospitalList from '../../components/animalHospital/AnimalHospitalList.vue';
</script>

<style lang="scss" scoped></style>
