import { gql } from "@apollo/client/core";

export const PokemonStats = gql`
	query PokemonStats($id: Int) {
		pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
			id
			name
			pokemon_v2_pokemonstats {
				base_stat
			}
			pokemon_v2_pokemonabilities(where: { pokemon_id: { _eq: $id } }) {
				pokemon_v2_ability {
					name
					pokemon_v2_abilityeffecttexts(
						where: { language_id: { _eq: 9 } }
					) {
						effect
						pokemon_v2_language {
							id
						}
					}
				}
				is_hidden
			}
			pokemon_v2_pokemonspecy {
				pokemon_v2_pokemonegggroups {
					pokemon_v2_egggroup {
						name
					}
				}
			}
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
					pokemonV2TypeefficaciesByTargetTypeId {
						damage_factor
						pokemon_v2_type {
							name
						}
					}
				}
			}
		}
	}
`;
