import { create } from 'zustand';

import type { CampaignDifficulty } from '@/entities/campaign';

import type { CatalogSource, LevelFilter, PlayerFilter, TimeFilter } from '../lib/catalog-options';

export type OpenList = 'players' | 'level' | 'time' | null;

interface CampaignFiltersState {
  source: CatalogSource;
  searchQuery: string;
  popular: boolean;
  players: PlayerFilter | null;
  level: LevelFilter | null;
  time: TimeFilter | null;
  difficulty: CampaignDifficulty | null;
  openList: OpenList;
  setSource: (source: CatalogSource) => void;
  setSearchQuery: (searchQuery: string) => void;
  togglePopular: () => void;
  selectPlayers: (players: PlayerFilter) => void;
  selectLevel: (level: LevelFilter) => void;
  selectTime: (time: TimeFilter) => void;
  toggleDifficulty: (difficulty: CampaignDifficulty) => void;
  toggleList: (list: Exclude<OpenList, null>) => void;
  resetFilters: () => void;
  resetAll: () => void;
}

const clearedFilters = {
  source: 'all' as const,
  popular: false,
  players: null,
  level: null,
  time: null,
  difficulty: null,
  openList: null,
};

export const useCampaignFiltersStore = create<CampaignFiltersState>((set, get) => ({
  ...clearedFilters,
  searchQuery: '',
  setSource: (source) => set({ source }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  togglePopular: () => set({ popular: !get().popular }),
  selectPlayers: (players) =>
    set({ players: get().players === players ? null : players, openList: null }),
  selectLevel: (level) => set({ level: get().level === level ? null : level, openList: null }),
  selectTime: (time) => set({ time: get().time === time ? null : time, openList: null }),
  toggleDifficulty: (difficulty) =>
    set({ difficulty: get().difficulty === difficulty ? null : difficulty }),
  toggleList: (list) => set({ openList: get().openList === list ? null : list }),
  resetFilters: () => set(clearedFilters),
  resetAll: () => set({ ...clearedFilters, searchQuery: '' }),
}));
