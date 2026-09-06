import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib';
import { i18n } from '@/shared/config';
import styles from './language-switcher.module.css';

const LANGUAGES = [
  { code: 'ru', label: 'Ру' },
  { code: 'en', label: 'En' },
] as const;

export function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language;

  return (
    <div className={styles.switcher}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => void i18n.changeLanguage(code)}
          className={cn(styles.button, current === code ? styles.buttonActive : styles.buttonInactive)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
