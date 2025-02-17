import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Basic({ size = 'md', className }: LoaderProps) {
  return (
    <div
      data-size={size}
      className={twMerge(
        'h-[24px] w-[24px] border-[4px] data-[size=md]:h-[32px] data-[size=md]:w-[32px] data-[size=md]:border-[5px] data-[size=lg]:h-[42px] data-[size=lg]:w-[42px] data-[size=lg]:border-[8px] rounded-full border-white/60 border-t-primary-600 animate-spin',
        className,
      )}
    ></div>
  );
}
