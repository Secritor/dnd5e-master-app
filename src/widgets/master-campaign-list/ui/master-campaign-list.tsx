import { useTranslation } from 'react-i18next';
import { useCampaignStore } from '@/entities/campaign/model/campaign-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { CreateCampaignForm } from '@/features/create-campaign';

export function MasterCampaignList() {
  const { t } = useTranslation();
  const campaigns = useCampaignStore((s) => s.campaigns);
  const selectCampaign = useCampaignStore((s) => s.selectCampaign);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('masterHome.campaigns')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="flex flex-col gap-2">
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <button
                type="button"
                onClick={() => selectCampaign(campaign.id)}
                className="w-full rounded-md border border-border px-4 py-2.5 text-left transition-colors hover:bg-secondary"
              >
                {campaign.name}
              </button>
            </li>
          ))}
          {campaigns.length === 0 && (
            <li className="text-sm text-muted-foreground">{t('campaignList.empty')}</li>
          )}
        </ul>
        <CreateCampaignForm />
      </CardContent>
    </Card>
  );
}
