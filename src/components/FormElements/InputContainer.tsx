import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type InputContainerProps = ComponentProps<'div'> & {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

export function InputContainer({
  children,
  error,
  required,
  disabled,
  size = 'md',
  className,
}: InputContainerProps) {
  return (
    <div
      data-error={!!error}
      data-required={required}
      aria-required={required}
      data-disabled={disabled}
      aria-disabled={disabled}
      data-size={size}
      className={twMerge(
        'w-full relative px-2 data-[size=lg]:px-3 flex gap-2 items-center rounded-md border transition duration-200 border-slate-300 dark:border-white/10 dark:bg-white/5 h-10 data-[size=xs]:h-6 data-[size=sm]:h-8 data-[size=lg]:h-12 hover:data-[disabled=false]:border-blue-400 dark:hover:data-[disabled=false]:border-primary-600 focus-within:border-blue-400 dark:focus-within:border-blue-400 focus-within:ring-2 dark:focus-within:ring-blue-600 focus-within:ring-blue-200 data-[readonly=true]:border-slate-300 data-[readonly=true]:bg-slate-50 data-[readonly=true]:focus-within:border-slate-400 data-[readonly=true]:focus-within:ring-slate-200 data-[disabled=true]:border-slate-300 data-[disabled=true]:bg-slate-100 data-[error=true]:border-red-400 hover:data-[error=true]:border-red-400 focus-within:data-[error=true]:ring-red-200 data-[disabled=true]:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </div>
  );
}
