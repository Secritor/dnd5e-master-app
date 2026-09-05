export const spellKeys = {
  all: ['spells'] as const,
  list: () => [...spellKeys.all, 'list'] as const,
};
