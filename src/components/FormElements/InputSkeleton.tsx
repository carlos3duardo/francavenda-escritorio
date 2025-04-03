import { LoaderCircle } from 'lucide-react';

interface InputSkeletonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function InputSkeleton({
  size = 'md',
  className = '',
}: InputSkeletonProps) {
  return (
    <div className="w-full flex items-center justify-between bg-slate-100 relative px-2 data-[size=lg]:px-3 rounded-md border transition duration-200 border-slate-300 dark:border-white/10 dark:bg-white/5 h-10 data-[size=xs]:h-6 data-[size=sm]:h-8 data-[size=lg]:h-12 animate-pulse">
      <span className="text-sm font-medium">Carregando...</span>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
