import { SpellsTable } from '@/widgets/spells-table/ui/spells-table';

export function SpellsArchivePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Spells Archive</h1>
      <SpellsTable />
    </main>
  );
}
