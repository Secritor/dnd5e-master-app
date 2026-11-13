import { useTranslation } from 'react-i18next';

import { i18n } from '@/shared/config';
import { cn } from '@/shared/lib';

import styles from './language-switcher.module.css';

const LANGUAGES = [
  { code: 'ru', label: 'Ру' },
  { code: 'en', label: 'En' },
] as const;

interface LanguageSwitcherProps {
  placement?: 'fixed' | 'inline';
}

export function LanguageSwitcher({ placement = 'fixed' }: LanguageSwitcherProps) {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language;

  return (
    <div className={cn(styles.switcher, placement === 'inline' && styles.switcherInline)}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => void i18n.changeLanguage(code)}
          className={cn(
            styles.button,
            current === code ? styles.buttonActive : styles.buttonInactive
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
