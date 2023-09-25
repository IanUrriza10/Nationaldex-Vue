import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import PokemonPage from "@/views/PokemonPage.vue";

const routes = [
	{
		path: "/",
		name: "Pokemon List",
		component: MainPage,
	},
	{
		path: "/pokemon",
		redirect: { name: "Pokemon List" },
	},
	{
		path: "/pokemon/:id",
		name: "Pokemon Page",
		component: PokemonPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
