'use client';

import { useContext } from 'react';
import { DataTableContext } from './DataTableContext';

export function DataTablePageCount() {
  const { pagesCount, currentPage } = useContext(DataTableContext);
  return (
    <div className="text-sm font-semibold text-slate-400">
      {pagesCount || currentPage ? (
        <>
          Página {currentPage} de {pagesCount || 'N'}
        </>
      ) : (
        ''
      )}
    </div>
  );
}
