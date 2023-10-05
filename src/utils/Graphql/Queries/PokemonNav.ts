import { gql } from "@apollo/client/core";
import { National_Number } from "./fragments/nationalnumber.ts";

export const PokemonNav = gql`
	${National_Number}
	query PokemonNav($prevId: Int, $nextId: Int) {
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
