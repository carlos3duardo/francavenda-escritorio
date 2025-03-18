'use client';
import { ReactNode, useCallback, useContext } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { DataTableContext } from './DataTableContext';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ children, disabled = false, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="h-8 w-8 flex items-center justify-center border-l border-l-slate-300 dark:border-l-slate-500 first:border-l-0 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-500 active:bg-slate-200 disabled:text-slate-300 dark:disabled:text-slate-500"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export function DataTablePagination() {
  const { currentPage, handleSetCurrentPage, pagesCount } =
    useContext(DataTableContext);

  const handleChangeCurrentPage = useCallback(
    (page: number) => {
      handleSetCurrentPage(page);
    },
    [handleSetCurrentPage],
  );

  return (
    <div className="flex border rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-500 overflow-hidden">
      <Button
        onClick={() => handleChangeCurrentPage(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft size={18} />
      </Button>
      <Button
        onClick={() => handleChangeCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </Button>
      <Button
        onClick={() => handleChangeCurrentPage(currentPage + 1)}
        disabled={currentPage === pagesCount}
      >
        <ChevronRight size={18} />
      </Button>
      <Button
        onClick={() =>
          pagesCount ? handleChangeCurrentPage(pagesCount) : null
        }
        disabled={currentPage === pagesCount}
      >
        <ChevronsRight size={18} />
      </Button>
    </div>
  );
}
