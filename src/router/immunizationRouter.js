const routes = [
	// 예방접종 메인
	{
		path: '/immunization/ImmunizationMain',
		name: 'ImmunizationMain',
		component: () => import('@/views/immunization/ImmunizationMainView.vue'),
	},
];

export default routes;
