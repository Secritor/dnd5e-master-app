import { spellSchema, type Spell } from '../model/spell';

const MOCK_DELAY_MS = 200;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_SPELLS: Spell[] = [
  { id: '1', name: 'Fireball', level: 3, school: 'Evocation' },
  { id: '2', name: 'Shield', level: 1, school: 'Abjuration' },
  { id: '3', name: 'Counterspell', level: 3, school: 'Abjuration' },
  { id: '4', name: 'Mage Hand', level: 0, school: 'Conjuration' },
];

export async function fetchSpells(): Promise<Spell[]> {
  await delay(MOCK_DELAY_MS);
  return MOCK_SPELLS.map((s) => spellSchema.parse(s));
}
