import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useOpenMasterAuth, useSessionStore } from '@/features/master-auth';

import styles from './home-paths.module.css';

export function HomePaths() {
  const { t } = useTranslation();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const openAuth = useOpenMasterAuth();

  return (
    <section className={styles.section} aria-labelledby="home-paths-title">
      <div className={styles.inner}>
        <h2 id="home-paths-title" className={styles.title}>
          {t('home.pathsTitle')}
        </h2>
        <div className={styles.grid}>
          <PathCard
            to="/character"
            icon={<CharacterIcon />}
            title={t('chrome.character')}
            text={t('home.pathCharacterText')}
            link={t('home.pathCharacterLink')}
          />
          <PathCard
            to="/company"
            icon={<CampaignsIcon />}
            title={t('chrome.campaigns')}
            text={t('home.pathCampaignsText')}
            link={t('home.pathCampaignsLink')}
          />
          <PathCard
            to={isAuthenticated ? '/master' : undefined}
            onPress={isAuthenticated ? undefined : openAuth}
            icon={<MasterIcon />}
            title={t('chrome.master')}
            text={t('home.pathMasterText')}
            link={t('home.pathMasterLink')}
            badge={t('home.signInNeeded')}
          />
        </div>
      </div>
    </section>
  );
}

interface PathCardProps {
  to?: string;
  onPress?: () => void;
  icon: ReactNode;
  title: string;
  text: string;
  link: string;
  badge?: string;
}

function PathCard({ to, onPress, icon, title, text, link, badge }: PathCardProps) {
  const content = (
    <>
      <div className={styles.cardTop}>
        {icon}
        {badge ? <span className={styles.badge}>{badge}</span> : null}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
      <span className={styles.cardLink}>{link}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.card} onClick={onPress}>
      {content}
    </button>
  );
}

function CharacterIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="#D9A35B"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="8" y="5" width="24" height="30" rx="3" />
      <path d="M14 13h12M14 19h12M14 25h7" />
    </svg>
  );
}

function CampaignsIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="#D9A35B"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 9l10-4 10 4 10-4v26l-10 4-10-4-10 4z" />
      <path d="M15 5v26M25 9v26" />
    </svg>
  );
}

function MasterIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="#D9A35B"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6 30l3-17 7 7 4-11 4 11 7-7 3 17z" />
      <path d="M6 34h28" />
    </svg>
  );
}
