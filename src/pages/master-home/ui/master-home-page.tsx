import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ScrollText, Users, Library, Sparkles } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { MasterCampaignList } from '@/widgets/master-campaign-list/ui/master-campaign-list';

const TOOLS = [
  { Icon: Users,       labelKey: 'masterHome.npcs',    route: '/master/npcs'   },
  { Icon: ScrollText,  labelKey: 'masterHome.spells',  route: '/master/spells' },
  { Icon: Library,     labelKey: 'masterHome.archives', route: '#'             },
  { Icon: Sparkles,    labelKey: 'masterHome.tools',   route: '#'              },
] as const;

export function MasterHomePage() {
  const { t } = useTranslation();

  return (
    <main className="dnd-dash">
      <header className="dnd-dash__head">
        <div>
          <p className="dnd-dash__eyebrow">{t('masterHome.welcome')}</p>
          <h1 className="dnd-dash__title">{t('masterHome.title')}</h1>
        </div>
      </header>

      <div className="dnd-dash__cols">
        <MasterCampaignList />

        <aside className="dnd-dash__side">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3">
                {t('masterHome.tools')}
              </p>
              <div className="dnd-tools">
                {TOOLS.map(({ Icon, labelKey, route }) => (
                  <Link key={labelKey} to={route} className="dnd-tool">
                    <span className="dnd-tool__icon">
                      <Icon size={22} />
                    </span>
                    <span className="dnd-tool__label">{t(labelKey)}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dnd-archcard">
            <p className="dnd-archcard__title">{t('masterHome.archives')}</p>
            <p className="dnd-archcard__desc font-body text-sm text-muted-foreground">
              {t('common.inDevelopment')}
            </p>
            <div className="dnd-archcard__btns">
              <Button variant="outline" size="sm" asChild>
                <Link to="/master/spells">📜 {t('masterHome.spells')}</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/master/npcs">👹 {t('masterHome.npcs')}</Link>
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
