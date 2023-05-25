<template>
	<v-layout id="main-layout">
		<v-app-bar
			color="indigo-lighten-2"
			density="compact"
			style="position: fixed; top: 0; width: 100%"
			class="bg-indigo-lighten-1"
		>
			<template v-slot:prepend>
				<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			</template>
			<v-app-bar-title>RedWood Platform Test</v-app-bar-title>

			<v-btn rounded="lg" color="white" size="large" @click="userLoginCheck">
				{{ userInfo.isLogined ? '로그아웃 ' : '로그인' }}
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			style="position: fixed; background-color: white"
		>
			<v-list density="compact">
				<v-card width="400" class="mt-4 mb-4">
					<template v-slot:title> Profile </template>

					<v-card-text
						class="pt-1 pb-1"
						:class="!userInfo.isLogined ? 'mb-2' : ''"
					>
						<!-- <v-icon> mdi-account-outline </v-icon> -->
						아이디 :
						{{ userInfo.userId ? userInfo.userId : '비회원' }}
					</v-card-text>

					<!-- <v-card-text class="pt-0 pb-0"> -->
					<v-card-text v-show="userInfo.isLogined" class="pt-1 pb-1">
						<!-- <v-icon> mdi-account-outline </v-icon> -->
						성별 :
						{{ userInfo.gender }}
					</v-card-text>
					<v-card-text v-show="userInfo.isLogined" class="pt-1 pb-1">
						<!-- <v-icon> mdi-account-outline </v-icon> -->
						번호 :
						{{ userInfo.mobilePhone }}
					</v-card-text>
					<v-card-text v-show="userInfo.isLogined" class="pt-1 pb-1">
						<!-- <v-icon> mdi-account-outline </v-icon> -->
						이름 :
						{{ userInfo.userName }}
					</v-card-text>
					<v-card-text v-show="userInfo.isLogined" class="pt-1 pb-1">
						<!-- <v-icon> mdi-account-outline </v-icon> -->
						생년월일 :
						{{ userInfo.birthday }}
					</v-card-text>
					<v-card-text v-show="userInfo.isLogined" class="pt-1 pb-1 mb-2">
						<!-- <v-icon> mdi-account-outline </v-icon> -->
						이메일 :
						{{ userInfo.email }}
					</v-card-text>
				</v-card>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:value="item.value"
					active-color="primary"
					@click="routeUrlChange(item.url)"
				>
					<template v-slot:prepend>
						<v-icon :icon="item.icon"></v-icon>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</template>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<slot name="mainPanel" />
		</v-main>
	</v-layout>
	<!-- </v-card> -->
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// const emit = defineEmits(['update:innerHeight']);

// const windowSize = ref(window.innerWidth);

// onMounted(() => {
// 	console.log('windowSize', windowSize.value);
// });

// const { width, height } = useWindowSize();

// watch(
// 	() => [width, height],
// 	() => {
// 		console.log('caca');
// 		emit('update:innerHeight');
// 	},
// 	{ deep: true },
// );

const router = useRouter();
/**
 * 유저 정보
 */
const userInfo = useAuthStore().userInfo;
// const layoutHeight = ref(0);
// screen resize
// const onResize = () => {
// 	console.log('onResize');
// 	emit('update:innerHeight');
// };

// 메뉴클릭시 이동
const routeUrlChange = url => {
	router.push(url);
};

const drawer = ref(false);
const group = ref(null);
watch(
	() => group.value,
	() => {
		drawer.value = false;
	},
	{ deep: true },
);

// 로그인 여부에 따라 로그인, 로그아웃 처리

const store = useAuthStore();
const { CLEAR_SESSION, CLEAR_OAUTH, CLEAR_GROUPLIST } = store;
const userLoginCheck = () => {
	if (userInfo.isLogined) {
		CLEAR_SESSION();
		CLEAR_OAUTH();
		CLEAR_GROUPLIST();
		logout();
	} else {
		router.push('/login');
	}
};
// 로그아웃 url 이동
const logout = () => {
	if (router.currentRoute.value.path === '/login') {
		router.replace('/login');
		router.go();
	} else {
		router.push('/login');
	}
};

const items = ref([
	{
		icon: 'mdi-account-details',
		title: 'Sample',
		value: 'Sample',
		url: '/sdkSample/main',
	},

	/**
	 * TODO: Main 기획 정해지면 현재 Main은 MyGroupInfo로 변경
	 */
	{
		icon: 'mdi-bulletin-board',
		title: 'Main',
		value: 'main',
		url: '/',
	},
	/**
	 * TODO: 진료기록 Part Main =>
	 */
	{
		icon: 'mdi-clipboard-text-outline',
		title: 'Encounter',
		value: 'encounter',
		url: '/encounter/encounterMain',
	},
	/**
	 * TODO: 알레르기 Part Main => 모든 Patient 알레르기 => 품종 별 통계를 내서 보여주는 식(사용자가 작성한 알레르기 바탕)
	 */
	// {
	// 	icon: 'mdi-block-helper',
	// 	title: 'Allergy',
	// 	value: 'allergy',
	// 	url: '/allergy/allergyMain',
	// },
	/**
	 * TODO: 예방접종 Part Main => 모든 Patient 예방접종 => 품종 별 통계를 내서 보여주는 식(사용자가 작성한 예방접종 바탕) , 예방접종에 대한 정보 제공
	 */
	// {
	// 	icon: 'mdi-pill',
	// 	title: 'Immunization',
	// 	value: 'immunization',
	// 	url: '/immunization/immunizationMain',
	// },
	// {
	// 	icon: 'mdi-hospital-building',
	// 	title: 'AnimalHospital',
	// 	value: 'animalHospital',
	// 	url: '/animalHospital/animalHospitalMain',
	// },
	// {
	// 	icon: 'mdi-update',
	// 	title: 'UpdateInfo',
	// 	value: 'updateInfo',
	// 	url: '/updateNote',
	// },
]);
</script>

<style scoped>
.v-navigation-drawer__scrim {
	height: 100%;
}
</style>
