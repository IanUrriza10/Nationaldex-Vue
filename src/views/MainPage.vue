<script async setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import SearchLayout from "@/layouts/SearchLayout.vue";
import SearchBar from "@/components/MainPage/SearchBar.vue";
import DropdownBar from "@/components/MainPage/DropdownBar.vue";
import { usePokemonSearch } from "../composables/usePokemonSearch.ts";
import { debounce } from "lodash";
import { sort as options } from "@/components/PokedexSidebar/constants.ts";
import CardContainer from "@/components/MainPage/CardContainer.vue";
import Navbar from "@/components/common/NavbarComponent.vue";
const { search, data, store } = usePokemonSearch();

onBeforeMount(() => {
	search();
});
const searchInput = ref("");
const sortInput = ref(0);
watch(
	[searchInput, sortInput],
	debounce(() => {
		store.setSort(options[sortInput.value].value);
		store.setName(searchInput.value);
		store.resetList();
		search();
	}, 500)
);
</script>

<template>
	<SearchLayout>
		<Navbar />
		<div class="content">
			<div class="content__options">
				<div class="search">
					<SearchBar
						v-model="searchInput"
						placeholder="Search.."
					/>
				</div>
				<div class="dropdown">
					<DropdownBar
						v-model="sortInput"
						:options="options"
					/>
				</div>
			</div>
			<CardContainer :pokemon-list="data.pokemonList" />
			<div
				class="loadmore"
				@click="search"
			>
				Load More
			</div>
		</div>
	</SearchLayout>
</template>

<style scoped lang="scss">
.content {
	min-height: calc(100vh - $navbar-h - 4rem - 2rem); // mt-4 p-1
	margin-top: 4rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;

	&__options {
		display: flex;
		justify-content: space-between;
	}
	& .loadmore {
		margin-top: 1rem;
		background-color: $subBackground;
		font-size: 2rem;
		padding: 1rem 0 1rem 0;
	}
}
</style>
