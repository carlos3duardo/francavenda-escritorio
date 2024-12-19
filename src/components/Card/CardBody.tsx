import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardBodyProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardBody({ children, className, ...rest }: CardBodyProps) {
  return (
    <div
      className={twMerge('p-4 first:rounded-t-md last:rounded-b-md', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
