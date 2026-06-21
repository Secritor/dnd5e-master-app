import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { fetchSpells } from '@/entities/spell/api/fetch-spells';
import type { Spell } from '@/entities/spell/model/types';

const columnHelper = createColumnHelper<Spell>();

const columns = [
  columnHelper.accessor('name', { header: 'Название' }),
  columnHelper.accessor('level', { header: 'Уровень' }),
  columnHelper.accessor('school', { header: 'Школа' }),
];

export function SpellsTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['spells'],
    queryFn: fetchSpells,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-muted-foreground">Загрузка...</p>;

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
