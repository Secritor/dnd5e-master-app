import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { LanguageSwitcher } from '@/features/language-switcher';
import { MasterAuthModal, OpenAuthProvider, useSessionStore } from '@/features/master-auth';

import styles from './public-layout.module.css';

interface ChromeProps {
  isAuthenticated: boolean;
  onMaster: () => void;
}

export function PublicLayout() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const [authOpen, setAuthOpen] = useState(false);
  const openAuth = () => setAuthOpen(true);

  return (
    <div className={styles.shell}>
      <PublicHeader isAuthenticated={isAuthenticated} onMaster={openAuth} />
      <OpenAuthProvider openAuth={openAuth}>
        <Outlet />
      </OpenAuthProvider>
      <MasterAuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}

function PublicHeader({ isAuthenticated, onMaster }: ChromeProps) {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <Link className={styles.brand} to="/">
          <LogoMark />
          <span className={styles.brandName}>{t('chrome.brand')}</span>
        </Link>
        <div className={styles.headerTools}>
          <PublicNav isAuthenticated={isAuthenticated} onMaster={onMaster} />
          <LanguageSwitcher placement="inline" />
          <AccountLink isAuthenticated={isAuthenticated} onSignIn={onMaster} />
        </div>
      </div>
    </header>
  );
}

function PublicNav({ isAuthenticated, onMaster }: ChromeProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav} aria-label={t('chrome.nav')}>
      <Link className={styles.navLink} to="/character">
        {t('chrome.character')}
      </Link>
      <Link
        className={styles.navLink}
        to="/company"
        aria-current={pathname === '/company' ? 'page' : undefined}
      >
        {t('chrome.campaigns')}
      </Link>
      {isAuthenticated ? (
        <Link className={styles.navLink} to="/master">
          <LockIcon />
          {t('chrome.master')}
        </Link>
      ) : (
        <button type="button" className={styles.navLink} onClick={onMaster}>
          <LockIcon />
          {t('chrome.master')}
        </button>
      )}
    </nav>
  );
}

function AccountLink({
  isAuthenticated,
  onSignIn,
}: {
  isAuthenticated: boolean;
  onSignIn: () => void;
}) {
  const { t } = useTranslation();

  if (isAuthenticated) {
    return (
      <Link className={styles.signIn} to="/master">
        {t('chrome.workshop')}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.signIn} onClick={onSignIn}>
      {t('chrome.signIn')}
    </button>
  );
}

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="#D9A35B"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M14 2 25 8.5v11L14 26 3 19.5v-11z" />
      <path d="M14 7 20 18H8z" />
      <path d="M14 2v5M25 8.5 20 18M3 8.5 8 18M14 26l-6-8M14 26l6-8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#A89C8A"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
