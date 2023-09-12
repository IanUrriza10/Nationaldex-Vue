<script setup lang="ts">
import PokemonLayout from "@/layouts/PokemonLayout.vue";
import SearchBar from "@/components/MainPage/SearchBar.vue";
import DropdownBar from "@/components/MainPage/DropdownBar.vue";
import CardContainer from "@/components/MainPage/CardContainer.vue";
</script>

<template>
	<PokemonLayout>
		<div class="navbar">
			<div class="navbar__title">National Dex</div>
			<div class="navbar__options">
				<div class="navbar__option">Pokemon</div>
				<div class="navbar__option">Items</div>
				<div class="navbar__option">Moves</div>
			</div>
		</div>
		<div class="content">
			<div class="content__options">
				<div class="search">
					<SearchBar placeholder="Search.." />
				</div>
				<div class="dropdown">
					<DropdownBar />
				</div>
			</div>
			<CardContainer />
		</div>
	</PokemonLayout>
</template>

<style scoped lang="scss">
$navbar-h: 8rem;
.navbar {
	width: 100%;
	height: $navbar-h;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: $headline;
	&__title {
		font-size: 3rem;
		cursor: pointer;
	}
	&__options {
		display: flex;
		cursor: pointer;
		gap: 1rem;
		font-size: 2rem;
	}
}
.content {
	min-height: calc(100vh - $navbar-h - 4rem - 2rem); // mt-4 p-1
	margin-top: 4rem;
	display: flex;
	flex-direction: column;

	&__options {
		display: flex;
		justify-content: space-between;
	}
}
</style>
