'use client';
import Image from 'next/image';
import SearchIcon from './images/magnifying-glass.svg';
import { twMerge } from 'tailwind-merge';
import { KeyboardEvent, useCallback, useContext, useState } from 'react';
import { DataTableContext } from './DataTableContext';

interface ComponentProps {
  containerClassName?: string;
  inputClassName?: string;
}

export function DataTableSearch({
  containerClassName,
  inputClassName,
}: ComponentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { search, handleSetSearch } = useContext(DataTableContext);

  const handleNewSearch = useCallback(
    (q: string) => {
      handleSetSearch(q);
    },
    [handleSetSearch],
  );

  return (
    <div
      className={twMerge(
        'w-full max-w-[220px] relative px-2 data-[size=lg]:px-3 flex gap-2 items-center rounded-md border transition duration-200 border-slate-300 dark:border-white/10 dark:bg-white/5 h-10 data-[size=xs]:h-6 data-[size=sm]:h-8 data-[size=lg]:h-12 hover:data-[disabled=false]:border-blue-400 dark:hover:data-[disabled=false]:border-primary-600 focus-within:border-blue-400 dark:focus-within:border-blue-400 focus-within:ring-2 dark:focus-within:ring-blue-600 focus-within:ring-blue-200 data-[readonly=true]:border-slate-300 data-[readonly=true]:bg-slate-50 data-[readonly=true]:focus-within:border-slate-400 data-[readonly=true]:focus-within:ring-slate-200 data-[disabled=true]:border-slate-300 data-[disabled=true]:bg-slate-100 data-[error=true]:border-red-400 hover:data-[error=true]:border-red-400 focus-within:data-[error=true]:ring-red-200 data-[disabled=true]:cursor-not-allowed',
        containerClassName,
      )}
    >
      <input
        type="text"
        className={twMerge(
          'w-full outline-none bg-transparent text-slate-600 dark:text-slate-200 text-sm data-[size=xs]:text-xs data-[size=sm]:text-xs data-[size=lg]:text-lg font-medium placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed data-[uppercase=true]:uppercase data-[lowercase=true]:lowercase caret-blue-400',
          inputClassName,
        )}
        defaultValue={search || ''}
        onChange={(evt) => setSearchTerm(evt.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleNewSearch(searchTerm);
          }
        }}
      />
      <button
        type="button"
        className="opacity-50 hover:opacity-100 p-1 rounded-sm"
        onClick={() => handleNewSearch(searchTerm)}
      >
        <Image
          src={SearchIcon}
          alt=""
          width={16}
          height={16}
          className="dark:invert dark:brightness-0"
        />
      </button>
    </div>
  );
}
