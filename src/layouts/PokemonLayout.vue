<script setup>
import PokedexSidebar from "@/components/PokedexSidebar/PokeSidebar.vue";
</script>

<template>
	<div class="layout">
		<PokedexSidebar />
		<div class="content">
			<slot></slot>
		</div>
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
.content {
	width: 60%;
	background-color: $cardBackground;
	padding: 1rem;
	margin-left: auto;
	margin-right: auto;
}
</style>
