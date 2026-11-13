import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useOpenMasterAuth, useSessionStore } from '@/features/master-auth';

import styles from './catalog-footer.module.css';

export function CatalogFooter() {
  const { t } = useTranslation();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const openAuth = useOpenMasterAuth();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.disclaimer}>{t('chrome.disclaimer')}</p>
        <nav className={styles.nav} aria-label={t('chrome.footerNav')}>
          <Link className={styles.link} to="/character">
            {t('chrome.character')}
          </Link>
          <Link className={styles.link} to="/company">
            {t('chrome.campaigns')}
          </Link>
          {isAuthenticated ? (
            <Link className={styles.link} to="/master">
              {t('chrome.master')}
            </Link>
          ) : (
            <button type="button" className={styles.link} onClick={openAuth}>
              {t('chrome.master')}
            </button>
          )}
        </nav>
      </div>
    </footer>
  );
}
