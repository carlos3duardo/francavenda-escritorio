'use client';
import { ReactNode } from 'react';
import { ModalProvider } from './ModalContext';

interface ModalRootProps {
  children: ReactNode;
}

export function ModalRoot({ children }: ModalRootProps) {
  return <ModalProvider>{children}</ModalProvider>;
}
