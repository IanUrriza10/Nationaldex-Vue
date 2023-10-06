<script setup lang="ts">
const props = defineProps({
	eggGroup: {
		type: String,
		default: "Normal",
	},
});
</script>
<template>
	<div
		class="type"
		:class="`egg-${props.eggGroup}`"
	>
		{{ props.eggGroup ?? "Normal" }}
	</div>
</template>
<style scoped lang="scss">
.type {
	font-size: 1.7rem;
	font-weight: $font-semibold;
	text-transform: uppercase;
	min-width: 7.5rem;
	padding: 0 0.25rem 0 0.25rem;
	border-radius: 7px;
	cursor: default;
	&::first-letter {
		font-size: 2rem;
	}
}
</style>
