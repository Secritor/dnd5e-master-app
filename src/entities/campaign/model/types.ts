import { z } from 'zod';

export const campaignMoodSchema = z.string();

export const officialCampaignSchema = z.object({
  cardTitle: z.string(),
  thumbnailImage: z.string(),
  description: z.string(),
  playerLevelCount: z.tuple([z.number(), z.number()]),
  compaignMood: z.array(campaignMoodSchema),
});

export type OfficialCampaign = z.infer<typeof officialCampaignSchema>;
export type CampaignMoodTag = z.infer<typeof campaignMoodSchema>;

export interface MasterCampaign {
  id: string;
  name: string;
}
