<script setup lang="ts">
const props = defineProps({
	type: {
		type: String,
		default: "Normal",
	},
});
</script>
<template>
	<div
		class="type"
		:class="`type-${props.type}`"
	>
		{{ props.type ?? "Normal" }}
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
	&::first-letter {
		font-size: 2rem;
	}
}
</style>
