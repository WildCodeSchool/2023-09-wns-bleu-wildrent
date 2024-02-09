module.exports = {
  root: true,

  overrides: [
    {
      files: ['frontend/*/.js, *.mjs, *.tsx, *.ts '],
      env: {
        node: true,
        es2021: true,
      },
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-var-requires': 0,
        'no-undef': 'error',
        semi: 'warn',
      },
    },
    {
      files: ['backend/**/*.js, *.ts '],
      env: {
        node: true,
        es2021: true,
      },
      extends: ['eslint:recommended', 'prettier'],
      rules: {
        'no-undef': 'error',
        semi: 'warn',
      },
    },
  ],
};
