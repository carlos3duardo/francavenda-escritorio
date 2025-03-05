import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalBodyProps = ComponentProps<'div'> & {};

export function ModalBody({ children, className, ...rest }: ModalBodyProps) {
  return (
    <div
      className={twMerge(
        '_modalBody_ relative px-5 py-4 overflow-y-auto',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
