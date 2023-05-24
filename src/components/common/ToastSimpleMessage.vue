<template>
	<Teleport to="body">
		<div class="toast">
			<span class="palogin024-text30">
				<span>
					{{ content }}
				</span>
			</span>
		</div>
	</Teleport>
</template>

<script setup>
// import { ref, watch } from 'vue'
defineProps({
	content: { type: String },
});

// watch(
//   () => isOpen.value,
//   () => {
//     if (isOpen.value) {
//       setTimeout(() => {
//         isOpen.value = false
//       }, 3000)
//     }
//   }
// )
</script>

<style scoped>
/**
 * TODO - 임시
 **/
.toast {
	position: absolute;
	width: 300px;
	left: 15px;
	top: 708px;
	padding: 18px;
	background: rgba(51, 51, 51, 0.8);
}
.palogin024-text30 {
	font-family: 'Noto Sans KR';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;

	color: #f7b40a;
}
</style>
