import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // `app/providers` — устоявшееся имя сегмента в FSD (см. официальную доку).
    files: ['./src/app/**'],
    rules: {
      'fsd/segments-by-purpose': 'off',
    },
  },
]);
