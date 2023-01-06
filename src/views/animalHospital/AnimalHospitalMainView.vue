<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container class="pb-0">
				<v-sheet style="display: flex">
					<v-icon class="mt-5 ml-5" @click="$router.go(-1)"
						>mdi-arrow-left-thick</v-icon
					>
					<v-card-title class="mt-2 pl-2"> Hospital Map </v-card-title>
				</v-sheet>
				<!-- <v-card-title class="mt-2">Hospital Map</v-card-title> -->
				<v-banner
					color="pink-darken-1"
					icon="mdi-account-box"
					lines="one"
					class="rounded-lg"
				>
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>
					<v-banner-text class="d-flex fill-height align-center">
						동물병원(부천시)의 위치정보를 조회할 수 있다.
					</v-banner-text>
				</v-banner>
			</v-container>
			<v-container>
				<AnimalHospitalMapList> </AnimalHospitalMapList>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import AnimalHospitalMapList from '@/components/animalHospital/AnimalHospitalMapList.vue';
</script>

<style lang="scss" scoped></style>
