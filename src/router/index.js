import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
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
	],
});

export default router;
