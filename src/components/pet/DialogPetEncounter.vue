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

				<GroupList
					class="mt-2"
					:my-pet-list="myPetList"
					:is-pet-insert-act="false"
					:group-model="model"
					@update:groupModel="updateGroupModel"
				>
				</GroupList>
				<!-- 선택한 병원-->
				<v-container class="pb-0">
					<v-card-title> Selected Hospital </v-card-title>
					<v-card-text> 병원명 : {{ hospitalName }} </v-card-text>
					<v-divider></v-divider>
				</v-container>
				<!-- 기간 선택-->
				<v-container class="pb-0">
					<v-card-title> Select Date </v-card-title>
					<!-- <input type="date" /> -->

					<div class="ma-3">
						<label for="start">Start date : </label>
						<input
							class="mr-3"
							type="date"
							id="start"
							name="start"
							value="2018-07-22"
						/>
						<input type="time" />
						<br />
						<label for="End">End date : </label>
						<input
							class="mr-3"
							id="End"
							name="End"
							type="date"
							value="2018-07-22"
						/>
						<!-- min="2018-01-01"
							max="2018-12-31" -->
						<input type="time" />
					</div>
					<v-divider></v-divider>
				</v-container>
				<!-- 진료 내용 입력-->
				<v-container class="pb-0">
					<v-card-title> Input Encounter Content </v-card-title>
					<v-textarea
						class="pt-2"
						clearable
						clear-icon="mdi-close-circle"
						label="진료 내용"
						:rules="rules"
					></v-textarea>
				</v-container>
				<!-- <v-list lines="two" subheader>
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
				</v-list> -->
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script setup>
import { ref, toRefs, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getGroupList, getBundle } from '@/api/fhirApi';
import GroupList from '@/components/group/GroupList.vue';
const props = defineProps({
	isPopShow: { type: Boolean, default: false },
	hospitalName: { type: String },
});

const emit = defineEmits(['update:closePopUp']);
const { isPopShow, hospitalName } = toRefs(props);
const isShow = computed(() => {
	return isPopShow.value;
});

const closePopUp = () => {
	emit('update:closePopUp');
};
// const notifications = ref(false);
// const sound = ref(true);
// const widgets = ref(false);

// TODO: 진료날짜 (기간), pet patientId , 해당 서비스 제공 병원, OrganizationId
const model = ref(null);
const updateGroupModel = idx => {
	model.value = idx;
};

// grouplist
const store = useAuthStore();
// const groupList = ref(useAuthStore().groupList);
const userInfo = useAuthStore().userInfo;
const groupInfo = ref(null);
const { SET_GROUPLIST, CLEAR_GROUPLIST } = store;

const fetchGroupList = async () => {
	const {
		data: { total },
		data: { entry },
	} = await getGroupList(userInfo.patientId);
	if (total > 0) {
		groupInfo.value = entry[0];
		const {
			resource: { quantity },
			resource: { name },
			resource: { member },
		} = entry[0];
		SET_GROUPLIST(total, name, quantity, member);
		if (quantity > 0) {
			fetchBundlePetList(member);
		} else {
			myPetList.value = [];
			model.value = null;
		}
	}
	if (total === 0) {
		CLEAR_GROUPLIST();
	}
};

/**
 * 펫 bundle 조회 요청
 */
const myPetList = ref([]);
const fetchBundlePetList = async member => {
	let requestList = [];
	member.forEach((el, idx) => {
		requestList[idx] = {
			request: {
				method: 'GET',
				url: el.entity.reference,
			},
		};
	});
	const resource = {
		resourceType: 'Bundle',
		type: 'batch',
		entry: requestList,
	};
	const {
		data: { entry },
	} = await getBundle(resource);
	myPetList.value = [];
	model.value = 0;

	entry.forEach((el, idx) => {
		let extensionArr = el.resource.extension;
		let extension;
		if (extensionArr) {
			extension = extensionArr[0].extension;
		}
		myPetList.value[idx] = {
			active: el.resource.active,
			birthDate: el.resource.birthDate,
			id: el.resource.id,
			animalNum: el.resource.identifier[0].value
				? el.resource.identifier[0].value
				: null,
			name: el.resource.name[0].text,
			speices: extension
				? extension[extension.findIndex(i => i.url === 'species')]
						.valueCodeableConcept.coding[0].display
				: null,
			breed: extension
				? extension[extension.findIndex(i => i.url === 'breed')]
						.valueCodeableConcept.coding[0].display
				: null,
			genderStatus: extension
				? extension[extension.findIndex(i => i.url === 'genderStatus')]
						.valueCodeableConcept.coding[0].display
				: null,
		};
	});
};

const rules = ref([v => v.length <= 25 || 'Max 25 characters']);

watch(
	() => isShow.value,
	() => {
		if (isShow.value) fetchGroupList();
	},
	{ deep: true },
);
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
	transition: transform 0.2s ease-in-out;
}
</style>
