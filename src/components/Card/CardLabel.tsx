import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type CardLabelProps = ComponentProps<'h2'> & {
  title: string;
  subtitle?: string;
};

export function CardLabel({ title, subtitle, className }: CardLabelProps) {
  return (
    <h2 className={twMerge('text-md font-semibold leading-tight', className)}>
      {title}
      {subtitle && (
        <span className="block text-sm text-gray-400">{subtitle}</span>
      )}
    </h2>
  );
}
