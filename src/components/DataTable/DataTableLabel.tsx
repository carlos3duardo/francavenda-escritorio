import { ComponentProps } from 'react';

interface DataTableLabelProps extends ComponentProps<'h2'> {
  title: string;
  subtitle?: string;
}

export function DataTableLabel({ title, subtitle }: DataTableLabelProps) {
  return (
    <h2 className="text-md font-semibold leading-tight">
      {title}
      {subtitle && (
        <span className="block text-sm text-gray-400">{subtitle}</span>
      )}
    </h2>
  );
}
