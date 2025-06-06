import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardBodyProps = ComponentProps<'div'> & {
  children: ReactNode;
  zeroPadding?: boolean;
};

export function CardBody({
  children,
  className,
  zeroPadding = false,
  ...rest
}: CardBodyProps) {
  return (
    <div
      data-zero-padding={zeroPadding}
      className={twMerge(
        'py-4 px-4 xl:px-6 data-[zero-padding=true]:p-0 first:rounded-t-md last:rounded-b-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
