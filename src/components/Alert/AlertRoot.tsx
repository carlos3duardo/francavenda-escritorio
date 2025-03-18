import {
  CircleCheck,
  CircleX,
  Info,
  Lightbulb,
  TriangleAlert,
} from 'lucide-react';
import { HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const alertStyle = tv({
  base: 'group p-4 rounded-md',
  variants: {
    type: {
      default: 'default bg-slate-100/60',
      success:
        'success bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200/70',
      warning:
        'warning bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200/70',
      info: 'info bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200/70',
      hint: 'success bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200/70',
      error:
        'error bg-red-100/60 dark:bg-red-800/60 text-red-800 dark:text-red-100',
    },
  },
});

interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'success' | 'warning' | 'info' | 'error' | 'hint';
  hasIcon?: boolean;
}

export function AlertRoot({
  children,
  type = 'default',
  hasIcon = true,
}: AlertRootProps) {
  return (
    <div data-type={type} className={alertStyle({ type })}>
      <div className="flex gap-3">
        {hasIcon && (
          <div className="shrink-0">
            {type === 'success' ? (
              <CircleCheck size={20} />
            ) : type === 'warning' ? (
              <TriangleAlert size={20} />
            ) : type === 'info' ? (
              <Info size={20} />
            ) : type === 'error' ? (
              <CircleX size={20} />
            ) : (
              <Lightbulb size={20} />
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}
