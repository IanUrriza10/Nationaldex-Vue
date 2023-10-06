import { ComputedRef, Ref, computed, watch } from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { groupBy, Dictionary } from "lodash";
import { GenerationFlavorText } from "@/utils/types/pokemonDesc.ts";
import { pokemonDescStore as descStore } from "@/utils/stores/index.ts";
import {
	PokemonNavQuery,
	PokemonMetaQuery,
	PokemonFlavortextQuery,
	PokemonStatsQuery,
} from "@/utils/generated/graphql.ts";
import {
	PokemonNav,
	PokemonMeta,
	PokemonFlavortext,
	PokemonStats,
} from "@/utils/Graphql/Queries/index.ts";
import { storeToRefs } from "pinia";
import { map, zip } from "lodash";
export const usePokemonDesc = (id: ComputedRef<number>) => {
	const store = descStore();
	const { nav, meta, flavorText, stat } = storeToRefs(store);
	const { setNav, setMeta, setFlavorText, setStat } = store;
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

	return {
		nav,
		meta,
		flavorText,
		stat,
		initialLoad,
		queryFlavortext,
		queryStat,
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
