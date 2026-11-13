import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type OfficialCampaign, useOfficialCampaigns } from '@/entities/campaign';

import { filterOfficialCampaigns } from '../lib/filter-campaigns';
import { useCampaignFiltersStore } from '../model/campaign-filters-store';
import { CampaignBoard } from './campaign-board';
import { CatalogFilterBar } from './campaign-filters';
import { CatalogFooter } from './catalog-footer';
import { CatalogTabs } from './catalog-tabs';

import styles from './company-page.module.css';

const PAGE_SIZE = 6;

export function CompanyPage() {
  const { t } = useTranslation();
  const catalog = useCatalogCampaigns();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>{t('catalog.title')}</h1>
          <p>{t('catalog.lead')}</p>
        </div>
        <CatalogTabs onSourceChange={catalog.resetPortion} />
        <CatalogFilterBar onReset={catalog.resetPortion} />
        {!catalog.isLoading && !catalog.isError && (
          <p className={styles.found}>
            {t('catalog.found', { count: String(catalog.filtered.length) })}
          </p>
        )}
        <CampaignBoard
          isLoading={catalog.isLoading}
          isError={catalog.isError}
          campaigns={catalog.filtered.slice(0, catalog.visibleCount)}
          total={catalog.filtered.length}
          stars={catalog.stars}
          onToggleStar={catalog.toggleStar}
          onShowMore={catalog.showMore}
          onResetFilters={catalog.resetEmpty}
        />
      </main>
      <CatalogFooter />
    </>
  );
}

function useCatalogCampaigns() {
  const [stars, setStars] = useState<Record<string, number>>({});
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const source = useCampaignFiltersStore((state) => state.source);
  const searchQuery = useCampaignFiltersStore((state) => state.searchQuery);
  const popular = useCampaignFiltersStore((state) => state.popular);
  const players = useCampaignFiltersStore((state) => state.players);
  const level = useCampaignFiltersStore((state) => state.level);
  const time = useCampaignFiltersStore((state) => state.time);
  const difficulty = useCampaignFiltersStore((state) => state.difficulty);
  const resetAll = useCampaignFiltersStore((state) => state.resetAll);
  const { data, isLoading, isError } = useOfficialCampaigns();

  const filtered = useMemo(
    () =>
      sortByStars(
        filterOfficialCampaigns(data ?? [], {
          source,
          searchQuery,
          players,
          level,
          time,
          difficulty,
        }),
        stars,
        popular
      ),
    [data, source, searchQuery, players, level, time, difficulty, stars, popular]
  );

  const resetPortion = () => setVisibleCount(PAGE_SIZE);

  return {
    filtered,
    isLoading,
    isError,
    stars,
    visibleCount,
    toggleStar: (id: string) =>
      setStars((current) => ({
        ...current,
        [id]: (current[id] ?? 0) === 0 ? 1 : 0,
      })),
    showMore: () => setVisibleCount((count) => count + PAGE_SIZE),
    resetPortion,
    resetEmpty: () => {
      resetAll();
      resetPortion();
    },
  };
}

function sortByStars(
  campaigns: OfficialCampaign[],
  stars: Record<string, number>,
  popular: boolean
): OfficialCampaign[] {
  if (!popular) return campaigns;

  return [...campaigns].sort((left, right) => (stars[right.id] ?? 0) - (stars[left.id] ?? 0));
}
