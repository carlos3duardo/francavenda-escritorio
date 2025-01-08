import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardHeaderProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardHeader({ children, className, ...rest }: CardHeaderProps) {
  return (
    <div
      className={twMerge(
        'py-4 px-4 xl:px-6 flex flex-row items-center justify-between first:rounded-t-md last:rounded-b-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
