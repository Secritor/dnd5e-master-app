import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui';
import { SpellsTable } from './spells-table';
import styles from './spells-archive-page.module.css';

export function SpellsArchivePage() {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <PageTitle>{t('archive.spellsTitle')}</PageTitle>
      <div className={styles.table}>
        <SpellsTable />
      </div>
    </main>
  );
}
