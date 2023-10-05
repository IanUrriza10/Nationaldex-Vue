import { ComputedRef, Ref, computed, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { groupBy, Dictionary } from "lodash";
import { GenerationFlavorText } from "@/utils/types/pokemonDesc.ts";
import { pokemonDescStore as descStore } from "@/utils/stores/index.ts";
import {
	PokemonNavQuery,
	PokemonMetaQuery,
	PokemonFlavortextQuery,
} from "@/utils/generated/graphql.ts";
import {
	PokemonNav,
	PokemonMeta,
	PokemonFlavortext,
} from "@/utils/Graphql/Queries/index.ts";
import { storeToRefs } from "pinia";

export const usePokemonDesc = (id: ComputedRef<number>) => {
	const store = descStore();
	const { nav, meta, flavorText } = storeToRefs(store);
	const { setNav, setMeta, setFlavorText } = store;
	const variables = computed(() => {
		return {
			prevId: id.value - 1,
			id: id.value,
			nextId: id.value + 1,
		};
	});

	// Queries
	const {
		result: navData,
		load: loadNav,
		refetch: refetchNav,
	} = useLazyQuery<PokemonNavQuery>(PokemonNav, {
		nextId: variables.value.nextId,
		prevId: variables.value.prevId,
	});
	const {
		result: metaData,
		load: loadMeta,
		refetch: refetchMeta,
	} = useLazyQuery<PokemonMetaQuery>(PokemonMeta, {
		id: variables.value.id,
	});
	const {
		result: flavorTextData,
		load: loadFlavorText,
		refetch: refetchFlavorText,
	} = useLazyQuery<PokemonFlavortextQuery>(PokemonFlavortext, {
		id: variables.value.id,
	});

	watch(id, () => {
		refetchNav({
			nextId: variables.value.nextId,
			prevId: variables.value.prevId,
		});
		refetchMeta({
			id: variables.value.id,
		});
	});

	watch(metaData, () => {
		setMeta(processMeta(metaData));
	});

	watch(navData, () => {
		setNav(processNav(navData));
	});
	watch(flavorTextData, () => {
		setFlavorText(processFlavortext(flavorTextData));
	});

	const initialLoad = () => {
		loadNav();
		loadMeta();
	};

	const queryFlavortext = () => {
		loadFlavorText(PokemonFlavortext, { id: variables.value.id }) ||
			refetchFlavorText({ id: variables.value.id });
	};

	return { nav, meta, flavorText, initialLoad, queryFlavortext };
};

// PokeNav
export type PokemonNavT = PokemonNavQuery["next"];
const processNav = (navData: Ref<PokemonNavQuery | undefined>) => {
	return {
		prev: unpackNav(navData?.value?.prev),
		next: unpackNav(navData?.value?.next),
	};
};

const unpackNav = (result: PokemonNavT | undefined) => {
	if (result === undefined) return {};
	if (result.length === 0) return {};

	return {
		id: result[0].id,
		name: result[0].name,
		pokedexNum:
			result[0].pokemon_v2_pokemonspecy?.pokemon_v2_pokemondexnumbers[0]
				.pokedex_number ?? 0,
	};
};

// PokeMeta
export type PokemonMetaT = PokemonMetaQuery["pokemon_v2_pokemon"];
const processMeta = (metaData: Ref<PokemonMetaQuery | undefined>) => {
	return parseMeta(metaData.value?.pokemon_v2_pokemon);
};
const parseMeta = (result: PokemonMetaT | undefined) => {
	if (result == undefined) return {};
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

// Flavor Texts
export type PokemonFlavortextT =
	PokemonFlavortextQuery["pokemon_v2_versiongroup_aggregate"];
const processFlavortext = (
	flavorData: Ref<PokemonFlavortextQuery | undefined>
) => {
	return parseFlavorText(
		flavorData?.value?.pokemon_v2_versiongroup_aggregate
	);
};

const parseFlavorText = (result: PokemonFlavortextT | undefined) => {
	if (result === undefined) return {};
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
