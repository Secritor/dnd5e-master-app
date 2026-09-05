import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOfficialCampaigns } from '../model/use-official-campaigns';
import { useCampaignFiltersStore } from '../model/campaign-filters-store';
import { filterOfficialCampaigns } from '../lib/filter-campaigns';
import { CampaignCard } from './campaign-card';
import { CampaignCardSkeleton } from './campaign-card-skeleton';

const SKELETON_COUNT = 4;

export function CampaignBoard() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useOfficialCampaigns();
  const searchQuery = useCampaignFiltersStore((s) => s.searchQuery);
  const selectedMoods = useCampaignFiltersStore((s) => s.selectedMoods);
  const minLevel = useCampaignFiltersStore((s) => s.minLevel);
  const maxLevel = useCampaignFiltersStore((s) => s.maxLevel);

  const filtered = useMemo(() => {
    if (!data) return [];
    return filterOfficialCampaigns(data, { searchQuery, selectedMoods, minLevel, maxLevel });
  }, [data, searchQuery, selectedMoods, minLevel, maxLevel]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <CampaignCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-destructive">{t('campaignBoard.loadError')}</p>;
  }

  if (filtered.length === 0) {
    return <p className="text-muted-foreground">{t('campaignBoard.empty')}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {filtered.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
