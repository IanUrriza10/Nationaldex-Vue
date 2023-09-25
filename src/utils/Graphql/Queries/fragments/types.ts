import { gql } from "@apollo/client/core";

export const Pokemon_Types = gql`
	fragment PokemonTypesFragment on pokemon_v2_pokemon {
		pokemon_v2_pokemontypes {
			pokemon_v2_type {
				name
			}
		}
	}
`;
