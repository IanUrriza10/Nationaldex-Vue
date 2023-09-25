import { defineStore } from "pinia";
import { PokeCard } from "../types/mainPage.ts";
const limit = 10;
const defaultState = {
	data: {
		query: {
			name: "",
			type: 0,
			generation: 0,
			eggGroup: 0,
			orderBy: { id: "asc" } as { id: string } | { name: string },
		},
		aggregate: 0,
		offset: 0,
		pokemonList: [] as PokeCard[],
	},
	loading: true,
	error: false,
};

export const pokemonSearchStore = defineStore({
	id: "pokemonSearch",
	state: () => ({ ...defaultState }),
	getters: {
		getData: state => state.data,
		getQuery: state => state.data.query,
		getText: state => state.data.query.name,
	},
	actions: {
		updateData(newData: { pokemonList: PokeCard[]; aggregate: number }) {
			this.$patch(state => {
				(state.data.pokemonList = [
					...state.data.pokemonList,
					...newData.pokemonList,
				]),
					(state.data.aggregate =
						state.data.aggregate + newData.aggregate);
				state.data.offset = state.data.offset + limit;
			});
		},
		setQuery(newQuery: {
			type: number;
			generation: number;
			eggGroup: number;
		}) {
			this.$patch(state => {
				state.data.query = {
					...state.data.query,
					...newQuery,
				};
			});
		},
		setName(newName: string) {
			this.$state.data.query.name = newName;
			this.$state.data.offset = 0;
		},
		setSort(option: { id: string } | { name: string }) {
			this.$state.data.query.orderBy = option;
		},
		resetOffset() {
			this.$state.data.offset = 0;
		},
		resetList() {
			console.log("reset");
			this.$state.data.pokemonList = [];
			this.$state.data.aggregate = 0;
		},
	},
});
