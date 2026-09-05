import { useTranslation } from 'react-i18next';
import { Badge, Card, CardContent, CardHeader, CardTitle, ScrollArea } from '@/shared/ui';
import type { OfficialCampaign } from '../model/official-campaign';

interface CampaignCardProps {
  campaign: OfficialCampaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t } = useTranslation();
  const [minLevel, maxLevel] = campaign.playerLevelCount;

  return (
    <Card className="flex h-[400px] flex-row gap-5 overflow-hidden p-5">
      <img
        src={campaign.thumbnailImage}
        alt={campaign.cardTitle}
        className="max-h-[360px] w-[270px] shrink-0 rounded-2xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <CardHeader className="p-0">
          <CardTitle as="h3" className="text-lg">
            {campaign.cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2 p-0">
          <p className="text-sm">
            <strong>{t('campaignCard.playerLevels')}:</strong> {minLevel} – {maxLevel}
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-sm font-medium">{t('campaignCard.mood')}:</span>
            {campaign.campaignMood.map((mood) => (
              <Badge key={mood} variant="outline">
                {mood}
              </Badge>
            ))}
          </div>
          <ScrollArea className="flex-1 pr-3">
            <p className="text-sm font-light leading-relaxed">{campaign.description}</p>
          </ScrollArea>
        </CardContent>
      </div>
    </Card>
  );
}
