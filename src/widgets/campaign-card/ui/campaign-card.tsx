import type { OfficialCampaign } from '@/entities/campaign';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ScrollArea } from '@/shared/ui/scroll-area';

interface CampaignCardProps {
  campaign: OfficialCampaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
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
          <CardTitle className="text-lg">{campaign.cardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2 p-0">
          <p className="text-sm">
            <strong>Уровни игроков:</strong> {minLevel} – {maxLevel}
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-sm font-medium">Настроение:</span>
            {campaign.compaignMood.map((mood) => (
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
