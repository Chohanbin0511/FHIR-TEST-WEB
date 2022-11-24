<template>
	<!-- <v-container> -->
	<div id="map" style="width: 100%; height: 400px"></div>
	<!-- </v-container> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAnimalHospitalList } from '@/api/animalHospitalApi';

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
		// Default 춘천 => 변경 가능 ex=> 내위치
		center: new naver.maps.LatLng(37.49309157, 126.7908841),
		zoom: 13,
	});
	map.setCursor('pointer');

	path1();
};

// const hospitalIcon = ref(null);

// onMounted(async () => {
// 	hospitalIcon.value[0] = (
// 		await import(/* @vite-ignore */ './../src/assets/icons/test_icon.png')
// 	).default;
// });

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
		// 37.48345439	126.8103845

		var contentString = [
			'<div style="padding: 8px;">',
			'<v-container>',
			'				<v-card class="rounded-xl">',
			'					<div>',
			'	          <v-card-title> ' +
				itemList.value[key]['businessNm'] +
				'						</v-card-title> <br />',
			'						<v-card-text>' +
				itemList.value[key]['roadNameFullAddress'] +
				'					</v-card-text> <br />',
			'						<div class="text-h6 mb-1">' + itemList.value[key]['tel']
				? itemList.value[key]['tel']
				: '-' + '</div>',
			// '						<div class="text-caption">',
			// ' 							Greyhound divisely hello coldly fonwderfully',
			// '						</div>',
			'					</div>',
			'				</v-card>',
			'</v-container>',
			'</div>',
			// '<div class="iw_inner ">',
			// '   <h3>서울특별시청</h3>',
			// '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
			// // '       <img src="' +
			// // HOME_PATH +
			// // '/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
			// '       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />',
			// '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
			// '   </p>',
			// '</div>',
		].join('');
		let infoWindow = new naver.maps.InfoWindow({
			content: contentString,
			maxWidth: 250,
			backgroundColor: '#FFFFFF',
			// backgroundColor: 'transparent',
			borderColor: '#000000',
			borderWidth: 1,
			anchorSize: new naver.maps.Size(20, -10),
			// anchorSkew: false,
			anchorSkew: true,
			anchorColor: '#FFFFFF',
			pixelOffset: new naver.maps.Point(20, -20),
		});

		markers.push(marker);
		infoWindows.push(infoWindow);
	}

	for (let i = 0, ii = markers.length; i < ii; i++) {
		naver.maps.Event.addListener(
			markers[i],
			'click',
			getClickHandler(i, itemList.value[i]),
		);
	}

	naver.maps.Event.addListener(map, 'idle', function () {
		updateMarkers(map, markers);
	});
};

const updateMarkers = (map, markers) => {
	let mapBounds = map.getBounds();
	let marker, position;

	for (let i = 0; i < markers.length; i++) {
		marker = markers[i];
		position = marker.getPosition();

		if (mapBounds.hasLatLng(position)) {
			showMarker(map, marker);
		} else {
			hideMarker(map, marker);
		}
	}
};

const showMarker = (map, marker) => {
	if (marker.setMap()) return;
	marker.setMap(map);
};

const hideMarker = (map, marker) => {
	if (!marker.setMap()) return;
	marker.setMap(null);
};

// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
const getClickHandler = (seq, item) => {
	return function () {
		let marker = markers[seq],
			infoWindow = infoWindows[seq];
		console.log('item', item);
		if (infoWindow.getMap()) {
			infoWindow.close();
		} else {
			infoWindow.open(map, marker);
		}
	};
};
const doSomething = (latitude, longitude) => {
	console.log('현재 좌표', '(' + latitude + ',' + longitude + ')');
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
