import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalHeaderProps = ComponentProps<'div'> & {
  title: string;
  subtitle?: string;
};

export function ModalHeader({
  children,
  className,
  title,
  subtitle,
  ...rest
}: ModalHeaderProps) {
  return (
    <div className={twMerge('border-b px-5 py-4', className)} {...rest}>
      <h2 className="text-lg text-slate-800 font-semibold leading-none">
        {title}
      </h2>
      {subtitle && (
        <h3 className="text-gray-600 opacity-60 text-sm font-semibold mt-1 leading-none">
          {subtitle}
        </h3>
      )}
    </div>
  );
}
