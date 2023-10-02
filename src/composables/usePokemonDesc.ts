import { ComputedRef, computed, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { PokemonDescriptionQuery } from "../utils/generated/graphql.ts";
import { PokemonDescription } from "../utils/Graphql/Queries/PokemonDescription.ts";
import { groupBy, Dictionary } from "lodash";
import { GenerationFlavorText } from "@/utils/types/pokemonDesc.ts";

export const usePokemonDesc = (id: ComputedRef<number>) => {
	const data = computed(() => {
		return result.value ? unpackData(result.value) : undefined;
	});

	const variables = computed(() => {
		return {
			prevId: id.value - 1,
			id: id.value,
			nextId: id.value + 1,
		};
	});
	const { result, refetch } = useQuery<PokemonDescriptionQuery>(
		PokemonDescription,
		variables.value
	);

	watch(id, () => {
		refetch(variables.value);
	});

	return { data };
};

const unpackData = (result: PokemonDescriptionQuery) => {
	return {
		prev: getNav(result.prev),
		curr: getMain(result),
		next: getNav(result.next),
	};
};

type PokemonNav = PokemonDescriptionQuery["next"];
type PokemonMeta = PokemonDescriptionQuery["pokemon_v2_pokemon"];
type PokemonFlavorText =
	PokemonDescriptionQuery["pokemon_v2_versiongroup_aggregate"];
const getNav = (result: PokemonNav) => {
	if (result.length === 0) return {};

	return {
		id: result[0].id,
		name: result[0].name,
		pokedexNum:
			result[0].pokemon_v2_pokemonspecy?.pokemon_v2_pokemondexnumbers[0]
				.pokedex_number ?? 0,
	};
};

const getMain = (result: PokemonDescriptionQuery) => {
	return {
		meta: parseMeta(result.pokemon_v2_pokemon),
		flavorTexts: parseFlavorText(result.pokemon_v2_versiongroup_aggregate),
	};
};

const parseMeta = (result: PokemonMeta) => {
	return {
		id: result[0].id,
		name: result[0].name,
		specName:
			result[0].pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0]
				.genus,
		types: result[0].pokemon_v2_pokemontypes.map(
			type => type.pokemon_v2_type?.name ?? "Normal"
		),
		pokedexNum:
			result[0].pokemon_v2_pokemonspecy?.pokemon_v2_pokemondexnumbers[0]
				.pokedex_number,
	};
};
const parseFlavorText = (result: PokemonFlavorText) => {
	const cleaned = result.nodes.map(item => {
		return {
			generation_id: item.generation_id,
			generation_name: item.gen?.gen_arr[0].name,
			flavorTexts: item.versions.map(version => {
				return {
					name: version.name,
					flavorText: version.flavor_texts[0]?.flavor_text,
				};
			}),
		};
	});
	return groupBy(cleaned, "generation_id") as Dictionary<
		GenerationFlavorText[]
	>;
};
