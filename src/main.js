import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router);
app.use(vuetify);
app.mount("#app");
