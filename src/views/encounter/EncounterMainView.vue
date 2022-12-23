<template>
	<TheViewLayout>
		<template #mainPanel>
			<v-container>
				<v-card-title class="mt-2">Encounter Main</v-card-title>
				<v-banner
					color="blue-lighten-1"
					icon="mdi-information-outline"
					lines="one"
				>
					<template v-slot:prepend>
						<v-avatar></v-avatar>
					</template>

					<v-banner-text class="d-flex fill-height align-center">
						Pet의 진료기록을 기록/관리 가능합니다
					</v-banner-text>
				</v-banner>
			</v-container>
			<v-container>
				<v-btn
					prepend-icon="mdi-map-outline"
					variant="outlined"
					rounded="lg"
					block
					style="
						height: 65px;
						font-size: 16px;
						font-weight: 600;
						background-color: white;
					"
					color="#3ca1d2"
					@click="$router.push('/animalHospital/animalHospitalMain')"
				>
					지도로 병원 찾기</v-btn
				>
			</v-container>
			<v-container v-if="itemList.length > 0">
				<v-row>
					<v-col
						class="pb-0"
						v-for="item in itemList"
						:key="item"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-card
							class="mx-auto mb-1"
							max-width="400"
							variant="outlined"
							rounded="xl"
							style="background-color: ghostwhite"
							@click="clickHospitalDetail(item)"
						>
							<v-card-item>
								<v-card-title>{{ item.businessNm }}</v-card-title>

								<v-divider class="mx-4 mb-1"></v-divider>
								<v-card-subtitle>
									<span class="mr-1">{{ item.fullAddressOfLocation }}</span>
								</v-card-subtitle>
							</v-card-item>
							<v-card-text>
								전화번호 : {{ item.tel ? item.tel : '--' }}
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</TheViewLayout>
</template>

<script setup>
import TheViewLayout from '@/layouts/TheViewLayout.vue';
import { ref, onMounted } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { getPageAnimalHospitalList } from '@/api/animalHospitalApi';
import { handleScroll } from '@/composables/handleScroll';

const router = useRouter();

const loading = ref(true);
const totalSearchParams = ref({
	_sort: 'id',
});
const totalCount = ref(null);
const totalPage = ref(null);
const fetchTotalAnimalHospitalCount = async () => {
	try {
		const { data } = await getPageAnimalHospitalList(totalSearchParams.value);
		console.log('data', data);
		totalCount.value = data.length;
		totalPage.value = Math.ceil(data.length / searchParams.value._limit);
	} catch (error) {
		console.error(error);
	}
};

const searchParams = ref({
	_page: 1,
	_limit: 30,
	_sort: 'id',
});
const itemList = ref([]);
const nowPage = ref(0);
const nextPass = ref(false);
const fetchAnimalHospitalList = async () => {
	loading.value = true;
	try {
		nowPage.value++;
		searchParams.value._page = nowPage.value;
		const { data } = await getPageAnimalHospitalList(searchParams.value);
		nextPass.value = true;
		itemList.value = [...itemList.value, ...data];
		loading.value = false;
	} catch (error) {
		console.error(error);
	}
};

/**
 * 병원 클릭
 */
const clickHospitalDetail = item => {
	console.log('Clicked item!', item);
	router.push({
		name: 'AnimalHospitalDetail',
		query: {
			hospitalId: item.id,
		},
	});
};

/**
 * 스크롤처리
 */
const handleScrollAct = () => {
	let result = handleScroll();
	if (
		result &&
		totalPage.value > nowPage.value &&
		nextPass.value &&
		!loading.value
	) {
		console.log('***************next*****************');
		nextPass.value = false;
		fetchAnimalHospitalList();
	}
};

onMounted(() => {
	fetchAnimalHospitalList();
	fetchTotalAnimalHospitalCount();

	window.addEventListener('scroll', handleScrollAct);
});

onBeforeRouteLeave(() => {
	// 다른 곳에서 스크롤 못하게
	window.removeEventListener('scroll', handleScrollAct);
});
</script>

<style lang="scss" scoped></style>
