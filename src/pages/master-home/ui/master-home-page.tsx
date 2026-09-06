import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle, PageTitle } from '@/shared/ui';
import { MasterCampaignList } from './master-campaign-list';
import styles from './master-home-page.module.css';

export function MasterHomePage() {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <PageTitle>{t('masterHome.title')}</PageTitle>

      <div className={styles.layout}>
        <MasterCampaignList />

        <div className={styles.sidebar}>
          <Card>
            <CardHeader>
              <CardTitle as="h2">{t('masterHome.archives')}</CardTitle>
            </CardHeader>
            <CardContent className={styles.archiveLinks}>
              <Button variant="outline" asChild>
                <Link to="/master/spells">
                  <span aria-hidden="true">📜</span> {t('masterHome.spells')}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/master/npcs">
                  <span aria-hidden="true">👹</span> {t('masterHome.npcs')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
