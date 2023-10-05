import { gql } from "@apollo/client/core";
import { Pokemon_Types } from "./fragments/types.ts";
export const PokemonMeta = gql`
	${Pokemon_Types}
	query PokemonMeta($id: Int) {
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
	}
`;
