import { z } from 'zod';

export const CAMPAIGN_MOOD_TAGS = [
  'Мрачное',
  'Готическое',
  'Тревожное',
  'Жуткая',
  'Сказочное',
  'Мистическое',
  'Загадочное',
  'Драматическое',
  'Хаотичное',
  'Героическое',
  'Эпическое',
  'Комедийное',
  'Абсурдное',
  'Немного экшена',
  'Для новичков',
  'Детективное',
  'Хоррор',
  'Политическое',
  'Планарное',
  'Напряженное',
  'Опасное',
] as const;

export type CampaignMoodTag = (typeof CAMPAIGN_MOOD_TAGS)[number];

export const officialCampaignSchema = z.object({
  id: z.string(),
  cardTitle: z.string(),
  thumbnailImage: z.string(),
  description: z.string(),
  playerLevelCount: z.tuple([z.number(), z.number()]),
  campaignMood: z.array(z.string()),
});

export type OfficialCampaign = z.infer<typeof officialCampaignSchema>;

/** Форма записи в статических данных — без `id`, он вычисляется при загрузке. */
export type OfficialCampaignInput = Omit<OfficialCampaign, 'id'>;
