import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Обзор `/master` этот стор не читает. Файл оставлен для будущего экрана кампаний. */

export interface MasterCampaign {
  id: string;
  name: string;
}

interface MasterCampaignState {
  campaigns: MasterCampaign[];
  selectedCampaignId: string | null;
  addCampaign: (name: string) => void;
  selectCampaign: (id: string | null) => void;
}

export const useMasterCampaignStore = create<MasterCampaignState>()(
  persist(
    (set) => ({
      campaigns: [],
      selectedCampaignId: null,
      addCampaign: (name) =>
        set((state) => ({
          campaigns: [...state.campaigns, { id: crypto.randomUUID(), name: name.trim() }],
        })),
      selectCampaign: (id) => set({ selectedCampaignId: id }),
    }),
    {
      name: 'dnd-campaign-store',
      partialize: (state) => ({ campaigns: state.campaigns }),
    }
  )
);
