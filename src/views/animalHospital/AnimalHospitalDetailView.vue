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
				<!-- <v-card-title class="mt-2" style="font-weight: bold">{{
					hospitalDetailInfo?.businessNm
				}}</v-card-title> -->
				<div id="map" style="width: 100%; height: 400px"></div
			></v-container>
			<v-container>
				<v-card class="pa-5">
					<v-card-title style="font-weight: bold">
						{{ hospitalDetailInfo?.businessNm }}
					</v-card-title>
					<v-divider class="mx-4 mb-1"></v-divider>
					<v-card-subtitle class="ml-2 pt-4 pb-0"> 주소 </v-card-subtitle>
					<v-card-text class="pb-0">
						<v-icon class="mr-2"> mdi-map-marker-outline</v-icon> 도로명 주소 :
						{{ hospitalDetailInfo?.roadNameFullAddress }}
						<!-- <v-divider class="mx-4 mb-1"></v-divider> -->
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
				</v-card>
				<!-- <v-banner
					color="yellow"
					icon="mdi-information-outline"
					lines="2"
					class="rounded-lg"
				>
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>
					<v-banner-text class="d-flex fill-height align-center">
						동물병원(부천시)의 상세정보를 조회할 수 있다.


					</v-banner-text>
				</v-banner> -->
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import { getAnimalHospitalDetail } from '@/api/animalHospitalApi';

const route = useRoute();
const hospitalId = ref(route.query.hospitalId);

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
		}
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
</script>

<style lang="scss" scoped></style>
