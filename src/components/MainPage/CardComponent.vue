<script setup lang="ts">
import { PokeCard } from "@/utils/types/mainPage.ts";
import { idToPokemonImgRoute, padDexNumber } from "../../utils/index.ts";
import TypeComponent from "@/components/common/TypeComponent.vue";
import router from "@/router/index.ts";

const props = defineProps({
	item: {
		type: Object,
		default() {
			return {
				id: "",
				name: "",
				pokedexNumbers: [],
				types: [],
			} as unknown as PokeCard;
		},
	},
});
const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;
</script>
<template>
	<div
		class="card"
		@click="router.push(`/pokemon/${props.item.id}`)"
	>
		<div class="card__image">
			<img
				:src="`http://${imgServer}${idToPokemonImgRoute(
					props.item.id
				)}`"
				:alt="`${props.item.name}__image`"
			/>
		</div>
		<div class="card__name">{{ props.item.name }}</div>
		<div class="card__numbers">
			<div
				v-for="number in props.item.pokedexNumbers"
				:key="number"
				class="card__numbers__option"
			>
				#{{ padDexNumber(number) }}
			</div>
		</div>
		<div class="card__types">
			<TypeComponent
				v-for="type in props.item.types"
				:key="type"
				class="card__types__option"
				:type="type"
			/>
		</div>
	</div>
</template>
<style scoped lang="scss">
.card {
	width: 30rem;
	height: 30rem;
	background-color: $subBackground;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	cursor: pointer;
	&__image {
		width: 17.5rem;
		height: 17.5rem;
		& img {
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}
	&__name {
		text-transform: capitalize;
		font-size: 2rem;
	}
	&__numbers {
		display: flex;
		flex-direction: row;
		gap: 3rem;
		&__option {
			font-size: 2rem;
		}
	}
	&__types {
		display: flex;
		flex-direction: row;
		gap: 0.9rem;
	}
}
</style>
