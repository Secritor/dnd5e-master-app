import type { OfficialCampaign } from '@/entities/campaign';

export interface CampaignFilterParams {
  searchQuery: string;
  selectedMoods: string[];
  minLevel: number;
  maxLevel: number;
}

export function filterOfficialCampaigns(
  campaigns: OfficialCampaign[],
  { searchQuery, selectedMoods, minLevel, maxLevel }: CampaignFilterParams,
): OfficialCampaign[] {
  const query = searchQuery.toLocaleLowerCase();

  return campaigns.filter((campaign) => {
    const matchesTitle = campaign.cardTitle.toLocaleLowerCase().includes(query);
    const matchesMood =
      selectedMoods.length === 0 ||
      selectedMoods.some((mood) => campaign.compaignMood.includes(mood));

    const [campaignMin, campaignMax] = campaign.playerLevelCount;
    const matchesLevel =
      campaignMin >= minLevel && campaignMax <= maxLevel;

    return matchesTitle && matchesMood && matchesLevel;
  });
}
