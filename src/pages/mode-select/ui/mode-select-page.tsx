import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { i18n } from '@/shared/config/i18n';

export function ModeSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setLanguage = (lang: 'ru' | 'en') => {
    void i18n.changeLanguage(lang);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <svg width="1000" height="320" viewBox="0 0 1000 420" className="max-w-full pointer-events-none">
        <defs>
          <path id="curve" d="M 10 250 Q 480 140 1000 250" />
        </defs>
        <text className="fill-dnd-gold font-display text-[48px] font-bold tracking-widest drop-shadow-lg">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            {t('modeSelect.title')}
          </textPath>
        </text>
      </svg>

      <div className="flex flex-wrap justify-center gap-6">
        <Button variant="outline" size="lg" onClick={() => navigate('/player')}>
          {t('modeSelect.playerRole')}
        </Button>
        <Button size="lg" onClick={() => navigate('/master/auth')}>
          {t('modeSelect.masterRole')}
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/company')}>
          {t('modeSelect.company')}
        </Button>
      </div>

      <select
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        defaultValue={i18n.language}
        onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
      >
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </main>
  );
}
