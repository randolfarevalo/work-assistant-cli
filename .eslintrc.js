module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['off', 'always'],
    'prefer-const': ['off', 'always'],
    'no-console': ['off', 'always'],
    'padded-blocks': ['off', 'always'],
    'no-restricted-syntax': ['warn'],
    'no-await-in-loop': ['warn'],
    'no-unused-vars': ['warn'],
  },
};
