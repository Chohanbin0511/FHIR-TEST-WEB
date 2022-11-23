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
		console.log('data', data);
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
		console.log('position', position);
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
			'<v-container>',
			'			<v-card-item >',
			'					<div>',
			'	          <v-card-title> ' +
				itemList.value[key]['businessNm'] +
				'						</v-card-title>',
			'						<div class="text-overline mb-1">' +
				itemList.value[key]['roadNameFullAddress'] +
				'					</div>',
			'						<div class="text-h6 mb-1">' + itemList.value[key]['tel'] + '</div>',
			'						<div class="text-caption">',
			' 							Greyhound divisely hello coldly fonwderfully',
			'						</div>',
			'					</div>',
			'				</v-card-item>',
			'</v-container>',
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
			maxWidth: 140,
			backgroundColor: '#eee',
			borderColor: '#2db400',
			borderWidth: 5,
			anchorSize: new naver.maps.Size(30, 30),
			anchorSkew: true,
			anchorColor: '#eee',
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
		console.log('seq', seq);
		console.log('item', item);
		if (infoWindow.getMap()) {
			infoWindow.close();
		} else {
			infoWindow.open(map, marker);
		}
	};
};

onMounted(() => {
	fetchAnimalHospitalList();
});
</script>

<style lang="scss" scoped></style>
