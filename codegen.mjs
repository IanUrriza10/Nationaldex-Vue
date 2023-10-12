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
			plugins: ["typescript", "typescript-operations"],
		},
		"./graphql.schema.json": {
			plugins: ["introspection"],
		},
	},
};
export default config;
