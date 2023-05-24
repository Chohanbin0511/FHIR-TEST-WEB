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
						<v-btn variant="text" @click="fetchCreateEncounter"> 저장 </v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<!-- 기간 선택-->
				<v-container class="pb-0">
					<v-card-title> Select Date </v-card-title>
					<div class="ma-3">
						<Datepicker v-model="date" range alt-position></Datepicker>
					</div>
					<v-divider></v-divider>
				</v-container>
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

				<!-- 진료 내용 입력-->
				<v-container class="pb-0">
					<v-card-title> Input Encounter Content </v-card-title>
					<v-textarea
						class="pt-2"
						clearable
						clear-icon="mdi-close-circle"
						label="진료 내용"
						v-model="encounterContent"
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
import { ref, toRefs, computed, watch, onMounted, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getGroupList, getBundle, createEncounter } from '@/api/fhirApi';
import GroupList from '@/components/group/GroupList.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const rootMethods = inject('rootMethods');

const props = defineProps({
	isPopShow: { type: Boolean, default: false },
	hospitalName: { type: String },
	organizationId: { type: String },
});

const emit = defineEmits(['update:closePopUp']);
const { isPopShow, hospitalName, organizationId } = toRefs(props);
const isShow = computed(() => {
	return isPopShow.value;
});

const closePopUp = () => {
	model.value = null;
	date.value = [dayjs().format(), dayjs().format()];
	encounterContent.value = null;
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
const dayjs = inject('dayjs');
const date = ref(null);
onMounted(() => {
	const startDate = dayjs().format();
	const endDate = dayjs().format();
	date.value = [startDate, endDate];
});

const rules = ref([v => v.length <= 50 || '최대 50자까지 입력 가능합니다']);
const encounterContent = ref(null);
const fetchCreateEncounter = async () => {
	if (
		!hospitalName.value ||
		!myPetList.value[model.value].id ||
		!organizationId.value
	) {
		rootMethods.isSimpleConfirm(true, '안내', '등록에 실패하였습니다', '확인');
		return;
	}

	if (!date.value || !date.value[0] || !date.value[1]) {
		rootMethods.isSimpleConfirm(true, '안내', '날짜를 선택하세요', '확인');
		return;
	}

	if (!encounterContent.value) {
		rootMethods.isSimpleConfirm(true, '안내', '내용을 입력하세요', '확인');
		return;
	}

	const resource = {
		resourceType: 'Encounter',
		identifier: [
			{
				system: 'https://redwoodplatformtest-chohbin.netlify.app',
				value: userInfo.patientId,
			},
		],
		status: 'finished',
		type: [
			{
				coding: [
					{
						system: 'https://www.hins.or.kr',
						code: 'H33',
						display: '동물병원',
					},
				],
				text: '동물병원',
			},
		],
		subject: {
			reference: 'Patient/' + myPetList.value[model.value].id,
		},
		period: {
			start: dayjs(date.value[0]).format(),
			end: dayjs(date.value[1]).format(),
		},
		reasonCode: [
			{
				text: encounterContent.value,
			},
		],
		serviceProvider: {
			reference: organizationId.value,
			display: hospitalName.value,
		},
	};
	try {
		const response = await createEncounter(resource);
		console.log('response', response);
		rootMethods.openToast('진료 기록이 등록되었습니다.');
		closePopUp();
	} catch (error) {
		console.error(error);
	}
};

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
