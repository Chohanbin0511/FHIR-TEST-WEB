<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<div>encounter 메인</div>
				<AnimalHostpitalList> </AnimalHostpitalList>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import AnimalHostpitalList from '@/components/animalHospital/AnimalHostpitalList.vue';
</script>

<style lang="scss" scoped></style>
