import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui';
import styles from './archive-placeholder-page.module.css';

interface ArchivePlaceholderPageProps {
  titleKey: string;
}

export function ArchivePlaceholderPage({ titleKey }: ArchivePlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <PageTitle>{t(titleKey)}</PageTitle>
      <p className={styles.note}>{t('common.inDevelopment')}</p>
    </main>
  );
}
