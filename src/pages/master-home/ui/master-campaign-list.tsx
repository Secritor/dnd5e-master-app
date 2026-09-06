import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { useMasterCampaignStore } from '../model/master-campaign-store';
import { CreateCampaignForm } from './create-campaign-form';
import styles from './master-campaign-list.module.css';

export function MasterCampaignList() {
  const { t } = useTranslation();
  const campaigns = useMasterCampaignStore((s) => s.campaigns);
  const selectCampaign = useMasterCampaignStore((s) => s.selectCampaign);

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">{t('masterHome.campaigns')}</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <ul className={styles.list}>
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <button
                type="button"
                onClick={() => selectCampaign(campaign.id)}
                className={styles.item}
              >
                {campaign.name}
              </button>
            </li>
          ))}
          {campaigns.length === 0 && <li className={styles.empty}>{t('campaignList.empty')}</li>}
        </ul>
        <CreateCampaignForm />
      </CardContent>
    </Card>
  );
}
