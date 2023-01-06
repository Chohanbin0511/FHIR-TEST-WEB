<template>
	<v-row justify="center">
		<v-dialog
			v-model="isShow"
			fullscreen
			:scrim="false"
			transition="dialog-bottom-transition"
		>
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="closePopUp">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>진료기록 등록</v-toolbar-title>
					<v-toolbar-items>
						<v-btn variant="text" @click="closePopUp"> 저장 </v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-list lines="one" subheader>
					<v-list-subheader>선택 그룹</v-list-subheader>
					<v-list-item
						title="Content filtering"
						subtitle="Set the content filtering level to restrict apps that can be downloaded"
					></v-list-item>
				</v-list>
				<v-list lines="one" subheader>
					<v-list-subheader>팻 선택</v-list-subheader>
					<v-list-item
						title="Content filtering"
						subtitle="Set the content filtering level to restrict apps that can be downloaded"
					></v-list-item>
				</v-list>
				<v-divider></v-divider>
				<v-list lines="two" subheader>
					<v-list-subheader>General</v-list-subheader>
					<v-list-item
						title="Notifications"
						subtitle="Notify me about updates to apps or games that I downloaded"
					>
						<template v-slot:prepend>
							<v-checkbox v-model="notifications"></v-checkbox>
						</template>
					</v-list-item>
					<v-list-item
						title="Sound"
						subtitle="Auto-update apps at any time. Data charges may apply"
					>
						<template v-slot:prepend>
							<v-checkbox v-model="sound"></v-checkbox>
						</template>
					</v-list-item>
					<v-list-item
						title="Auto-add widgets"
						subtitle="Automatically add home screen widgets"
					>
						<template v-slot:prepend>
							<v-checkbox v-model="widgets"></v-checkbox>
						</template>
					</v-list-item>
				</v-list>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';

const props = defineProps({
	isPopShow: { type: Boolean, default: false },
});

const emit = defineEmits(['update:closePopUp']);
const { isPopShow } = toRefs(props);
const isShow = computed(() => {
	return isPopShow.value;
});

const closePopUp = () => {
	emit('update:closePopUp');
};
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false);

// TODO: 진료날짜 (기간), pet patientId , 해당 서비스 제공 병원, OrganizationId
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
	transition: transform 0.2s ease-in-out;
}
</style>
