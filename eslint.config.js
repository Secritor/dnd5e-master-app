import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Блоки, вокруг которых нужна пустая строка, чтобы код не сливался в одну кучу.
const BLOCK_STATEMENTS = ['block-like', 'multiline-expression', 'multiline-const', 'multiline-let'];

export default tseslint.config(
  { ignores: ['dist', 'docs', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      eslintReact.configs['recommended-type-checked'],
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import-x': importX,
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver({ project: 'tsconfig.json' })],
    },
    rules: {
      // --- TypeScript ---
      // `any` разрешён осознанно: бывают места, где тип действительно не определён.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      // `onSubmit={handleSubmit(...)}` из react-hook-form возвращает промис — это нормально.
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // --- React ---
      'react-hooks/exhaustive-deps': 'error',

      // --- Импорты ---
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^react-dom', '^@?\\w'],
            ['^@/app'],
            ['^@/pages'],
            ['^@/widgets'],
            ['^@/features'],
            ['^@/entities'],
            ['^@/shared'],
            ['^\\.\\.', '^\\.'],
            ['\\.css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/newline-after-import': 'error',
      // UI-компоненты берём из `@/shared/ui`, а не из HeroUI напрямую.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@heroui/react',
              message: 'Импортируй UI-компоненты из `@/shared/ui`.',
            },
          ],
        },
      ],

      // --- Пустые строки между логическими блоками ---
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: '*', next: BLOCK_STATEMENTS },
        { blankLine: 'always', prev: BLOCK_STATEMENTS, next: '*' },
        { blankLine: 'always', prev: '*', next: ['function', 'class', 'export'] },
        { blankLine: 'always', prev: ['function', 'class'], next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
      ],
    },
  },
  {
    // Единственное место, где HeroUI импортируется напрямую.
    files: ['src/shared/ui/**'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    files: ['**/*.config.{js,ts}', 'vite.config.ts'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },
  prettier
);
