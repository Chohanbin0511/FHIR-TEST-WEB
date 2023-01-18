<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container class="pb-0">
				<v-sheet style="display: flex">
					<v-icon class="mt-5 ml-5" @click="$router.go(-1)"
						>mdi-arrow-left-thick</v-icon
					>
					<v-card-title class="mt-2 pl-2"> Hospital Detail </v-card-title>
				</v-sheet>
				<v-banner
					color="pink-darken-1"
					icon="mdi-account-box"
					lines="one"
					class="rounded-lg"
				>
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>
					<v-banner-text class="d-flex fill-height align-center">
						동물병원(부천시)의 상세정보를 조회할 수 있다.
					</v-banner-text>
				</v-banner>
			</v-container>
			<v-container>
				<div id="map" style="width: 100%; height: 400px"></div
			></v-container>
			<!-- S: 장소 Tab 영역 -->
			<v-container class="pt-0 pl-0 pr-0"> </v-container>
			<v-container>
				<v-card class="pa-5">
					<v-sheet style="display: flex">
						<v-card-title class="mr-auto" style="font-weight: bold">
							{{ hospitalDetailInfo?.businessNm }}
						</v-card-title>
						<v-btn
							class="mt-1"
							@click="insertEncounter"
							size="x-small"
							icon="mdi-clipboard-text-outline"
							color="teal-accent-4"
						>
						</v-btn>
					</v-sheet>
					<v-tabs fixed-tabs bg-color="white">
						<v-tab
							style="font-size: 16px; font-weight: bold"
							@click="changeDetailTab('home')"
						>
							홈
						</v-tab>
						<v-tab
							style="font-size: 16px; font-weight: bold"
							@click="changeDetailTab('review')"
						>
							진료 기록</v-tab
						>
					</v-tabs>
					<v-divider class="mx-4 mb-1"></v-divider>
					<template v-if="nowTab === 'home'">
						<v-card-subtitle class="ml-2 pt-4 pb-0"> 주소 </v-card-subtitle>
						<v-card-text class="pb-0">
							<v-icon class="mr-2"> mdi-map-marker-outline</v-icon> 도로명 주소
							:
							{{ hospitalDetailInfo?.roadNameFullAddress }}
						</v-card-text>
						<v-card-text>
							<v-icon class="mr-2"> mdi-map-marker-outline</v-icon> 지번 주소 :
							{{ hospitalDetailInfo?.fullAddressOfLocation }}
						</v-card-text>
						<v-divider></v-divider>
						<v-card-subtitle class="ml-2 pt-4 pb-0"> 전화번호 </v-card-subtitle>
						<v-card-text>
							<v-icon class="mr-2"> mdi-phone-outline</v-icon>
							{{ hospitalDetailInfo?.tel }}
						</v-card-text>
						<v-divider></v-divider>
						<v-card-subtitle class="ml-2 pt-4 pb-0"> 등록일 </v-card-subtitle>
						<v-card-text>
							<v-icon class="mr-2"> mdi-calendar-range</v-icon>
							{{ hospitalDetailInfo?.licensedDt }}
						</v-card-text>
						<v-divider></v-divider>
						<v-card-subtitle class="ml-2 pt-4 pb-0"> 영업 상태</v-card-subtitle>
						<v-card-text>
							<v-icon class="mr-2"> mdi-home-lock-open</v-icon>
							{{ hospitalDetailInfo?.statusName }}
						</v-card-text>
						<v-divider></v-divider>
						<v-card-subtitle class="ml-2 pt-4 pb-0"> 업종 명</v-card-subtitle>
						<v-card-text>
							<v-icon class="mr-2"> mdi-flag</v-icon>
							{{ hospitalDetailInfo?.serviceNm }}
						</v-card-text>
					</template>
					<template v-if="nowTab === 'review'">
						<v-card-subtitle class="ml-2 pt-4 pb-0">
							총 진료 건수
						</v-card-subtitle>
						<v-card-text>
							<!-- <v-icon class="mr-2"> mdi-calendar-range</v-icon> -->
							<!-- {{ hospitalDetailInfo?.licensedDt }} -->
							2 건
						</v-card-text>
					</template>
				</v-card>
			</v-container>
			<!-- <v-container> dfsfs </v-container> -->
			<DialogPetEncounter
				:is-pop-show="isPopShow"
				:hospital-name="hospitalDetailInfo?.businessNm"
				:organization-id="hospitalDetailInfo?.organizationId"
				@update:closePopUp="closePopUp"
			></DialogPetEncounter>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import { getAnimalHospitalDetail } from '@/api/animalHospitalApi';
import { getHospitalEncounterList } from '@/api/fhirApi';
import DialogPetEncounter from '@/components/pet/DialogPetEncounter.vue';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const hospitalId = ref(route.query.hospitalId);

const nowTab = ref('home');

const changeDetailTab = tab => {
	if (tab === 'review' && !userInfo.isLogined) {
		alert('로그인 후 사용 가능합니다');
		nowTab.value = 'home';
		return false;
	}
	nowTab.value = tab;
};
const hospitalDetailInfo = ref(null);
const itemList = ref(null);
const fetchAnimalHospitalDetail = async () => {
	try {
		const { status, data } = await getAnimalHospitalDetail(hospitalId.value);
		if (status === 200) {
			console.log('response', data);
			hospitalDetailInfo.value = data;
			itemList.value = data;
			initMap();
			if (userInfo.isLogined) fetchHospitalEncounterList(data.organizationId);
		}
	} catch (error) {
		console.error(error);
	}
};

const fetchHospitalEncounterList = async organizationId => {
	try {
		const {
			data: { entry },
			data: { total },
		} = await getHospitalEncounterList(organizationId);
		console.log('entry', entry);
		console.log('total', total);
	} catch (error) {
		console.error(error);
	}
};

let map;

let markers = [];

const initMap = () => {
	map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(
			itemList.value['latitude'],
			itemList.value['longitude'],
		),
		zoom: 16,
	});
	map.setCursor('pointer');
	path1();
};

const path1 = () => {
	let position = new naver.maps.LatLng(
		itemList.value['latitude'],
		itemList.value['longitude'],
	);
	let marker = new naver.maps.Marker({
		map: map,
		position: position,
		title: itemList.value.id,
		icon: {
			url: '.',
			size: new naver.maps.Size(24, 37),
			anchor: new naver.maps.Point(12, 37),
			origin: new naver.maps.Point(
				itemList.value['latitude'],
				itemList.value['longitude'],
			),
		},
		zIndex: 100,
	});

	markers.push(marker);
};

const doSomething = (latitude, longitude) => {
	console.log('현재 좌표', '(' + latitude + ',' + longitude + ')');
};
onMounted(() => {
	console.log('hospitalId', hospitalId.value);
	fetchAnimalHospitalDetail();
	if ('geolocation' in navigator) {
		/* 위치정보 사용 가능 */
		console.log('navigator 가능', navigator);
		navigator.geolocation.getCurrentPosition(position => {
			doSomething(position.coords.latitude, position.coords.longitude);
		});
	} else {
		/* 위치정보 사용 불가능 */
		console.log('navigator 불가능', navigator);
	}
});

const userInfo = useAuthStore().userInfo;
const groupList = useAuthStore().groupList;
const isPopShow = ref(false);
const insertEncounter = () => {
	if (!userInfo.isLogined) {
		alert('로그인 후 사용 가능합니다');
		return false;
	}

	if (groupList.total === 0 || groupList.memberTotal === 0) {
		alert('팻 등록 후 사용 가능합니다');
	}

	isPopShow.value = true;
	console.log('진료기록 등록!', isPopShow.value);
};
const closePopUp = () => {
	isPopShow.value = false;
};
</script>

<style lang="scss" scoped></style>
