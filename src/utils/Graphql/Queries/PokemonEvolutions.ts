import { gql } from "@apollo/client/core";

export const PokemonEvolutions = gql`
	query PokemonEvolutions($id: Int) {
		pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
			spec: pokemon_v2_pokemonspecy {
				baseId: evolves_from_species_id
				evoChain: pokemon_v2_evolutionchain {
					spec2: pokemon_v2_pokemonspecies(order_by: { id: asc }) {
						id
						name
						evolves_from_species_id
						requirements: pokemon_v2_pokemonevolutions {
							needRain: needs_overworld_rain
							needLevel: min_level
							needHappiness: min_happiness
							needBeauty: min_beauty
							needAffection: min_affection
							needHeldItem: pokemonV2ItemByHeldItemId {
								id
								name
							}
							needGender: pokemon_v2_gender {
								id
								name
							}
							needUseItem: pokemon_v2_item {
								id
								name
							}
							needLocation: pokemon_v2_location {
								name
								id
							}
							needMove: pokemon_v2_move {
								name
								moveType: pokemon_v2_type {
									name
								}
							}
							needTime: time_of_day
							needTrade: pokemonV2PokemonspecyByTradeSpeciesId {
								id
								name
							}
							needMoveType: pokemon_v2_type {
								name
							}
							trigger: pokemon_v2_evolutiontrigger {
								name
								id
							}
						}
					}
				}
			}
		}
	}
`;
