import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card, PageTitle } from '@/shared/ui';
import { MasterCampaignList } from './master-campaign-list';
import styles from './master-home-page.module.css';

export function MasterHomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <PageTitle>{t('masterHome.title')}</PageTitle>

      <div className={styles.layout}>
        <MasterCampaignList />

        <div className={styles.sidebar}>
          <Card>
            <Card.Header>
              <h2 className={styles.cardTitle}>{t('masterHome.archives')}</h2>
            </Card.Header>
            <Card.Content className={styles.archiveLinks}>
              <Button variant="outline" onPress={() => navigate('/master/spells')}>
                <span aria-hidden="true">📜</span> {t('masterHome.spells')}
              </Button>
              <Button variant="outline" onPress={() => navigate('/master/npcs')}>
                <span aria-hidden="true">👹</span> {t('masterHome.npcs')}
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </main>
  );
}
