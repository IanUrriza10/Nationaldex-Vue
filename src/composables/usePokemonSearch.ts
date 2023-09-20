import { pokemonSearchStore as searchStore } from "@/utils/stores/index.ts";
import { watch, computed } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import {
	PokemonSearchQueryVariables,
	PokemonSearchQuery,
} from "@/utils/generated/graphql.ts";
import { map, isEqual } from "lodash";
import { PokemonSearch } from "@/utils/Graphql/Queries/PokemonSearch.ts";
import { PokeCard } from "../utils/types/mainPage.ts";
import { StoreSearchQuery } from "../utils/types/mainPage.ts";
import { storeToRefs } from "pinia";

export const usePokemonSearch = () => {
	const store = searchStore();
	const { updateData } = store;
	let { data } = storeToRefs(store);
	let variables = computed(() =>
		packVariables(data.value.query, data.value.offset)
	);

	const { result, load, error, loading, refetch } =
		useLazyQuery<PokemonSearchQuery>(PokemonSearch);

	const search = () => {
		load(PokemonSearch, variables.value) || refetch(variables.value);
	};

	watch(result, (value, prevValue) => {
		if (!loading.value && !compareResult(value, prevValue)) {
			result.value ? updateData(unpackData(result.value)) : undefined;
		}
	});

	return { search, data, error, store };
};

const compareResult = (
	value: PokemonSearchQuery | undefined,
	prevValue: PokemonSearchQuery | undefined
) => {
	const newList = value?.pokemon_v2_pokemon.map(pokemon => pokemon.id);
	const prevList = prevValue?.pokemon_v2_pokemon.map(pokemon => pokemon.id);
	return isEqual(newList, prevList);
};

const packVariables = (rawVariables: StoreSearchQuery, offset: number) => {
	const variables = {
		name: rawVariables.name,
		limit: 10,
		offset,
		orderBy: rawVariables.orderBy,
	} as PokemonSearchQueryVariables;

	if (rawVariables.generation > 0) {
		variables.pokemonSpecy = {
			...variables.pokemonSpecy,
			generation_id: { _eq: rawVariables.generation },
		};
	}
	if (rawVariables.eggGroup > 0) {
		variables.pokemonSpecy = {
			...variables.pokemonSpecy,
			pokemon_v2_pokemonegggroups: {
				pokemon_v2_egggroup: { id: { _eq: rawVariables.eggGroup } },
			},
		};
	}

	if (rawVariables.type > 0) {
		variables.type = {
			pokemon_v2_type: { id: { _eq: rawVariables.type } },
		};
	}
	return variables;
};

const unpackData = (data: PokemonSearchQuery) => {
	const { pokemon_v2_pokemon, pokemon_v2_pokemon_aggregate } = data;

	const pokemonList = map(pokemon_v2_pokemon, item => {
		return {
			id: item.id,
			name: item.name,
			pokedexNumbers: map(
				item.pokemon_v2_pokemonspecy?.pokemon_v2_pokemondexnumbers,
				"pokedex_number"
			),
			types: map(item.pokemon_v2_pokemontypes, "pokemon_v2_type.name"),
		} as PokeCard;
	});
	const aggregate = pokemon_v2_pokemon_aggregate.aggregate?.count ?? 0;

	return { pokemonList, aggregate };
};
