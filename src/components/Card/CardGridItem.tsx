import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardGridItemProps = ComponentProps<'div'> & {
  children: ReactNode;
  label?: string;
};

export function CardGridItem({
  label,
  className,
  children,
  ...rest
}: CardGridItemProps) {
  return (
    <div
      data-env=""
      className={twMerge(
        'col-span-12 text-slate-600 text-md font-medium data-[env=dev]:bg-primary-100 data-[env=dev]:rounded data-[env=dev]:p-2',
        className,
      )}
      {...rest}
    >
      {label && (
        <span className="block text-slate-400 text-sm font-normal">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
