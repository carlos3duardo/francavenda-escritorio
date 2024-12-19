import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardGridProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardGrid({ children, className, ...rest }: CardGridProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-12 gap-3 p-4 first:rounded-t-md last:rounded-b-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
