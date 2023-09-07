import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import SubPage from "@/views/SubPage.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: MainPage,
	},
	{
		path: "/about",
		name: "About",
		component: SubPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
