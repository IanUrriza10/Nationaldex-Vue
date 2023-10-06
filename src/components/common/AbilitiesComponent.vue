<script setup lang="ts">
import { dashToSpace } from "@/utils/index.ts";
import { Ability } from "@/utils/types/pokemonDesc.ts";
type PropsT = {
	ability: Ability;
};
const props = defineProps<PropsT>();
</script>
<template>
	<div class="ability">
		<div class="ability__visible">
			<div class="ability__name">
				{{ dashToSpace(props.ability.name) ?? "Unknown" }}
			</div>
			<div
				class="ability__hidden"
				v-if="props.ability.isHidden == 'hidden'"
			>
				Hidden
			</div>
		</div>
		<div class="ability__effect">{{ props.ability.effect }}</div>
	</div>
</template>
<style scoped lang="scss">
.ability {
	position: relative;
	cursor: default;
	&__visible {
		&:hover + .ability__effect {
			display: block;
		}
	}
	&__name {
		font-size: 1.7rem;
		text-transform: capitalize;
		font-weight: 700;

		&::first-letter {
			font-size: 2rem;
		}
	}
	&__effect {
		display: none;
		position: absolute;
		width: 20rem;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 100%);
		background-color: $background;
		padding: 1rem;
		z-index: 40;
	}
}
</style>
