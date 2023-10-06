<script setup lang="ts">
import { computed } from "vue";
import { dashToSpace } from "../../utils/index.ts";
const props = defineProps({
	game: {
		type: String,
		default: "Red",
	},
});
const blackTextGames = [
	"platinum",
	"soulsilver",
	"white",
	"white-2",
	"lets-go-pikachu",
	"lets-go-eevee",
	"the-isle-of-armor",
];

const getClass = computed(() => {
	const bgColor = `game-${props.game}`;
	const isBlackText = blackTextGames.includes(props.game);
	const textColor = isBlackText ? `text-black` : ``;
	return `${bgColor} ${textColor}`;
});
</script>
<template>
	<div
		class="game"
		:class="getClass"
	>
		{{ dashToSpace(props.game) }}
	</div>
</template>
<style scoped lang="scss">
.game {
	font-size: 1rem;
	font-weight: $font-semibold;
	cursor: default;
	text-transform: uppercase;
	min-width: 7.5rem;
	padding: 0 0.25rem 0 0.25rem;
	border-radius: 7px;
	&::first-letter {
		font-size: 1.2rem;
	}
}
.text-black {
	color: $background;
}
</style>
