import { z } from 'zod';

const MIN_SPELL_LEVEL = 0;
const MAX_SPELL_LEVEL = 9;

export const spellSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number().min(MIN_SPELL_LEVEL).max(MAX_SPELL_LEVEL),
  school: z.string(),
});

export type Spell = z.infer<typeof spellSchema>;
