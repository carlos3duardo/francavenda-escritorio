import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardFooterProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardFooter({ children, className, ...rest }: CardFooterProps) {
  return (
    <div
      className={twMerge(
        '_cardFooter p-4 border-t border-t-slate-200 first:rounded-t-md last:rounded-b-md flex items-center',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
