import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardRootProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardRoot({ children, className, ...rest }: CardRootProps) {
  return (
    <div
      className={twMerge('bg-white rounded-lg relative shadow', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
