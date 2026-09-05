import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { fetchSpells } from '../api/fetch-spells';
import type { Spell } from '../model/spell';
import { spellKeys } from '../model/spell-keys';

const columnHelper = createColumnHelper<Spell>();
const EMPTY: Spell[] = [];

export function SpellsTable() {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: spellKeys.list(),
    queryFn: fetchSpells,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', { header: t('archive.colName') }),
      columnHelper.accessor('level', { header: t('archive.colLevel') }),
      columnHelper.accessor('school', { header: t('archive.colSchool') }),
    ],
    [t]
  );

  const table = useReactTable({
    data: data ?? EMPTY,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-muted-foreground">{t('common.loading')}</p>;
  if (isError) return <p className="text-destructive">{t('archive.errorSpells')}</p>;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">{t('archive.spellsTitle')}</caption>
        <thead className="bg-secondary">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} scope="col" className="px-4 py-3 text-left font-medium">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-border hover:bg-secondary/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
