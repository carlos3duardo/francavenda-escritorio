import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardHeaderProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardHeader({ children, className, ...rest }: CardHeaderProps) {
  return (
    <div
      className={twMerge(
        'px-4 xl:px-6 pt-4 xl:pt-4 pb-4 xl:pb-4 flex flex-row items-center justify-between first:rounded-t-md last:rounded-b-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
