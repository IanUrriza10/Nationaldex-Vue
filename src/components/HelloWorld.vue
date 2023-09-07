<script setup lang="ts">
import pokeApi from "@/plugins/PokeApi.ts";

await pokeApi.getPokemonById(1);
</script>

<template>
	<div></div>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
