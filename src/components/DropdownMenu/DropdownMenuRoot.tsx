'use client';
import { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownMenuRootProps {
  children: ReactNode;
}

export function DropdownMenuRoot({ children }: DropdownMenuRootProps) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}
