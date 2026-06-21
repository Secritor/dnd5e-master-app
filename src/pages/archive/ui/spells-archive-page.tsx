import { useTranslation } from 'react-i18next';
import { SpellsTable } from '@/widgets/spells-table/ui/spells-table';
import { PageTitle } from '@/shared/ui/page-title';

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
