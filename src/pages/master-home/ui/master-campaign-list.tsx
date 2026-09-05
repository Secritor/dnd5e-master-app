import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { useMasterCampaignStore } from '../model/master-campaign-store';
import { CreateCampaignForm } from './create-campaign-form';

export function MasterCampaignList() {
  const { t } = useTranslation();
  const campaigns = useMasterCampaignStore((s) => s.campaigns);
  const selectCampaign = useMasterCampaignStore((s) => s.selectCampaign);

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">{t('masterHome.campaigns')}</CardTitle>
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
