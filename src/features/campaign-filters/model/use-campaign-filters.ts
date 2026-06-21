import { create } from 'zustand';
import type { CampaignMoodTag } from '@/entities/campaign';

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
  minLevel: 1,
  maxLevel: 20,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedMoods: (selectedMoods) => set({ selectedMoods }),
  setMinLevel: (minLevel) => {
    const { maxLevel } = get();
    set({ minLevel, maxLevel: minLevel > maxLevel ? minLevel : maxLevel });
  },
  setMaxLevel: (maxLevel) => {
    const { minLevel } = get();
    set({ maxLevel, minLevel: maxLevel < minLevel ? maxLevel : minLevel });
  },
}));
