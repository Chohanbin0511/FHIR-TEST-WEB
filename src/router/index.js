import { createRouter, createWebHistory } from 'vue-router';
import allergyRouter from '@/router/allergyRouter.js';
import encounterRouter from '@/router/encounterRouter.js';
import immunizationRouter from '@/router/immunizationRouter.js';
import animalHospitalRouter from '@/router/animalHospitalRouter.js';

const otherRoutes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/MainView.vue'),
	},
	{
		path: '/sdkSample/main',
		name: 'sdkSampleMain',
		component: () => import('@/views/sdkSample/SampleListView.vue'),
	},
	{
		path: '/sdkSample/oauth',
		name: 'oauth',
		component: () => import('@/views/sdkSample/OauthView.vue'),
	},
	{
		path: '/sdkSample/fhir',
		name: 'fhir',
		component: () => import('@/views/sdkSample/FhirView.vue'),
	},
	{
		path: '/sdkSample/openApi',
		name: 'openApi',
		component: () => import('@/views/sdkSample/OpenApiView.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		// meta: { anonymous: true },
		component: () => import('@/views/user/LoginView.vue'),
	},
];

let allRoutes = [];
allRoutes = allRoutes.concat(
	otherRoutes,
	allergyRouter,
	encounterRouter,
	immunizationRouter,
	animalHospitalRouter,
	// loginRouter,
	// serviceManageRouter,
	// dataManageRouter,
);

const routes = allRoutes;

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		// 라우팅을 이용해서 이동할 경우 또는 새로운 레이어(모달)를 표시할 경우,
		// 스크롤 위치를 기억하여, 해당 위치를 표시하도록 한다.
		if (savedPosition) {
			// 뒤로가기/앞으로가기 버튼으로 이동할 때만 사용할 수 있다.
			return savedPosition;
		} else {
			// reoute의 beforeEnter에서scrollY 지정하여, 해당 위치를 표시하도록 한다.
			const scrollY = from.meta.scrollY;
			return { top: scrollY ? scrollY : 0 };
		}
	},
});

export default router;
