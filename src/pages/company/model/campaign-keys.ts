export const campaignKeys = {
  all: ['campaigns'] as const,
  official: () => [...campaignKeys.all, 'official'] as const,
};
