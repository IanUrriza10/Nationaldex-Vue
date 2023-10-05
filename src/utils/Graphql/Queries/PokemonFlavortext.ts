import { gql } from "@apollo/client/core";
export const PokemonFlavortext = gql`
	query PokemonFlavortext($id: Int) {
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
	}
`;
