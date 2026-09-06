import { useTranslation } from 'react-i18next';
import { Badge, Card, CardContent, CardHeader, CardTitle, ScrollArea } from '@/shared/ui';
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
        <CardHeader className={styles.header}>
          <CardTitle as="h3" className={styles.title}>
            {campaign.cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.content}>
          <p className={styles.levels}>
            <strong>{t('campaignCard.playerLevels')}:</strong> {minLevel} – {maxLevel}
          </p>
          <div className={styles.moodRow}>
            <span className={styles.moodLabel}>{t('campaignCard.mood')}:</span>
            {campaign.campaignMood.map((mood) => (
              <Badge key={mood} variant="outline">
                {mood}
              </Badge>
            ))}
          </div>
          <ScrollArea className={styles.descriptionScroll}>
            <p className={styles.descriptionText}>{campaign.description}</p>
          </ScrollArea>
        </CardContent>
      </div>
    </Card>
  );
}
