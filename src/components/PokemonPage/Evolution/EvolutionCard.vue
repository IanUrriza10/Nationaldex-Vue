<script setup lang="ts">
import { idToPokemonImgRoute, padDexNumber } from "@/utils/index.ts";
import { EvoPokemon, EvoRequirements } from "@/utils/types/pokemonDesc.ts";
import EvolutionCondition from "./EvolutionCondition.vue";
const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;

interface PropsI {
	evolution: {
		base: EvoPokemon;
		requirements: EvoRequirements;
		evolution: EvoPokemon;
	};
}
defineProps<PropsI>();
</script>
<template>
	<div class="evolution">
		<div class="evolution__base pokemon">
			<div class="pokemon__image">
				<img
					v-if="evolution.base?.id ?? 0"
					:src="`http://${imgServer}${idToPokemonImgRoute(
						evolution.base?.id ?? 132
					)}`"
					:alt="`${evolution.base?.name}__image`"
				/>
			</div>
			<div class="pokemon__number">
				#{{ padDexNumber(evolution.base.id) }}
			</div>
			<div class="pokemon__name">{{ evolution.base.name }}</div>
		</div>
		<div class="evolution__condition">
			<EvolutionCondition :props="evolution.requirements" />

			<div class="evolution__condition__arrow">
				<img
					v-svg-inline
					src="@/assets/arrow-right-bold-outline.svg"
				/>
			</div>
		</div>
		<div class="evolution__evolution pokemon">
			<div class="pokemon__image">
				<img
					v-if="evolution.evolution?.id ?? 0"
					:src="`http://${imgServer}${idToPokemonImgRoute(
						evolution.evolution?.id ?? 132
					)}`"
					:alt="`${evolution.evolution?.name}__image`"
				/>
			</div>
			<div class="pokemon__number">
				#{{ padDexNumber(evolution.evolution.id) }}
			</div>
			<div class="pokemon__name">{{ evolution.evolution.name }}</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.evolution {
	width: 40rem;
	height: 20rem;
	display: flex;
	gap: 1rem;
	justify-content: center;
	border: 0.5rem;
	border-color: red;
	border-style: solid;
	vertical-align: middle;
	align-items: center;

	&__condition {
		&__arrow {
			& * {
				width: 3rem;
				height: 3rem;
				fill: $dexAction;
				outline: none;
			}
		}
	}
}
.pokemon {
	&__image {
		width: 10rem;
		height: 10rem;
		& img {
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}
	&__number {
		font-size: 1.3rem;
	}
	&__name {
		text-transform: capitalize;
		font-size: 1.5rem;
	}
}
</style>
