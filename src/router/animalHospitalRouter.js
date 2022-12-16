const routes = [
	// 동물병원 메인
	{
		path: '/animalHospital/animalHospitalMain',
		name: 'AnimalHospitalMain',
		component: () =>
			import('@/views/animalHospital/AnimalHospitalMainView.vue'),
	},
	// 동물병원 상세화면
	{
		path: '/animalHospital/animalHospitalDetail',
		name: 'AnimalHospitalDetail',
		component: () =>
			import('@/views/animalHospital/AnimalHospitalDetailView.vue'),
		props: true,
	},
];

export default routes;
