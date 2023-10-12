import { ComputedRef, Ref, computed, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { groupBy, Dictionary, omitBy, map, zip, omit } from "lodash";
import { GenerationFlavorText } from "@/utils/types/pokemonDesc.ts";
import { pokemonDescStore as descStore } from "@/utils/stores/index.ts";
import {
	PokemonNavQuery,
	PokemonMetaQuery,
	PokemonFlavortextQuery,
	PokemonStatsQuery,
	PokemonEvolutionsQuery,
} from "@/utils/generated/graphql.ts";
import {
	PokemonNav,
	PokemonMeta,
	PokemonFlavortext,
	PokemonStats,
	PokemonEvolutions,
} from "@/utils/Graphql/Queries/index.ts";
import { storeToRefs } from "pinia";
export const usePokemonDesc = (id: ComputedRef<number>) => {
	const store = descStore();
	const { nav, meta, flavorText, stat, evo } = storeToRefs(store);
	const { setNav, setMeta, setFlavorText, setStat, setEvo } = store;
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
	const { result: flavorTextData, load: loadFlavorText } =
		useLazyQuery<PokemonFlavortextQuery>(PokemonFlavortext, {
			id: variables.value.id,
		});
	const { result: statData, load: loadStat } =
		useLazyQuery<PokemonStatsQuery>(PokemonStats, {
			id: variables.value.id,
		});

	const { result: evoData, load: loadEvo } =
		useLazyQuery<PokemonEvolutionsQuery>(PokemonEvolutions, {
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
	watch(statData, () => {
		setStat(processStat(statData));
	});
	watch(evoData, () => {
		setEvo(processEvo(evoData));
	});

	const initialLoad = () => {
		loadNav();
		loadMeta();
	};

	const queryFlavortext = () => {
		loadFlavorText(PokemonFlavortext, { id: variables.value.id });
	};
	const queryStat = () => {
		loadStat(PokemonStats, { id: variables.value.id });
	};
	const queryEvo = () => {
		loadEvo(PokemonEvolutions, { id: variables.value.id });
	};

	return {
		nav,
		meta,
		flavorText,
		stat,
		evo,
		initialLoad,
		queryFlavortext,
		queryStat,
		queryEvo,
	};
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

// Stats
export type PokemonStatsT = PokemonStatsQuery["pokemon_v2_pokemon"];
const processStat = (statData: Ref<PokemonStatsQuery | undefined>) => {
	return parseStat(statData.value?.pokemon_v2_pokemon);
};

const parseStat = (pokemon: PokemonStatsT | undefined) => {
	if (pokemon == undefined) return {};
	const { stats, abilities, specy, types } = pokemon[0];

	const parsedAbilities = groupBy(
		abilities.map(ability => ({
			name: ability.ability?.name,
			effect: ability.ability?.effect?.[0].text,
			isHidden: ability.is_hidden ? "hidden" : "visible",
		})),
		"isHidden"
	);

	const eggGroups = specy?.eggGroups.map(group => {
		return group.eggGroup?.name;
	});

	const resistance = types.map(type => {
		return type.type?.efficacies.map(eff => {
			return {
				multiplier: eff.damage_factor / 100,
				name: eff.type?.name,
			};
		});
	});
	let doubleResistance;
	if (resistance.length > 1) {
		doubleResistance = map(
			zip(resistance[0], resistance[1]),
			([res1, res2]) => {
				return {
					multiplier:
						(res1?.multiplier ?? 1) * (res2?.multiplier ?? 1),
					name: res1?.name,
				};
			}
		);
	}

	return {
		stats: stats.map(stat => stat.base_stat),
		abilities: parsedAbilities,
		eggGroups: eggGroups,
		resistances: doubleResistance ?? resistance[0],
	};
};

// Evolution

export type PokemonEvoT = PokemonEvolutionsQuery["pokemon"];

const processEvo = (evoData: Ref<PokemonEvolutionsQuery | undefined>) => {
	return groupEvolution(parseEvo(evoData.value?.pokemon?.[0]));
};

const parseEvo = (data: PokemonEvoT[0] | undefined) => {
	if (data == undefined) return [];
	const evoChain = data?.spec?.evoChain?.spec2;
	const parsed = evoChain?.map(pokemon => {
		return {
			id: pokemon.id,
			name: pokemon.name,
			baseId: pokemon.evolves_from_species_id,
			requirements: omitBy(pokemon.requirements?.[0], attributes => {
				return (
					attributes == undefined ||
					attributes == null ||
					attributes == false ||
					attributes == ""
				);
			}),
		};
	});
	console.log(parsed);
	return parsed;
};

type PokemonEvo = {
	id: number;
	name: string;
	baseId: number | null | undefined;
	requirements?: Dictionary<string | number | boolean | any>;
};

const groupEvolution = (pokemons: PokemonEvo[] | undefined) => {
	const evolutionPairs = [] as any[];
	const dictionary: Record<number, PokemonEvo> = {};
	for (const pokemon of pokemons || []) {
		dictionary[pokemon.id] = pokemon;
	}
	pokemons?.map(pokemon => {
		if (pokemon.baseId == null) return;
		evolutionPairs.push({
			base: {
				...omit(dictionary[pokemon.baseId], "requirements"),
			},
			requirements: {
				...pokemon.requirements,
			},
			evolution: {
				...omit(pokemon, "requirements"),
			},
		});
	});
	return evolutionPairs;
};
