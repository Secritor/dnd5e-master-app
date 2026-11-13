import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useOfficialCampaigns } from '@/entities/campaign';
import { Button, Skeleton } from '@/shared/ui';

import { HomeCampaignCard } from './home-campaign-card';

import styles from './home-campaigns.module.css';

const PREVIEW_COUNT = 3;

export function HomeCampaigns() {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useOfficialCampaigns();
  const campaigns = data?.slice(0, PREVIEW_COUNT) ?? [];

  return (
    <section className={styles.section} aria-labelledby="home-campaigns-title">
      <div className={styles.head}>
        <div className={styles.intro}>
          <h2 id="home-campaigns-title" className={styles.title}>
            {t('chrome.campaigns')}
          </h2>
          <p className={styles.lead}>{t('home.campaignsLead')}</p>
        </div>
        <Link className={styles.all} to="/company">
          {t('home.allCampaigns')}
        </Link>
      </div>

      {isLoading ? <CampaignSkeletons /> : null}
      {isError ? (
        <div className={styles.status}>
          <p>{t('campaignBoard.loadError')}</p>
          <Button variant="quiet" onPress={() => void refetch()}>
            {t('common.retry')}
          </Button>
        </div>
      ) : null}
      {!isLoading && !isError ? (
        <div className={styles.grid}>
          {campaigns.map((campaign) => (
            <HomeCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function CampaignSkeletons() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: PREVIEW_COUNT }, (_, index) => (
        <div key={index} className={styles.skeleton}>
          <Skeleton className={styles.skeletonCover} />
          <Skeleton className={styles.skeletonBody} />
        </div>
      ))}
    </div>
  );
}
