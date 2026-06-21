import { officialCampaignSchema, type OfficialCampaign } from '../model/types';
import { dndCampaigns } from '../model/official-campaigns';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchOfficialCampaigns(): Promise<OfficialCampaign[]> {
  await delay(300);
  return dndCampaigns.map((item) => officialCampaignSchema.parse(item));
}
