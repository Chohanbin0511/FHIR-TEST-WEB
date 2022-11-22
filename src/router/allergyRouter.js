const routes = [
	// 알레르기 메인
	{
		path: '/allergy/allergyMain',
		name: 'AllergyMain',
		// meta: { anonymous: true },
		component: () => import('@/views/allergy/AllergyMainView.vue'),
		// beforeEnter: to => {
		// 	return isTokenExpire(true, to);
		// },
	},
];

export default routes;
