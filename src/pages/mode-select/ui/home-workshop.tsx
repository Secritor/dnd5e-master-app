import { useTranslation } from 'react-i18next';

import { useOpenMasterAuth, useSessionStore } from '@/features/master-auth';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './home-workshop.module.css';

const POINTS = [
  'home.workshopPoint1',
  'home.workshopPoint2',
  'home.workshopPoint3',
  'home.workshopPoint4',
] as const;

const NAV_ITEMS = [
  'home.previewActive',
  'chrome.campaigns',
  'home.previewNpcs',
  'home.previewItems',
  'home.previewSpells',
] as const;

const STATS = [
  { label: 'home.previewNpcs', width: 'bar70' },
  { label: 'home.previewItems', width: 'bar60' },
  { label: 'home.previewSpells', width: 'bar80' },
] as const;

export function HomeWorkshop() {
  const { t } = useTranslation();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const openAuth = useOpenMasterAuth();

  return (
    <section className={styles.section} aria-labelledby="home-workshop-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{t('home.forMasters')}</p>
          <h2 id="home-workshop-title" className={styles.title}>
            {t('home.workshopTitle')}
          </h2>
          <ul className={styles.points}>
            {POINTS.map((key) => (
              <li key={key} className={styles.point}>
                <CheckIcon />
                {t(key)}
              </li>
            ))}
          </ul>
          <div className={styles.action}>
            {isAuthenticated ? (
              <Button variant="accent" to="/master">
                {t('home.signInMaster')}
              </Button>
            ) : (
              <Button variant="accent" onPress={openAuth}>
                {t('home.signInMaster')}
              </Button>
            )}
          </div>
        </div>
        <WorkshopPreview />
      </div>
    </section>
  );
}

function WorkshopPreview() {
  const { t } = useTranslation();

  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.previewNav}>
        <p className={styles.previewTitle}>{t('chrome.workshop')}</p>
        <p className={styles.previewCurrent}>{t('home.previewOverview')}</p>
        {NAV_ITEMS.map((key) => (
          <p key={key} className={styles.previewItem}>
            {t(key)}
          </p>
        ))}
      </div>
      <div className={styles.previewMain}>
        <p className={styles.previewHeading}>{t('home.previewActiveCampaigns')}</p>
        <div className={styles.slots}>
          <div className={styles.slot} />
          <div className={styles.slot} />
        </div>
        <div className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <p className={styles.statLabel}>{t(stat.label)}</p>
              <span className={styles.bar} />
              <span className={cn(styles.bar, styles[stat.width])} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className={styles.check}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="#D9A35B"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}
