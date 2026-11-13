import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { OfficialCampaign } from '@/entities/campaign';
import { cn } from '@/shared/lib';

import { campaignDifficulty } from '../lib/campaign-difficulty';

import styles from './home-campaign-card.module.css';

interface HomeCampaignCardProps {
  campaign: OfficialCampaign;
}

export function HomeCampaignCard({ campaign }: HomeCampaignCardProps) {
  const { t } = useTranslation();
  const difficulty = campaignDifficulty(campaign);
  const hasCover = campaign.thumbnailImage.length > 0;

  return (
    <Link className={styles.card} to="/company">
      <div className={styles.cover}>
        {hasCover ? (
          <img src={campaign.thumbnailImage} alt="" />
        ) : (
          <>
            <CoverPlaceholder />
            <span className={styles.coverLabel}>{t('home.coverPlaceholder')}</span>
          </>
        )}
        <span className={styles.badge}>{t('home.official')}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{campaign.cardTitle}</h3>
        <p className={styles.source}>{t('home.edition')}</p>
        <p className={styles.description}>{campaign.description}</p>
        <div className={styles.chips}>
          <span className={styles.chip}>
            <PlayersIcon />
            {t('home.playersFallback')}
          </span>
          <span className={styles.chip}>
            {t('home.level', { level: campaign.playerLevelCount[0] })}
          </span>
          <span className={cn(styles.chip, styles[difficulty])}>{t(`home.${difficulty}`)}</span>
          <span className={styles.chip}>
            <ClockIcon />
            {t('home.timeUnknown')}
          </span>
        </div>
      </div>
    </Link>
  );
}

function CoverPlaceholder() {
  return (
    <svg
      width="120"
      height="64"
      viewBox="0 0 120 64"
      fill="none"
      stroke="#5A5043"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2 62 38 18l20 24 16-14 44 34z" />
      <circle cx="92" cy="14" r="8" />
    </svg>
  );
}

function PlayersIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#A89C8A"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
      <path d="M11 3a2.5 2.5 0 0 1 0 5M13 9.8c1 .7 1.5 2 1.5 4.2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#A89C8A"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}
