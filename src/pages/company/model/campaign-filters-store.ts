import { create } from 'zustand';
import type { CampaignMoodTag } from './official-campaign';

const MIN_PLAYER_LEVEL = 1;
const MAX_PLAYER_LEVEL = 20;

const clampLevel = (level: number, fallback: number): number =>
  Number.isFinite(level)
    ? Math.min(Math.max(Math.round(level), MIN_PLAYER_LEVEL), MAX_PLAYER_LEVEL)
    : fallback;

interface CampaignFiltersState {
  searchQuery: string;
  selectedMoods: CampaignMoodTag[];
  minLevel: number;
  maxLevel: number;
  setSearchQuery: (q: string) => void;
  setSelectedMoods: (moods: CampaignMoodTag[]) => void;
  setMinLevel: (level: number) => void;
  setMaxLevel: (level: number) => void;
}

export const useCampaignFiltersStore = create<CampaignFiltersState>((set, get) => ({
  searchQuery: '',
  selectedMoods: [],
  minLevel: MIN_PLAYER_LEVEL,
  maxLevel: MAX_PLAYER_LEVEL,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedMoods: (selectedMoods) => set({ selectedMoods }),
  setMinLevel: (level) => {
    const minLevel = clampLevel(level, MIN_PLAYER_LEVEL);
    const { maxLevel } = get();
    set({ minLevel, maxLevel: Math.max(minLevel, maxLevel) });
  },
  setMaxLevel: (level) => {
    const maxLevel = clampLevel(level, MAX_PLAYER_LEVEL);
    const { minLevel } = get();
    set({ maxLevel, minLevel: Math.min(maxLevel, minLevel) });
  },
}));
