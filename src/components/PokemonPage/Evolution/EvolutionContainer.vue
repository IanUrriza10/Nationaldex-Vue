<script setup lang="ts">
import EvolutionCard from "./EvolutionCard.vue";
console.log("here");
</script>
<template>
	<div class="container">
		<EvolutionCard />
		<EvolutionCard />
		<EvolutionCard />
		<EvolutionCard />
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
</style>
