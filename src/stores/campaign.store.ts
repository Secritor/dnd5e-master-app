import { defineStore } from "pinia";

export const useCampaignStore = defineStore("campaign", {
  state: () => ({
    campaigns: [] as Array<{
      id: string;
      name: string;
    }>,
  }),

  actions: {
    addCampaign(name: string) {
      this.campaigns.push({
        id: crypto.randomUUID(),
        name,
      });
    },
  },
});
