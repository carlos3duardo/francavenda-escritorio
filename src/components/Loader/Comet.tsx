import { twMerge } from 'tailwind-merge';
import styles from './Styles.module.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Comet({ size = 'md', className }: LoaderProps) {
  return (
    <div data-size={size} className={twMerge(styles.comet, className)}></div>
  );
}
