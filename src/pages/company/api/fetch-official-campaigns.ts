import { officialCampaignSchema, type OfficialCampaign } from '../model/official-campaign';
import { OFFICIAL_CAMPAIGNS } from '../model/official-campaigns-data';

const MOCK_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export async function fetchOfficialCampaigns(): Promise<OfficialCampaign[]> {
  await delay(MOCK_DELAY_MS);
  return OFFICIAL_CAMPAIGNS.map((item) =>
    officialCampaignSchema.parse({ ...item, id: slugify(item.cardTitle) })
  );
}
