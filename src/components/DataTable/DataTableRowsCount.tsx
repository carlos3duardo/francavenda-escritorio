import { useContext } from 'react';
import { DataTableContext } from './DataTableContext';

export function DataTableRowsCount() {
  const { rowsCount } = useContext(DataTableContext);

  return (
    <span className="text-sm font-semibold text-slate-400">
      {rowsCount === null
        ? '...'
        : rowsCount === 0
          ? 'Nenhum registro encontrado'
          : rowsCount === 1
            ? '1 registro encontrado'
            : `${rowsCount} registros encontrados`}
    </span>
  );
}
