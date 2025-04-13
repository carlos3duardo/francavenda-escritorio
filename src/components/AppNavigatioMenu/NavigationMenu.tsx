'use client';
import { useEffect, useState } from 'react';
import { getCookie, hasCookie } from 'cookies-next';
import { UserCookieProps } from '@/types';
import { NavigationMenuItem } from './NavigationMenuItem';
import { MenuItemProps } from '@/data/menu';

interface NavigationMenuProps {
  menu: MenuItemProps[];
}

export function NavigationMenu({ menu }: NavigationMenuProps) {
  const [usuario, setUsuario] = useState<UserCookieProps | undefined>(
    undefined,
  );

  useEffect(() => {
    const user = hasCookie('frv:user')
      ? (JSON.parse(getCookie('frv:user') as string) as UserCookieProps)
      : undefined;

    setUsuario(user);
  }, []);

  if (!usuario) {
    return <div className="p-2">Carregando...</div>;
  }
  return (
    <div className="px-2 py-1 lg:px-4 2xl:px-6">
      <ul role="menu" className="flex flex-col gap-1">
        {menu.map((item) => (
          <li key={item.id}>
            <NavigationMenuItem menuItem={item} user={usuario} />
          </li>
        ))}
      </ul>
    </div>
  );
}
