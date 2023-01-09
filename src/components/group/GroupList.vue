<template>
	<v-container class="pt-0 pb-0">
		<template v-if="groupList.total > 0 && userInfo.isLogined">
			<v-card-title> Group Info</v-card-title>
			<v-banner
				color="orange-darken-1"
				icon="mdi-account-multiple"
				lines="one"
				class="rounded-lg"
			>
				<template v-slot:prepend>
					<v-avatar> </v-avatar>
				</template>
				<v-banner-text class="d-flex fill-height align-center">
					그룹명 : {{ groupList.name }}
				</v-banner-text>
			</v-banner>
		</template>
		<template v-if="groupList.total > 0 && userInfo.isLogined">
			<v-slide-group
				v-model="groupModel"
				selected-class="bg-indigo-lighten-5"
				show-arrows
			>
				<v-slide-group-item v-for="(item, idx) in myPetList" :key="item">
					<v-chip
						class="ma-2"
						:color="groupModel === idx ? 'white' : 'indigo-lighten-2'"
						:style="
							groupModel === idx
								? 'background-color: blue'
								: 'background-color: white'
						"
						variant="outlined"
						@click="toggle(idx)"
						:disabled="groupModel === idx"
					>
						<v-icon icon="mdi-dog-side"></v-icon>
						<div class="d-flex fill-height align-center justify-center">
							<v-scale-transition>
								{{ item.name }}
							</v-scale-transition>
						</div>
					</v-chip>
				</v-slide-group-item>
				<v-slide-group-item v-if="isPetInsertAct">
					<PetInsert @update:groupList="refreshGroupList"></PetInsert>
				</v-slide-group-item>
			</v-slide-group>
		</template>
	</v-container>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth';
import PetInsert from '@/components/pet/PetInsert.vue';

const groupList = ref(useAuthStore().groupList);
const userInfo = useAuthStore().userInfo;

const emit = defineEmits(['update:groupList', 'update:groupModel']);

const props = defineProps({
	myPetList: { type: Array, default: null },
	isPetInsertAct: {
		type: Boolean,
		default: false,
	},
	groupModel: { type: Number },
});

const { myPetList, isPetInsertAct, groupModel } = toRefs(props);

const refreshGroupList = () => {
	emit('update:groupList');
};

const toggle = idx => {
	emit('update:groupModel', idx);
};
</script>

<style lang="scss" scoped></style>
