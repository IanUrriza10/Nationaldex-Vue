<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, watchEffect, onBeforeMount } from "vue";
import PokemonLayout from "@/layouts/PokemonLayout.vue";
import Navbar from "@/components/common/NavbarComponent.vue";
import { usePokemonDesc } from "@/composables/usePokemonDesc.ts";
import { stringToPosInt } from "@/utils/index.ts";
import TextsContainer from "@/components/PokemonPage/TextsContainer.vue";
import PokemonNav from "@/components/PokemonPage/PokemonNav.vue";
import PokemonMeta from "@/components/PokemonPage/PokemonMeta.vue";
import StatContainer from "@/components/PokemonPage/Stats/StatContainer.vue";

const route = useRoute();
const id = computed(() => stringToPosInt(route.params.id as string));
const { nav, meta, stat, flavorText, initialLoad, queryFlavortext, queryStat } =
	usePokemonDesc(id);
const isActive = (text: string) => {
	const selected = route.query?.view ?? "description";
	return selected === text ? "option--active" : "";
};

onBeforeMount(() => {
	initialLoad();
});

watchEffect(() => {
	switch (route.query?.view ?? "") {
		case "stats":
			console.log("stats");
			queryStat();
			break;
		case "moves":
			console.log("moves");
			break;
		case "evolution":
			console.log("evolution");
			break;
		case "others":
			console.log("others");
			break;
		default:
			console.log("description");
			queryFlavortext();
	}
});
</script>
<template>
	<PokemonLayout>
		<Navbar />
		<div class="content">
			<PokemonNav
				:next="nav?.next"
				:prev="nav?.prev"
			/>
			<PokemonMeta :meta="meta" />

			<!-- Content  -->
			<TextsContainer
				:texts="flavorText"
				v-if="isActive('description')"
			/>
			<StatContainer
				v-if="isActive('stats')"
				:stat="stat"
			/>
		</div>
	</PokemonLayout>
</template>
<style scoped lang="scss">
.content {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 4rem;
	padding: 1rem;
}
</style>
