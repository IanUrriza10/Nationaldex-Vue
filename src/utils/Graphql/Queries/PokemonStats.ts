import { gql } from "@apollo/client/core";

export const PokemonStats = gql`
	query PokemonStats($id: Int) {
		pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
			stats: pokemon_v2_pokemonstats {
				base_stat
			}
			abilities: pokemon_v2_pokemonabilities(
				where: { pokemon_id: { _eq: $id } }
			) {
				ability: pokemon_v2_ability {
					name
					effect: pokemon_v2_abilityeffecttexts(
						where: { language_id: { _eq: 9 } }
					) {
						text: effect
					}
				}
				is_hidden
			}
			specy: pokemon_v2_pokemonspecy {
				eggGroups: pokemon_v2_pokemonegggroups {
					eggGroup: pokemon_v2_egggroup {
						name
					}
				}
			}
			types: pokemon_v2_pokemontypes {
				type: pokemon_v2_type {
					name
					efficacies: pokemonV2TypeefficaciesByTargetTypeId {
						damage_factor
						type: pokemon_v2_type {
							name
						}
					}
				}
			}
		}
	}
`;
