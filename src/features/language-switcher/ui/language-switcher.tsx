import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/utils';
import { i18n } from '@/shared/config/i18n';

const LANGUAGES = [
  { code: 'ru', label: 'Ру' },
  { code: 'en', label: 'En' },
] as const;

export function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language;

  return (
    <div className="fixed top-4 right-4 z-50 flex overflow-hidden rounded-md border border-border bg-card shadow-md">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => void i18n.changeLanguage(code)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium transition-colors',
            current === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
