'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function DropdownMenuSeparator() {
  return (
    <DropdownMenu.Separator className="h-[1px] bg-slate-200 dark:bg-slate-600 my-1 mx-1" />
  );
}
