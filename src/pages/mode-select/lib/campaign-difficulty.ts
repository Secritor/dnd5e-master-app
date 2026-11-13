import type { OfficialCampaign } from '@/entities/campaign';

const EASY_MOODS = new Set(['Для новичков', 'Немного экшена']);
const HARD_MOODS = new Set(['Опасное', 'Хоррор', 'Жуткая']);

export type CampaignDifficulty = 'easy' | 'normal' | 'hard';

export function campaignDifficulty(
  campaign: Pick<OfficialCampaign, 'campaignMood' | 'playerLevelCount'>
): CampaignDifficulty {
  const maxLevel = campaign.playerLevelCount[1];

  if (campaign.campaignMood.some((mood) => EASY_MOODS.has(mood)) || maxLevel <= 5) {
    return 'easy';
  }

  if (campaign.campaignMood.some((mood) => HARD_MOODS.has(mood)) || maxLevel >= 15) {
    return 'hard';
  }

  return 'normal';
}
