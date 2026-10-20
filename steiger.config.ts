import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

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
