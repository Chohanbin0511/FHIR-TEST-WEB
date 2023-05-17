import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

import { MotionPlugin } from '@vueuse/motion';

import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import globalMotionDirectives from './plugins/global-motion-directives';
import dayjs from './plugins/dayjs';

loadFonts();

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(MotionPlugin, globalMotionDirectives);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(dayjs);
app.mount('#app');

console.log('MODE: ', import.meta.env.MODE);
console.log('BASE_URL: ', import.meta.env.BASE_URL);
console.log('PROD: ', import.meta.env.PROD);
console.log('DEV: ', import.meta.env.DEV);
console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL);
