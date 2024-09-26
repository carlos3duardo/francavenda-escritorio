'use client';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FooterProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function FormFooter({ children, className, ...rest }: FooterProps) {
  return (
    <div
      className={twMerge('p-4 xl:p-6 border-t border-slate-200 ', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
