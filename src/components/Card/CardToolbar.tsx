import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardToolbarProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardToolbar({
  children,
  className,
  ...rest
}: CardToolbarProps) {
  return (
    <div className={twMerge('flex items-center gap-4', className)} {...rest}>
      {children}
    </div>
  );
}
