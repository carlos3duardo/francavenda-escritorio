'use client';
import { MenuItemProps } from '@/data/menu';
import { NavigationMenuItem } from './NavigationMenuItem';

interface NavigationMenuProps {
  menu: MenuItemProps[];
}

export function NavigationMenu({ menu }: NavigationMenuProps) {
  return (
    <div className="px-2 py-1 lg:px-4 2xl:px-6">
      <ul role="menu" className="flex flex-col gap-1">
        {menu.map((item) => (
          <li key={item.id}>
            <NavigationMenuItem
              id={item.id}
              label={item.label}
              icon={item.icon}
              href={item.href}
              submenu={item.submenu}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
