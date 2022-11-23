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
});

export default router;
