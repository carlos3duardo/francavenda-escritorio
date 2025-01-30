import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardGridItemProps = ComponentProps<'div'> & {
  children: ReactNode;
  label?: string;
  tooltip?: string;
};

export function CardGridItem({
  label,
  tooltip,
  className,
  children,
  ...rest
}: CardGridItemProps) {
  return (
    <div
      data-env={
        process.env.NEXT_PUBLIC_APP_ENV === 'development' ? 'dev' : 'prod'
      }
      className={twMerge(
        'col-span-12 text-md font-medium data-[env=dev]:bg-slate-100 dark:data-[env=dev]:bg-slate-800',
        className,
      )}
      {...rest}
    >
      {label && (
        <span
          className="block text-slate-400 text-sm font-normal"
          title={tooltip}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
