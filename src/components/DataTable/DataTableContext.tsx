'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface DataTableContextProps {
  currentPage: number;
  handleSetCurrentPage: (page: number) => void;
  rowsCount: number | null;
  setRowsCount: Dispatch<SetStateAction<number | null>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  pagesCount: number | null;
  setPagesCount: Dispatch<SetStateAction<number | null>>;
  search: string | null | undefined;
  handleSetSearch: (q: string) => void;
}

export const DataTableContext = createContext({} as DataTableContextProps);

interface DataTableProviderProps {
  children: ReactNode;
}

export function DataTableProvider({ children }: DataTableProviderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [rowsCount, setRowsCount] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [pagesCount, setPagesCount] = useState<number | null>(null);
  const [search, setSearch] = useState(searchParams.get('q') || '');

  const updateUrl = useCallback(
    (newPage: number, newPageSize: number, newSearch: string) => {
      const params = new URLSearchParams();
      if (newPage > 1) params.set('page', String(newPage));
      if (newPageSize !== 10) params.set('pageSize', String(newPageSize));
      if (newSearch) params.set('search', search);

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, search],
  );

  const handleSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSetSearch = useCallback((q: string) => {
    setSearch(q);
  }, []);

  useEffect(() => {
    updateUrl(currentPage, pageSize, search);
  }, [currentPage, pageSize, search, updateUrl]);

  return (
    <DataTableContext.Provider
      value={{
        currentPage,
        handleSetCurrentPage,
        rowsCount,
        setRowsCount,
        pageSize,
        setPageSize,
        pagesCount,
        setPagesCount,
        search,
        handleSetSearch,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
