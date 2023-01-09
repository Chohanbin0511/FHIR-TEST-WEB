<template>
	<div id="map" style="width: 100%; height: 700px"></div>
	<v-container v-if="isSelectedItem">
		<!-- class="rounded-xl" -->
		<v-card
			style="
				position: absolute;
				bottom: 15%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 300px;
			"
			rounded="xl"
		>
			<v-toolbar :color="'teal-accent-4'">
				<v-toolbar-title> {{ selectedItem.businessNm }} </v-toolbar-title>
				<template v-slot:append>
					<v-btn icon="mdi-close" @click="closeIsSelectedItem"></v-btn>
				</template>
			</v-toolbar>

			<v-card-text class="pb-0">
				<v-icon> mdi-map-marker-outline</v-icon>
				{{ selectedItem.roadNameFullAddress }}
			</v-card-text>
			<v-card-text class="pb-0">
				<v-icon> mdi-phone-outline</v-icon>
				{{ selectedItem.tel ? selectedItem.tel : '-' }}
			</v-card-text>
			<v-card-actions>
				<v-btn
					variant="text"
					color="teal-accent-4"
					@click="clickHospitalDetail"
				>
					상세보기
				</v-btn></v-card-actions
			>
		</v-card>
	</v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAnimalHospitalList } from '@/api/animalHospitalApi';

const router = useRouter();

const itemList = ref([]);
const fetchAnimalHospitalList = async () => {
	try {
		const { data } = await getAnimalHospitalList();
		itemList.value = data;
		initMap();
	} catch (error) {
		console.error(error);
	}
};

let map;

let markers = [];
let infoWindows = [];

const initMap = () => {
	map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(37.49309157, 126.7908841),
		zoom: 13,
	});
	map.setCursor('pointer');

	path1();
};

const path1 = () => {
	for (let key in itemList.value) {
		let position = new naver.maps.LatLng(
			itemList.value[key]['latitude'],
			itemList.value[key]['longitude'],
		);
		let marker = new naver.maps.Marker({
			map: map,
			position: position,
			title: key,
			icon: {
				url: '.',
				// url: './../src/assets/icons/hospital_building.png',
				// url: hospitalIcon.value,
				size: new naver.maps.Size(24, 37),
				anchor: new naver.maps.Point(12, 37),
				origin: new naver.maps.Point(
					itemList.value[key]['latitude'],
					itemList.value[key]['longitude'],
				),
			},
			zIndex: 100,
		});

		// var contentString = [
		// 	'<div style="padding: 8px;">',
		// 	'<v-container>',
		// 	'				<v-card class="rounded-xl">',
		// 	'					<div>',
		// 	'	          <v-card-title> ' +
		// 		itemList.value[key]['businessNm'] +
		// 		'						</v-card-title> <br />',
		// 	'						<v-card-text>' +
		// 		itemList.value[key]['roadNameFullAddress'] +
		// 		'					</v-card-text> <br />',
		// 	'						<div class="text-h6 mb-1">' + itemList.value[key]['tel']
		// 		? itemList.value[key]['tel']
		// 		: '-' + '</div>',
		// 	'					</div>',
		// 	'					<button @click="test" ref="click">click!</button>',
		// 	'				</v-card>',
		// 	'</v-container>',
		// 	'</div>',
		// ].join('');
		let infoWindow = new naver.maps.InfoWindow({
			// content: contentString,
			// maxWidth: 250,
			// backgroundColor: '#FFFFFF',
			// backgroundColor: 'transparent',
			// borderColor: '#000000',
			// borderWidth: 1,
			// anchorSize: new naver.maps.Size(20, -10),
			// anchorSkew: false,
			// anchorSkew: true,
			// anchorColor: '#FFFFFF',
			// pixelOffset: new naver.maps.Point(20, -20),
		});

		markers.push(marker);
		infoWindows.push(infoWindow);
	}

	for (let i = 0, ii = markers.length; i < ii; i++) {
		naver.maps.Event.addListener(
			markers[i],
			'click',
			getClickHandler(i + 1, itemList.value[i]),
		);
	}
	// naver.maps.Event.addListener(map, 'idle', function () {
	// 	updateMarkers(map, markers);
	// });
};

// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
const selectedSeq = ref(null);
const selectedItem = ref(null);
const isSelectedItem = ref(false);
const getClickHandler = (seq, item) => {
	return function () {
		console.log('seq', seq);
		console.log('item', item);
		selectedSeq.value = seq;
		selectedItem.value = item;
		isSelectedItem.value = true;
	};
};
const closeIsSelectedItem = () => {
	selectedSeq.value = null;
	selectedItem.value = null;
	isSelectedItem.value = false;
};

const doSomething = (latitude, longitude) => {
	console.log('현재 좌표', '(' + latitude + ',' + longitude + ')');
};
/**
 * 병원 클릭
 */
const clickHospitalDetail = () => {
	console.log('Clicked item!', selectedSeq.value);
	router.push({
		name: 'AnimalHospitalDetail',
		query: {
			hospitalId: selectedSeq.value,
		},
	});
};
onMounted(() => {
	fetchAnimalHospitalList();
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
