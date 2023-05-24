<template>
	<Teleport to="body">
		<div class="loading-screen">
			<div class="loading-box">
				<div class="loading-spinner"></div>
				<div class="loading-content">{{ content }}</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
defineProps({
	content: {
		type: String,
		default: '로딩 중',
	},
});
</script>

<style scoped></style>
