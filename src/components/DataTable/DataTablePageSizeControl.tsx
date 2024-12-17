'use client';
import { useCallback, useContext } from 'react';
import { DataTableContext } from './DataTableContext';

const pageSizes = [5, 10, 25, 50];

type PageSize = 5 | 10 | 25 | 50;

interface PageSizeControlProps {
  pageSize?: PageSize;
}

export function DataTablePageSizeControl({
  pageSize = 10,
}: PageSizeControlProps) {
  const { setPageSize } = useContext(DataTableContext);

  const handleChangePageSize = useCallback(
    (size: 5 | 10 | 25 | 50) => {
      setPageSize(size);
    },
    [setPageSize],
  );

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
      <div>Tamanho da página</div>
      <div>
        <select
          className="bg-transparent"
          defaultValue={pageSize}
          onChange={(e) => {
            handleChangePageSize(Number(e.target.value) as PageSize);
          }}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
