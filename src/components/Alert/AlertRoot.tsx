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
      success: 'success bg-green-100/60',
      warning: 'warning bg-yellow-100/60',
      info: 'info bg-blue-100/60',
      error: 'error bg-red-100/60',
    },
  },
});

interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'success' | 'warning' | 'info' | 'error';
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
          <div className="shrink-0 text-slate-800 group-[.error]:text-red-800">
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
        <div>{children}</div>
      </div>
    </div>
  );
}
