module.exports = {
	extends: [
		'eslint:recommended',
		'@react-native-community',
		'airbnb',
		'airbnb/hooks',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.d.ts'],
			parserOptions: {
				project: './tsconfig.json',
			},
		},
	],
	plugins: ['react-hooks'],
	rules: {
		'react/jsx-no-useless-fragment': 'off',
		'no-empty-pattern': 'off',
		'react/destructuring-assignment': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'no-unused-vars': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-use-before-define': [
			'error',
			{ functions: true, classes: true, variables: false },
		],
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'import/prefer-default-export': 'off',
		'no-await-in-loop': 'error',
		'no-restricted-syntax': 'error',
		'@typescript-eslint/no-use-before-define': ['error', { variables: false }],
		eqeqeq: ['error', 'always'],
		'no-console': 'off',
		'no-param-reassign': ['error', { props: false }],
		'default-case': 'off',
		'no-nested-ternary': 'error',
		'array-callback-return': 'error',
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				endOfLine: 'auto',
			},
		],
		'import/no-import-module-exports': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				'': 'never',
				ts: 'never',
				tsx: 'never',
				js: 'never',
				jsx: 'never',
				mjs: 'never',
			},
		],
		'import/no-unresolved': 'off',
	},
	env: {
		node: true,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
