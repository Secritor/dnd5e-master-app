import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { fetchSpells, type Spell } from '@/entities/spell';

const columnHelper = createColumnHelper<Spell>();

export function SpellsTable() {
  const { t } = useTranslation();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['spells'],
    queryFn: fetchSpells,
  });

  const columns = [
    columnHelper.accessor('name', { header: t('archive.colName') }),
    columnHelper.accessor('level', { header: t('archive.colLevel') }),
    columnHelper.accessor('school', { header: t('archive.colSchool') }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-muted-foreground">{t('common.loading')}</p>;
  if (isError) return <p className="text-destructive">{t('archive.errorSpells')}</p>;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left font-medium">
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
