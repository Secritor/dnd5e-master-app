import { useMemo } from 'react';
import { useOfficialCampaigns } from '@/entities/campaign/model/use-official-campaigns';
import { filterOfficialCampaigns } from '@/features/campaign-filters/lib/filter-campaigns';
import { useCampaignFiltersStore } from '@/features/campaign-filters/model/use-campaign-filters';
import { CampaignCard } from '@/widgets/campaign-card/ui/campaign-card';
import { CampaignCardSkeleton } from '@/widgets/campaign-card/ui/campaign-card-skeleton';

export function CampaignBoard() {
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
        {Array.from({ length: 4 }).map((_, i) => (
          <CampaignCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-destructive">Не удалось загрузить кампании</p>;
  }

  if (filtered.length === 0) {
    return <p className="text-muted-foreground">Ничего не найдено</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {filtered.map((campaign) => (
        <CampaignCard key={campaign.cardTitle} campaign={campaign} />
      ))}
    </div>
  );
}
