<script setup lang="ts">
import EvolutionCard from "./EvolutionCard.vue";
import { EvoPokemon, EvoRequirements } from "@/utils/types/pokemonDesc.ts";

interface PropsI {
	evo: Array<{
		base: EvoPokemon;
		requirements: EvoRequirements;
		evolution: EvoPokemon;
	}>;
}

withDefaults(defineProps<PropsI>(), { evo: (): any[] => [] });
</script>
<template>
	<div
		class="container"
		v-if="evo != null"
	>
		<EvolutionCard
			v-for="(evolution, index) in evo"
			:evolution="evolution"
			:key="index"
		/>
		<div
			class="none"
			v-if="evo.length == 0"
		>
			No Evolution Path
		</div>
	</div>
</template>
<style scoped lang="scss">
.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 4rem;
	padding: 1rem;
}
.none {
	font-size: 2.5rem;
}
</style>
