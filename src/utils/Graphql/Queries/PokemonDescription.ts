import { gql } from "@apollo/client/core";
import { Pokemon_Types } from "./fragments/types.ts";
import { National_Number } from "./fragments/nationalnumber.ts";
export const PokemonDescription = gql`
	${Pokemon_Types}
	${National_Number}
	query PokemonDescription($prevId: Int, $id: Int, $nextId: Int) {
		pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
			id
			name
			...PokemonTypesFragment
			pokemon_v2_pokemonspecy {
				pokemon_v2_pokemonspeciesnames(
					where: { language_id: { _eq: 9 } }
				) {
					genus
				}
				pokemon_v2_pokemondexnumbers(limit: 1) {
					pokedex_number
				}
			}
		}

		pokemon_v2_versiongroup_aggregate {
			nodes {
				generation_id
				versions: pokemon_v2_versions {
					flavor_texts: pokemon_v2_pokemonspeciesflavortexts(
						where: {
							language_id: { _eq: 9 }
							pokemon_v2_pokemonspecy: {
								pokemon_v2_pokemons: { id: { _eq: $id } }
							}
						}
					) {
						flavor_text
					}
					name
				}
				gen: pokemon_v2_generation {
					gen_arr: pokemon_v2_generationnames(
						where: { language_id: { _eq: 9 } }
					) {
						name
					}
				}
			}
		}
		next: pokemon_v2_pokemon(where: { id: { _eq: $nextId } }) {
			id
			name
			...PokemonNationalNumberFragment
		}
		prev: pokemon_v2_pokemon(where: { id: { _eq: $prevId } }) {
			id
			name
			...PokemonNationalNumberFragment
		}
	}
`;
