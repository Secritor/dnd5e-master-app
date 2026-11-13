import { useTranslation } from 'react-i18next';

import type { OfficialCampaign } from '@/entities/campaign';

import { CampaignCard } from './campaign-card';
import { CampaignCardSkeleton } from './campaign-card-skeleton';

import styles from './campaign-board.module.css';

const SKELETON_COUNT = 6;

interface CampaignBoardProps {
  isLoading: boolean;
  isError: boolean;
  campaigns: OfficialCampaign[];
  total: number;
  stars: Record<string, number>;
  onToggleStar: (id: string) => void;
  onShowMore: () => void;
  onResetFilters: () => void;
}

export function CampaignBoard({
  isLoading,
  isError,
  campaigns,
  total,
  stars,
  onToggleStar,
  onShowMore,
  onResetFilters,
}: CampaignBoardProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <CampaignCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) return <p className={styles.error}>{t('campaignBoard.loadError')}</p>;

  if (total === 0) return <EmptyCatalog onReset={onResetFilters} />;

  return (
    <div>
      <div className={styles.grid}>
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            stars={stars[campaign.id] ?? 0}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>
      {total > campaigns.length && (
        <div className={styles.more}>
          <button type="button" className={styles.moreButton} onClick={onShowMore}>
            {t('catalog.showMore')}
          </button>
        </div>
      )}
    </div>
  );
}

function EmptyCatalog({ onReset }: { onReset: () => void }) {
  const { t } = useTranslation();

  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>{t('catalog.emptyTitle')}</p>
      <p className={styles.emptyText}>{t('catalog.emptyText')}</p>
      <button type="button" className={styles.emptyButton} onClick={onReset}>
        {t('catalog.resetFilters')}
      </button>
    </div>
  );
}
