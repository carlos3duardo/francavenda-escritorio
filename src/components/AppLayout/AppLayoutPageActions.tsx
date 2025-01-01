'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PageActionsProps {
  children: ReactNode;
}

export function AppLayoutPageActions({ children }: PageActionsProps) {
  const [pageActionsEl, setPageActionsEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPageActionsEl(document.getElementById('app-page-actions'));
  }, [pageActionsEl]);

  if (pageActionsEl) {
    createPortal(<>Carregando</>, pageActionsEl);
  }

  return pageActionsEl && createPortal(children, pageActionsEl);
}
