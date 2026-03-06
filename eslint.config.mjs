import tseslint from 'typescript-eslint';

export default tseslint.config(
  tseslint.configs.recommended,
  {
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ regex: '^\\.{1,2}/' }] }],
    },
  },
);
