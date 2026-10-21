import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'docs', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      // Предупреждение для React Compiler, который в проекте не включён
      'react-hooks/incompatible-library': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],

      // Импорты: внешние пакеты → алиас @/ → относительные → стили
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:', '^react', '^@?\\w'],
            ['^@/'],
            ['^\\.\\.', '^\\.'],
            ['\\.css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Воздух между логическими блоками
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch', 'try'] },
        { blankLine: 'always', prev: ['if', 'for', 'while', 'switch', 'try'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['function', 'class', 'export'] },
        { blankLine: 'always', prev: ['function', 'class'], next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
      ],
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
    },
  },
  {
    files: ['**/*.config.{js,ts}', 'vite.config.ts'],
    languageOptions: { globals: globals.node },
  },
  prettier
);
