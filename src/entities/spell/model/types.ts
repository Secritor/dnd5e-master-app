import { z } from 'zod';

export const spellSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number().min(0).max(9),
  school: z.string(),
});

export type Spell = z.infer<typeof spellSchema>;
