<template>
	<div>병원리스트</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getAnimalHospitalList } from '@/api/animalHospitalApi';

const fetchAnimalHospitalList = async () => {
	try {
		const { data } = await getAnimalHospitalList();
		// inputAreaList.value = data;
		console.log('data', data);
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	fetchAnimalHospitalList();
});
</script>

<style lang="scss" scoped></style>
