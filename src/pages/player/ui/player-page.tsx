import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui';
import styles from './player-page.module.css';

export function PlayerPage() {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <PageTitle>{t('player.title')}</PageTitle>
      <p className={styles.note}>{t('common.inDevelopment')}</p>
    </main>
  );
}
