import { defineStore } from "pinia";

const defaultState = {
	options: 0,
	query: {
		type: -1,
		generation: 0,
		eggGroup: -1,
	},
};

export const sidebarStore = defineStore({
	id: "sidebar",
	state: () => ({ ...defaultState }),
	getters: {
		getOptions: state => state.options,
	},
	actions: {
		setOptions(option: number) {
			this.$patch(state => {
				state.options = option;
			});
		},
		setType(type: number) {
			this.$patch(state => {
				state.query.type = type;
			});
		},
		setGeneration(generation: number) {
			this.$patch(state => {
				state.query.generation = generation;
			});
		},
		setEggGroup(eggGroup: number) {
			this.$patch(state => {
				state.query.eggGroup = eggGroup;
			});
		},
		setQuery(query: {
			type: number;
			generation: number;
			eggGroup: number;
		}) {
			this.$patch(state => {
				state.query = query;
			});
		},
		resetQuery() {
			this.$patch(state => {
				//Broken again
				state.query = {
					type: -1,
					generation: 0,
					eggGroup: -1,
				};
			});
		},
	},
});
