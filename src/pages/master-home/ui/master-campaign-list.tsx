import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui';
import { useMasterCampaignStore } from '../model/master-campaign-store';
import { CreateCampaignForm } from './create-campaign-form';
import styles from './master-campaign-list.module.css';

export function MasterCampaignList() {
  const { t } = useTranslation();
  const campaigns = useMasterCampaignStore((s) => s.campaigns);
  const selectCampaign = useMasterCampaignStore((s) => s.selectCampaign);

  return (
    <Card>
      <Card.Header>
        <h2 className={styles.cardTitle}>{t('masterHome.campaigns')}</h2>
      </Card.Header>
      <Card.Content className={styles.content}>
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
      </Card.Content>
    </Card>
  );
}
