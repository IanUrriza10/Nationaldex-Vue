import { PokemonEvolutionsQuery } from "../generated/graphql.ts";
export interface FlavorText {
	name: string;
	flavorText: string;
}

export interface GenerationFlavorText {
	generation_id: number | null | undefined;
	generation_name: string | undefined;
	flavorTexts: FlavorText[];
}

export interface Ability {
	name: string;
	effect: string;
	isHidden: string;
}

export interface EvoPokemon {
	id: number;
	name: string;
}

export type EvoRequirements = NonNullable<
	NonNullable<PokemonEvolutionsQuery["pokemon"][0]["spec"]>["evoChain"]
>["spec2"][0]["requirements"][0];
