const config = {
	schema: [
		{
			"http://localhost:8080/v1/graphql": {
				headers: {},
			},
		},
	],
	documents: ["./src/utils/**/*.ts"],
	overwrite: true,

	generates: {
		"./src/utils/generated/graphql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-vue-apollo",
			],
			config: {
				vueApolloComposableImportFrom: "vue",
			},
		},
		"./graphql.schema.json": {
			plugins: ["introspection"],
		},
	},
};
export default config;
