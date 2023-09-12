<script setup>
import PokedexSidebar from "@/components/PokedexSidebar/PokeSidebar.vue";
// document.title = "Pokemon";
const title = document.createElement("title");
title.textContent = "Pokemon";
document.head.appendChild(title);
</script>

<template>
	<div class="layout">
		<PokedexSidebar />
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.layout {
	position: relative;
	background-color: $background;
	overflow-y: hidden;
	min-height: 100vh;
	align-items: center;
	text-align: center;
}
</style>
