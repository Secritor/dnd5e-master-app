import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/shared/ui';
import { SpellsTable } from './spells-table';

export function SpellsArchivePage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <PageTitle>{t('archive.spellsTitle')}</PageTitle>
      <div className="mt-4">
        <SpellsTable />
      </div>
    </main>
  );
}
