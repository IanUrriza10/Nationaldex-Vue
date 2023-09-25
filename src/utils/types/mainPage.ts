export interface PokeCard {
	id: number;
	name: string;
	types: string[];
	pokedexNumbers: number[];
}

export interface StoreSearchQuery {
	name: string;
	type: number;
	generation: number;
	eggGroup: number;
	orderBy: { id: string } | { name: string };
}
