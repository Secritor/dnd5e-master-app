export type CatalogSource = 'all' | 'official' | 'community';

export type PlayerFilter = number | 'more';

export type LevelFilter = number | 'more';

export const TIME_OPTIONS = [
  { id: '60', minutes: 60, labelKey: 'catalog.time60' },
  { id: '80', minutes: 80, labelKey: 'catalog.time80' },
  { id: '120', minutes: 120, labelKey: 'catalog.time120' },
  { id: '300', minutes: 300, labelKey: 'catalog.time5h' },
  { id: '600', minutes: 600, labelKey: 'catalog.time10h' },
  { id: '1200', minutes: 1200, labelKey: 'catalog.time20h' },
  { id: '2400', minutes: 2400, labelKey: 'catalog.time40h' },
  { id: '4800', minutes: 4800, labelKey: 'catalog.time80h' },
  { id: 'over', minutes: null, labelKey: 'catalog.timeOver80' },
] as const;

export type TimeFilter = (typeof TIME_OPTIONS)[number]['id'];

export const PLAYER_VALUES = [1, 2, 3, 4, 5, 6] as const;

export const LEVEL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
