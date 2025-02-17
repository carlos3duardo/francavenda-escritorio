import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardRootProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardRoot({ children, className, ...rest }: CardRootProps) {
  return (
    <div
      className={twMerge(
        'bg-white dark:bg-gray-900 rounded-lg relative shadow dark:shadow-none',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
