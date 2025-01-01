'use client';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { AlertCircle } from 'lucide-react';

type FormControlProps = ComponentProps<'div'> & {
  children: ReactNode;
  label?: string;
  htmlFor?: string;
  error?: string | undefined;
};

export function FormControl({
  children,
  className,
  label,
  htmlFor,
  error,
}: FormControlProps) {
  return (
    <div
      className={twMerge(
        'control w-full group-[.layout-horizontal]:grid group-[.layout-horizontal]:grid-cols-12 group-[.layout-horizontal]:gap-4',
        className,
      )}
    >
      {label && (
        <div className="group-[.layout-horizontal]:h-10 group-[.layout-horizontal]:flex group-[.layout-horizontal]:items-center group-[.layout-horizontal]:justify-end group-[.layout-horizontal] group-[.layout-horizontal]:col-span-3">
          <label
            className="text-sm text-slate-600 dark:text-slate-400 font-medium group-[.layout-horizontal]:after:content-[':']"
            htmlFor={htmlFor}
          >
            {label}
          </label>
        </div>
      )}
      <div className="group-[.layout-horizontal]:col-span-9 group-[.layout-horizontal]:grid group-[.layout-horizontal]:grid-cols-12">
        <div className={twMerge('', className)}>
          {children}
          {error && (
            <div className="flex items-center gap-1 mt-1 pl-1 text-red-400 text-xs font-medium">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /*
  if (layout === 'grid') {
    return (
      <div className={twMerge('col-span-12', className)}>
        <div role="group" className="flex flex-col">
          {label && (
            <label
              className="text-sm text-slate-600 font-medium ml-1"
              htmlFor={htmlFor}
            >
              {label}
            </label>
          )}
          {children}
        </div>
        {error && (
          <div className="flex items-center gap-1 mt-1 pl-1 text-red-400 text-xs font-medium">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className="control w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          {label && (
            <label
              htmlFor={htmlFor}
              className="flex items-center justify-end text-sm font-medium text-slate-500 h-11"
            >
              {label}:
            </label>
          )}
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-10 grid grid-cols-12">
          <div className={className}>{children}</div>
        </div>
      </div>
    );
  }
  */
}
