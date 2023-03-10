module.exports = {
	env: {
		es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: 'off',
    'no-tabs': 'off',
    'no-new': 'off',
    'dot-notation': 'off',
    'no-useless-constructor': 'off'
  }
}
