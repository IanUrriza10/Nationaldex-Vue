import { defineStore } from "pinia";
const defaultState = {
	nav: {
		next: {
			id: 0,
			name: "",
			pokedexNum: 0,
		},
		prev: {
			id: 0,
			name: "",
			pokedexNum: 0,
		},
	},
	meta: {
		id: 0,
		name: "",
		pokedexNum: 0,
		specName: "",
		types: [],
	},
	flavorText: {},
};

export const pokemonDescStore = defineStore({
	id: "pokemonDesc",
	state: () => ({ ...defaultState }),
	getters: {
		getNav: state => state.nav,
		getMeta: state => state.meta,
	},
	actions: {
		setNav(navData: any) {
			this.$patch(state => {
				state.nav = navData;
			});
		},
		setMeta(metaData: any) {
			this.$patch(state => {
				state.meta = metaData;
			});
		},
		setFlavorText(textData: any) {
			this.$patch(state => {
				state.flavorText = textData;
			});
		},
	},
});
