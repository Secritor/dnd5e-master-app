import { useTranslation } from 'react-i18next';
import { Card, Chip, ScrollArea } from '@/shared/ui';
import type { OfficialCampaign } from '../model/official-campaign';
import styles from './campaign-card.module.css';

interface CampaignCardProps {
  campaign: OfficialCampaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t } = useTranslation();
  const [minLevel, maxLevel] = campaign.playerLevelCount;

  return (
    <Card className={styles.card}>
      <img src={campaign.thumbnailImage} alt={campaign.cardTitle} className={styles.image} />
      <div className={styles.body}>
        <Card.Header className={styles.header}>
          <Card.Title className={styles.title}>{campaign.cardTitle}</Card.Title>
        </Card.Header>
        <Card.Content className={styles.content}>
          <p className={styles.levels}>
            <strong>{t('campaignCard.playerLevels')}:</strong> {minLevel} – {maxLevel}
          </p>
          <div className={styles.moodRow}>
            <span className={styles.moodLabel}>{t('campaignCard.mood')}:</span>
            {campaign.campaignMood.map((mood) => (
              <Chip key={mood} size="sm" variant="soft">
                {mood}
              </Chip>
            ))}
          </div>
          <ScrollArea className={styles.descriptionScroll}>
            <p className={styles.descriptionText}>{campaign.description}</p>
          </ScrollArea>
        </Card.Content>
      </div>
    </Card>
  );
}
