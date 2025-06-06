'use client';
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';
import { CircleSlash2 } from 'lucide-react';

import errorIcon from './ext/error.png';
import Image from 'next/image';
import { DataTableContext } from './DataTableContext';

export type ColumnProps = {
  field: string;
  label: string;
  sortable?: boolean;
  thStyles?: CSSProperties;
  thClassName?: string;
  tdStyles?: CSSProperties;
  tdClassName?: string;
  orderable?: boolean;
  content?: (data: string | unknown) => ReactNode;
};

type FilterProps = {
  field: string;
  type: 'radio' | 'checkbox' | 'select';
  options: { label: string; value: string }[];
};

type QueryParams = Record<string, string | number | boolean>;

export interface DataTableProps {
  queryId: string;
  columns: ColumnProps[];
  dataSrc: string;
  pageSize?: number;
  paginationSiblings?: number;
  defaultParams?: QueryParams;
  filter?: FilterProps[];
  emptyTableMessage?: string;
  userCanChangePageSize?: boolean;
}

export function DataTableContent({
  queryId,
  columns,
  dataSrc,
  pageSize = 10,
  emptyTableMessage,
  defaultParams,
  userCanChangePageSize = true,
}: DataTableProps) {
  const { setRowsCount, setPagesCount, currentPage, search } =
    useContext(DataTableContext);

  const offset = pageSize * (currentPage - 1);

  const finalUrl = useMemo(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL}${dataSrc}`);

    url.searchParams.set('offset', offset.toString());
    url.searchParams.set('limit', pageSize.toString());
    url.searchParams.set('search', search || '');

    if (defaultParams) {
      Object.entries(defaultParams).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }

    return url.origin + url.pathname + url.search;
  }, [dataSrc, defaultParams, offset, pageSize, search]);

  const { isSuccess, data, isLoading, isError } = useQuery({
    queryKey: [queryId, dataSrc, currentPage, pageSize, defaultParams, search],
    queryFn: async () => {
      const response = await fetch(finalUrl);

      if (response.ok) {
        return await response.json();
      }

      if (response.status === 401) {
        throw new Error(`Response: ${response.statusText}`);
      }

      throw new Error(`Response: ${response.statusText}`);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setRowsCount(data.total);
      setPagesCount(data.pages);
    }
  }, [data, isSuccess, setRowsCount, setPagesCount]);

  const getData = useCallback((row: any, prop: string) => {
    const index = prop.indexOf('.');

    if (index > -1) {
      return getData(row[prop.substring(0, index)], prop.substring(index + 1));
    }

    return row ? row[prop] : '';
  }, []);

  const tableHeader = (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={`${dataSrc}-head-${column.field}`}
            className={twMerge(
              'text-xs font-semibold uppercase p-2 first:pl-4 last:pr-4 bg-slate-100 dark:bg-black/10 text-slate-400 dark:text-slate-300/70',
              column.thClassName,
            )}
            style={column.thStyles}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  if (isLoading) {
    return (
      <table className="w-full border-spacing-0">
        {tableHeader}
        <tbody>
          <tr>
            <td
              colSpan={columns.length}
              className="border-t border-border dark:border-border-dark"
            >
              <div className="p-6 flex flex-row items-center justify-center gap-4">
                <span className="font-sm font-medium">Carregando dados...</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (isError) {
    return (
      <div className="rounded-b-md overflow-hidden">
        <table className="w-full">
          {tableHeader}
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="bg-red-50 dark:bg-red-900 border-t border-border dark:border-border-dark"
              >
                <div className="p-6 flex flex-row items-center justify-center gap-4">
                  <Image src={errorIcon} width={32} height={32} alt="Erro" />
                  <span className="text-red-400 font-sm font-medium">
                    Erro ao carregar os dados da tabela
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (isSuccess && data) {
    if (!data.data.length) {
      return (
        <div className="rounded-b-md overflow-hidden">
          <table className="w-full border-spacing-0 border-collapse">
            {tableHeader}
            <tbody>
              <tr>
                <td
                  colSpan={columns.length}
                  className="border-t border-border dark:border-border-dark"
                >
                  <div className="p-6 flex flex-col items-center justify-center text-slate-400 font-sm font-medium">
                    <CircleSlash2 />
                    {emptyTableMessage || 'Sem dados para exibir'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        <table className="w-full">
          {tableHeader}
          <tbody>
            {!data.data.length ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center font-medium border-t border-border dark:border-border-dark"
                >
                  <div className="flex flex-col gap-2 items-center">
                    <CircleSlash2 />
                    Sem dados para exibir
                  </div>
                </td>
              </tr>
            ) : (
              data.data.map((row: any) => {
                return (
                  <tr key={JSON.stringify(row)}>
                    {columns.map((column) => {
                      return (
                        <td
                          key={`${row.id}-${column.field}`}
                          className={twMerge(
                            'text-sm font-medium py-3 px-2 border-t first:pl-4 last:pr-4 border-border dark:border-border-dark',
                            column.tdClassName,
                          )}
                          style={column.tdStyles}
                        >
                          {typeof column.content !== 'undefined'
                            ? column.content(row)
                            : getData(row, column.field)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return <>Erro desconhecido</>;
}
