import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LanguageSwitcher } from '@/features/language-switcher';
import { MasterAuthModal, useSessionStore } from '@/features/master-auth';
import { Button } from '@/shared/ui';

import styles from './mode-select-page.module.css';

const SECTIONS = [
  { to: '/company', labelKey: 'home.campaigns' },
  { to: '/master/spells', labelKey: 'home.spells' },
  { to: '/master/npcs', labelKey: 'home.characters' },
  { to: '/master/items', labelKey: 'home.items' },
] as const;

type AuthView = 'login' | 'register';

export function ModeSelectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const signOut = useSessionStore((state) => state.signOut);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');

  const openAuth = (view: AuthView) => {
    setAuthView(view);
    setAuthOpen(true);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.brand}>{t('home.brand')}</p>
        <nav className={styles.nav} aria-label={t('home.nav')}>
          {isAuthenticated ? (
            <>
              {SECTIONS.map((section) => (
                <Button key={section.to} variant="ghost" onPress={() => navigate(section.to)}>
                  {t(section.labelKey)}
                </Button>
              ))}
              <Button variant="outline" onPress={signOut}>
                {t('home.signOut')}
              </Button>
            </>
          ) : (
            <>
              <Button onPress={() => openAuth('login')}>{t('home.signIn')}</Button>
              <Button variant="outline" onPress={() => openAuth('register')}>
                {t('home.register')}
              </Button>
            </>
          )}
          <LanguageSwitcher placement="inline" />
        </nav>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.description}>{t('home.description')}</p>
      </section>

      <MasterAuthModal open={authOpen} onOpenChange={setAuthOpen} initialView={authView} />
    </main>
  );
}
