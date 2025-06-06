import { ReactNode } from 'react';

export function AlertList({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 text-sm text-slate-700">
      <ul role="list" className="pl-5 list-disc">
        {children}
      </ul>
    </div>
  );
}
