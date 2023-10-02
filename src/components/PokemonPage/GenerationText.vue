<script setup lang="ts">
import { PropType, computed } from "vue";
import GameComponent from "../common/GameComponent.vue";
import { GenerationFlavorText } from "@/utils/types/pokemonDesc.ts";
import { FlavorText } from "../../utils/types/pokemonDesc.ts";
const props = defineProps({
	textArr: Array as unknown as PropType<GenerationFlavorText[]>,
});

const parseList = (generations: GenerationFlavorText[]) => {
	let tempList = [] as FlavorText[];
	generations.forEach(gen => {
		if (gen.flavorTexts?.[0].flavorText != undefined) {
			tempList = tempList.concat(gen.flavorTexts);
		}
	});
	return tempList;
};

const flavorList = computed(() => {
	return parseList(props.textArr ?? []);
});
const genName = computed(() => {
	return props.textArr?.[0].generation_name ?? "";
});
</script>
<template>
	<div
		class="card"
		v-if="flavorList.length > 0"
	>
		<div class="card__title">
			{{ genName }}
		</div>
		<div class="card__body">
			<div
				class="subsection"
				v-for="(flavorText, index) in flavorList"
				:key="index"
			>
				<div class="subsection__game">
					<GameComponent :game="flavorText.name" />
				</div>
				<div class="subsection__text">
					{{ flavorText.flavorText }}
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.card {
	&__title {
		width: 14rem;
		background-color: $subBackground;
		padding: 1rem 1rem 0rem 1rem;
		font-weight: $font-bold;
		font-size: 1.4rem;
	}
	&__body {
		background-color: $subBackground;
		padding: 1rem;

		& .subsection {
			width: 100%;
			gap: 2rem;
			padding: 0.5rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			&__game {
				min-width: 11rem;
			}
			&__text {
				text-align: justify;
			}
		}
	}
}
</style>
