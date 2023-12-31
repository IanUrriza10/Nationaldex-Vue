import { gql } from "@apollo/client/core";
import { Pokemon_Types } from "./fragments/types.ts";
import { National_Number } from "./fragments/nationalnumber.ts";

export const PokemonSearch = gql`
	${Pokemon_Types}
	${National_Number}
	query PokemonSearch(
		$name: String = ""
		$pokemonSpecy: pokemon_v2_pokemonspecies_bool_exp = {}
		$type: pokemon_v2_pokemontype_bool_exp = {}
		$orderBy: [pokemon_v2_pokemon_order_by!]
		$offset: Int = 0
		$limit: Int = 10
	) {
		pokemon_v2_pokemon(
			limit: $limit
			order_by: $orderBy
			offset: $offset
			where: {
				name: { _iregex: $name }
				pokemon_v2_pokemonspecy: $pokemonSpecy
				pokemon_v2_pokemontypes: $type
			}
		) {
			id
			name
			...PokemonTypesFragment
			...PokemonNationalNumberFragment
		}
		pokemon_v2_pokemon_aggregate(
			order_by: $orderBy
			where: {
				name: { _iregex: $name }
				pokemon_v2_pokemonspecy: $pokemonSpecy
				pokemon_v2_pokemontypes: $type
			}
			offset: $offset
		) {
			aggregate {
				count
			}
		}
	}
`;
