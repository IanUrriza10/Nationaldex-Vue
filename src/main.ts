import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";

import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/ApolloClient.ts";
import App from "./App.vue";
import router from "@/router/index.ts";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

// const app = createApp(App);
const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render: () => h(App),
});
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueSvgInlinePlugin);
app.mount("#app");
