'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface DataTableContextProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  rowsCount: number | null;
  setRowsCount: Dispatch<SetStateAction<number | null>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  pagesCount: number | null;
  setPagesCount: Dispatch<SetStateAction<number | null>>;
}

export const DataTableContext = createContext({} as DataTableContextProps);

interface DataTableProviderProps {
  children: ReactNode;
}

export function DataTableProvider({ children }: DataTableProviderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsCount, setRowsCount] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [pagesCount, setPagesCount] = useState<number | null>(null);

  return (
    <DataTableContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        rowsCount,
        setRowsCount,
        pageSize,
        setPageSize,
        pagesCount,
        setPagesCount,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
