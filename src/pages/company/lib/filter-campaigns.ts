import type { CampaignMoodTag, OfficialCampaign } from '../model/official-campaign';

export interface CampaignFilterParams {
  searchQuery: string;
  selectedMoods: CampaignMoodTag[];
  minLevel: number;
  maxLevel: number;
}

export function filterOfficialCampaigns(
  campaigns: OfficialCampaign[],
  { searchQuery, selectedMoods, minLevel, maxLevel }: CampaignFilterParams
): OfficialCampaign[] {
  const query = searchQuery.toLocaleLowerCase();

  return campaigns.filter((campaign) => {
    const matchesTitle = campaign.cardTitle.toLocaleLowerCase().includes(query);
    const matchesMood =
      selectedMoods.length === 0 ||
      selectedMoods.every((mood) => campaign.campaignMood.includes(mood));

    const [campaignMin, campaignMax] = campaign.playerLevelCount;
    const matchesLevel = campaignMax >= minLevel && campaignMin <= maxLevel;

    return matchesTitle && matchesMood && matchesLevel;
  });
}
