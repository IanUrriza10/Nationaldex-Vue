import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: "http://127.0.0.1:8080/v1/graphql",
});

// Cache implementation
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				Pokemon_V2_Pokemonspecies: {
					merge: true,
				},
			},
		},
	},
});

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
	connectToDevTools: true,
});
