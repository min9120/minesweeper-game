module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
