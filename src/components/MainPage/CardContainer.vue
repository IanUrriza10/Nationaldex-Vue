<script setup lang="ts">
import CardComponent from "@/components/MainPage/CardComponent.vue";
import { PropType } from "vue";
import { PokeCard } from "@/utils/types/mainPage.ts";

defineProps({
	pokemonList: {
		type: Array as PropType<PokeCard[]>,
		default: () => [] as PokeCard[],
	},
});
</script>
<template>
	<div class="card_container">
		<CardComponent
			v-for="pokemon in pokemonList"
			:key="pokemon.id"
			:item="pokemon"
		/>
	</div>
</template>
<style scoped lang="scss">
.card_container {
	margin-top: 2rem;
	display: grid;
	row-gap: 2rem;
	grid-template-columns: repeat(
		auto-fit,
		minmax(min(100%/1, max(30rem, 100%/4)), 1fr)
	);
	& > * {
		justify-self: center;
	}
}
</style>
