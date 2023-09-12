<script setup lang="ts">
import CardContainer from "@/components/MainPage/CardComponent.vue";
</script>
<template>
	<div class="card_container">
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
		<CardContainer />
	</div>
</template>
<style scoped lang="scss">
.card_container {
	margin-top: 2rem;
	padding: 2rem;
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
