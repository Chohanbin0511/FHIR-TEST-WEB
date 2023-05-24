<template>
	<Teleport to="body">
		<Transition name="modal">
			<div class="modal-mask">
				<div class="modal-container">
					<div class="modal-header">
						{{ header }}
					</div>

					<div class="modal-body">
						{{ content }}
					</div>

					<div class="modal-footer">
						<button class="modal-default-button" @click="$emit('clickBtn')">
							{{ btnText }}
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
defineProps({
	header: { type: String, required: true },
	content: { type: String, required: true },
	btnText: { type: String, required: true },
});

defineEmits(['clickBtn']);
</script>

<style scoped></style>
