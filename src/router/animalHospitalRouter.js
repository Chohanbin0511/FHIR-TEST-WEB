const routes = [
	// 동물병원 메인
	{
		path: '/animalHospital/animalHospitalMain',
		name: 'AnimalHospitalMain',
		component: () =>
			import('@/views/animalHospital/AnimalHospitalMainView.vue'),
	},
];

export default routes;
