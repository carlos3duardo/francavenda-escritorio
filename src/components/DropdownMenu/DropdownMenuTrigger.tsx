'use client';
import { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownMenuTriggerProps {
  children: ReactNode;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}
