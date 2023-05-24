<template>
	<Teleport to="body">
		<div :class="isShow ? 'popup-wrapper active' : 'popup-wrapper'">
			<div class="popup-header">
				<h2 class="popup-title">{{ header }}</h2>
				<button class="popup-close" @click="$emit('clickBtn')">닫기</button>
			</div>
			<div class="popup-content" v-html="content"></div>
		</div>
	</Teleport>
</template>

<script setup>
defineProps({
	isShow: { type: Boolean },
	header: { type: String },
	content: { type: String },
});
defineEmits(['clickBtn']);
</script>

<style scoped>
/* 팝업 전체 스타일 임시*/
.popup-wrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 0;
	background-color: #ffffff;
	overflow: hidden;
	transition: height 0.3s ease-in-out;
}

/* 팝업이 열렸을 때 높이 조정 */
.popup-wrapper.active {
	height: 100vh;
}

/* 팝업 헤더 스타일 */
.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border-bottom: 1px solid #cccccc;
}

/* 팝업 제목 스타일 */
.popup-title {
	margin: 0;
}
.popup-content {
	height: 100%;
}
/* 팝업 닫기 버튼 스타일 */
.popup-close {
	border: none;
	background-color: transparent;
	font-size: 16px;
	cursor: pointer;
}

/* 팝업 닫기 버튼에 호버 스타일 추가 */
.popup-close:hover {
	text-decoration: underline;
}

.popup-content {
	padding: 16px;
	height: calc(
		100% - 56px
	); /* 팝업 헤더 높이(56px)만큼 뺀 나머지 높이를 설정 */
	overflow-y: auto; /* 팝업 내용이 넘칠 경우 스크롤바 표시 */
}
</style>
