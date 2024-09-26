import { ReactNode } from 'react';

export function AlertList({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 text-sm text-slate-700">
      <ul role="list" className="pl-5 list-disc group-[.error]:text-red-700">
        {children}
      </ul>
    </div>
  );
}
