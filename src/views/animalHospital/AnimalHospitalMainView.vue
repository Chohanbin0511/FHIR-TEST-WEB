<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<v-card-title class="mt-2">Hospital Map</v-card-title>
				<v-banner color="pink-darken-1" icon="mdi-account-box" lines="one">
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>
					<v-banner-text> 동물병원 Map (부천시) </v-banner-text>
				</v-banner>
				<AnimalHospitalList> </AnimalHospitalList>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import AnimalHospitalList from '@/components/animalHospital/AnimalHospitalList.vue';
</script>

<style lang="scss" scoped></style>
