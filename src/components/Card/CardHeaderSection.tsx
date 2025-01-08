import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardHeaderSectionProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function CardHeaderSection({
  children,
  className,
  ...rest
}: CardHeaderSectionProps) {
  return (
    <div className={twMerge('', className)} {...rest}>
      {children}
    </div>
  );
}
