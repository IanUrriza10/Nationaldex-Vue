module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:vue/vue3-recommended",
		"@vue/eslint-config-airbnb",
		"prettier",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {},
	settings: {
		"import/resolver": {
			alias: [["@", "./src"]],
		},
	},
	ignorePatterns: ["shims-vue.d.ts", "vite.config.ts", "main.ts"],
};
