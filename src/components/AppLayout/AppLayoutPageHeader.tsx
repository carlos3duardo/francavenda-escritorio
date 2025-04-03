'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PageHeaderProps {
  isLoading?: boolean;
  children: ReactNode;
}

export function AppLayoutPageHeader({
  isLoading = true,
  children,
}: PageHeaderProps) {
  const [pageHeaderEl, setPageHeaderEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPageHeaderEl(document.getElementById('app-page-header'));
  }, [pageHeaderEl]);

  if (pageHeaderEl && isLoading) {
    createPortal(<>Carregando</>, pageHeaderEl);
  }

  return pageHeaderEl && createPortal(children, pageHeaderEl);
}
