const routes = [
	// 진료기록 메인
	{
		path: '/encounter/encounterMain',
		name: 'EncounterMain',
		component: () => import('@/views/encounter/EncounterMainView.vue'),
	},
];

export default routes;
