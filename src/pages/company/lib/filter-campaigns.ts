import { campaignDifficulty, type OfficialCampaign } from '@/entities/campaign';

import {
  type LevelFilter,
  type PlayerFilter,
  TIME_OPTIONS,
  type TimeFilter,
} from './catalog-options';

export interface CampaignFilterParams {
  source: 'all' | 'official' | 'community';
  searchQuery: string;
  players: PlayerFilter | null;
  level: LevelFilter | null;
  time: TimeFilter | null;
  difficulty: 'easy' | 'normal' | 'hard' | null;
}

interface PartyRange {
  playersMin: number;
  playersMax: number;
}

export function filterOfficialCampaigns(
  campaigns: OfficialCampaign[],
  { source, searchQuery, players, level, time, difficulty }: CampaignFilterParams
): OfficialCampaign[] {
  if (source === 'community') return [];

  const query = searchQuery.toLocaleLowerCase();

  return campaigns.filter((campaign) => {
    const matchesQuery =
      campaign.cardTitle.toLocaleLowerCase().includes(query) ||
      campaign.description.toLocaleLowerCase().includes(query);

    return (
      matchesQuery &&
      matchesLevel(campaign, level) &&
      matchesDifficulty(campaign, difficulty) &&
      matchesPlayers(campaign, players) &&
      matchesTime(campaign, time)
    );
  });
}

function matchesLevel(campaign: OfficialCampaign, level: LevelFilter | null): boolean {
  if (level === null) return true;

  const recommended = campaign.playerLevelCount[0];

  if (level === 'more') return recommended > 12;

  return recommended === level;
}

function matchesDifficulty(
  campaign: OfficialCampaign,
  difficulty: CampaignFilterParams['difficulty']
): boolean {
  if (difficulty === null) return true;

  return campaignDifficulty(campaign) === difficulty;
}

function matchesPlayers(campaign: OfficialCampaign, players: PlayerFilter | null): boolean {
  if (players === null) return true;

  const range = partyRange(campaign);

  if (!range) return true;

  if (players === 'more') return range.playersMax > 6;

  return players >= range.playersMin && players <= range.playersMax;
}

function matchesTime(campaign: OfficialCampaign, time: TimeFilter | null): boolean {
  if (time === null) return true;

  const hours = durationHours(campaign);

  if (hours === null) return true;

  if (time === 'over') return hours > 80;

  const option = TIME_OPTIONS.find((item) => item.id === time);

  if (!option || option.minutes === null) return true;

  return hours * 60 <= option.minutes;
}

function partyRange(campaign: OfficialCampaign): PartyRange | null {
  if (!('playersMin' in campaign) || !('playersMax' in campaign)) return null;

  const record = campaign as OfficialCampaign & Partial<PartyRange>;

  if (typeof record.playersMin !== 'number' || typeof record.playersMax !== 'number') return null;

  return { playersMin: record.playersMin, playersMax: record.playersMax };
}

function durationHours(campaign: OfficialCampaign): number | null {
  if (!('hours' in campaign)) return null;

  const hours = (campaign as OfficialCampaign & { hours?: unknown }).hours;

  return typeof hours === 'number' ? hours : null;
}
