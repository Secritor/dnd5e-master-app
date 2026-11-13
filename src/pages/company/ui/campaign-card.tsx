import { useTranslation } from 'react-i18next';

import { campaignDifficulty, type OfficialCampaign } from '@/entities/campaign';
import { cn } from '@/shared/lib';

import { ClockIcon, CoverPlaceholder, PlayersIcon, StarIcon } from './catalog-icons';

import styles from './campaign-card.module.css';

interface CampaignCardProps {
  campaign: OfficialCampaign;
  stars: number;
  onToggleStar: (id: string) => void;
}

export function CampaignCard({ campaign, stars, onToggleStar }: CampaignCardProps) {
  const { t } = useTranslation();
  const difficulty = campaignDifficulty(campaign);

  return (
    <article className={styles.card}>
      <CampaignCover campaign={campaign} stars={stars} onToggleStar={onToggleStar} />
      <div className={styles.body}>
        <h2 className={styles.title}>{campaign.cardTitle}</h2>
        <p className={styles.source}>{t('catalog.edition')}</p>
        <p className={styles.description}>{campaign.description}</p>
        <div className={styles.chips}>
          <span className={styles.chip}>
            <PlayersIcon />
            {t('catalog.playersFallback')}
          </span>
          <span className={styles.chip}>
            {t('catalog.level', { level: campaign.playerLevelCount[0] })}
          </span>
          <span className={cn(styles.chip, styles[difficulty])}>{t(`catalog.${difficulty}`)}</span>
          <span className={styles.chip}>
            <ClockIcon />
            {t('catalog.timeUnknown')}
          </span>
        </div>
      </div>
    </article>
  );
}

function CampaignCover({ campaign, stars, onToggleStar }: CampaignCardProps) {
  const { t } = useTranslation();
  const starred = stars > 0;
  const hasCover = campaign.thumbnailImage.length > 0;

  return (
    <div className={styles.cover}>
      {hasCover ? (
        <img src={campaign.thumbnailImage} alt="" />
      ) : (
        <>
          <CoverPlaceholder />
          <span className={styles.coverLabel}>{t('catalog.coverPlaceholder')}</span>
        </>
      )}
      <span className={styles.badge}>{t('catalog.official')}</span>
      <button
        type="button"
        className={cn(styles.star, starred && styles.starOn)}
        aria-pressed={starred}
        aria-label={starred ? t('catalog.unstar') : t('catalog.star')}
        onClick={() => onToggleStar(campaign.id)}
      >
        <StarIcon filled={starred} />
        {stars.toLocaleString('ru-RU')}
      </button>
    </div>
  );
}
