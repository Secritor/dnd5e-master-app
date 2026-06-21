import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { MasterCampaignList } from '@/widgets/master-campaign-list/ui/master-campaign-list';
import { InitiativeTracker } from '@/widgets/initiative-tracker/ui/initiative-tracker';

export function MasterHomePage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">{t('masterHome.title')}</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <MasterCampaignList />

        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('masterHome.archives')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <Link to="/master/spells">📜 {t('masterHome.spells')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/master/npcs">👹 {t('masterHome.npcs')}</Link>
              </Button>
            </CardContent>
          </Card>

          <InitiativeTracker />
        </div>
      </div>
    </main>
  );
}
