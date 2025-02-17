import { ReactNode } from 'react';

interface PaginationButtonProps {
  children: ReactNode;
  pageNumber: number;
  isDisabled?: boolean;
  isCurrent?: boolean;
  onChangePage: (page: number) => void;
}

export function PaginationButton({
  children,
  pageNumber,
  isCurrent = false,
  isDisabled = false,
  onChangePage,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      data-is-current-page={isCurrent}
      className="h-8 min-w-8 px-2 flex items-center justify-center first:rounded-l-md last:rounded-r-md bg-white dark:bg-slate-900 ring-1 ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 data-[is-current-page=true]:bg-slate-200 dark:data-[is-current-page=true]:bg-slate-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-slate-400 dark:disabled:text-slate-600 "
      onClick={() => onChangePage(pageNumber)}
    >
      {children}
    </button>
  );
}
