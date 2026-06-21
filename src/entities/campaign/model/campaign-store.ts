import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MasterCampaign } from './types';

interface CampaignState {
  campaigns: MasterCampaign[];
  selectedCampaignId: string | null;
  sidebarOpen: boolean;
  addCampaign: (name: string) => void;
  selectCampaign: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      campaigns: [],
      selectedCampaignId: null,
      sidebarOpen: true,
      addCampaign: (name) =>
        set((state) => ({
          campaigns: [...state.campaigns, { id: crypto.randomUUID(), name: name.trim() }],
        })),
      selectCampaign: (id) => set({ selectedCampaignId: id }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'dnd-campaign-store' },
  ),
);
