import { createApp } from "vue";
import router from "@/router/index.ts";
import App from "./App.vue";

import VueSvgInlinePlugin from "vue-svg-inline-plugin";

const app = createApp(App);
app.use(router);

app.use(VueSvgInlinePlugin);

app.mount("#app");
