'use client';
import { ElementType } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

interface MenuItemProps {
  icon?: ElementType;
  label: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function MenuItemContent({
  icon: Icon,
  label,
  href,
  disabled = false,
  onClick,
}: MenuItemProps) {
  if (disabled) {
    return (
      <div className="w-full flex items-center h-9 px-4 text-slate-300 dark:text-slate-500">
        <span className="flex gap-2">
          {Icon && <Icon size={18} />} {label}
        </span>
      </div>
    );
  }

  if (onClick) {
    return (
      <button
        className="w-full flex items-center h-9 px-4 text-slate-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400"
        onClick={onClick}
      >
        <span className="flex gap-2">
          {Icon && <Icon size={18} />} {label}
        </span>
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className="w-full flex items-center h-9 px-4 text-slate-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400"
      >
        <span className="flex gap-2">
          {Icon && <Icon size={18} />} {label}
        </span>
      </Link>
    );
  }

  return (
    <span className="flex gap-2 px-4 py-3">
      {Icon && <Icon size={18} />} {label}
    </span>
  );
}

export function DropdownMenuItem({
  label,
  icon,
  href,
  disabled = false,
  onClick,
}: MenuItemProps) {
  return (
    <DropdownMenu.Item className="group flex items-center gap-2 select-none outline-none transition-colors duration-300 transform text-sm hover:bg-slate-100 dark:hover:bg-slate-900">
      <MenuItemContent
        label={label}
        icon={icon}
        href={href}
        disabled={disabled}
        onClick={onClick}
      />
    </DropdownMenu.Item>
  );
}
