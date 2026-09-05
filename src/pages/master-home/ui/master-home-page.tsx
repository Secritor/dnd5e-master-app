import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle, PageTitle } from '@/shared/ui';
import { MasterCampaignList } from './master-campaign-list';

export function MasterHomePage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen mx-auto max-w-[1400px] flex-col gap-4 p-8">
      <PageTitle>{t('masterHome.title')}</PageTitle>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <MasterCampaignList />

        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle as="h2">{t('masterHome.archives')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
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
