import { gql } from "@apollo/client/core";

export const National_Number = gql`
	fragment PokemonNationalNumberFragment on pokemon_v2_pokemon {
		pokemon_v2_pokemonspecy {
			pokemon_v2_pokemondexnumbers(limit: 1) {
				pokedex_number
			}
		}
	}
`;
