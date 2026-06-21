import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Shield, Crown, BookOpen, ChevronRight } from 'lucide-react';
import { MasterAuthModal } from '@/features/master-auth';

const MODES = [
  { id: 'player',  Icon: Shield,   route: '/player',  primary: false },
  { id: 'master',  Icon: Crown,    route: null,        primary: true  },
  { id: 'company', Icon: BookOpen, route: '/company', primary: false },
] as const;

export function ModeSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <main className="dnd-mode">
      <div className="dnd-mode__inner">
        <p className="dnd-mode__eyebrow">D&amp;D COMPENDIUM</p>
        <h1 className="dnd-mode__title">{t('modeSelect.title')}</h1>
        <p className="dnd-mode__lede">{t('modeSelect.lede')}</p>

        <div className="dnd-mode__grid">
          {MODES.map(({ id, Icon, route, primary }) => (
            <button
              key={id}
              type="button"
              className={`dnd-mode__card${primary ? ' is-primary' : ''}`}
              onClick={() => {
                if (id === 'master') setAuthOpen(true);
                else if (route) navigate(route);
              }}
            >
              <span className="dnd-mode__icon">
                <Icon size={30} />
              </span>
              <span className="dnd-mode__name">
                {t(`modeSelect.${id === 'company' ? 'company' : id === 'player' ? 'playerRole' : 'masterRole'}`)}
              </span>
              <span className="dnd-mode__desc">
                {t(`modeSelect.${id}Desc`)}
              </span>
              <span className="dnd-mode__enter">
                {t('modeSelect.enter')} <ChevronRight size={14} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <MasterAuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </main>
  );
}
