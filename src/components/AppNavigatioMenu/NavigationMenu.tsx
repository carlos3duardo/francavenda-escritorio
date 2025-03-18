'use client';
import { MenuItemProps } from '@/data/menu';
import { NavigationMenuItem } from './NavigationMenuItem';
import { UserCookieProps } from '@/types';
import { Alert } from '../Alert';
import Link from 'next/link';
import Button from '../Button';

interface NavigationMenuProps {
  menu: MenuItemProps[];
  user: UserCookieProps | undefined;
}

export function NavigationMenu({ menu, user }: NavigationMenuProps) {
  if (!user) {
    return (
      <div className="p-2">
        <Alert.Root type="error" hasIcon={false}>
          <Alert.Message message="Usuário não reconhecido" />
          <Alert.Description>
            <Link href="/signout">
              <Button size="xs" color="primary">
                Sair
              </Button>
            </Link>
          </Alert.Description>
        </Alert.Root>
      </div>
    );
  }
  return (
    <div className="px-2 py-1 lg:px-4 2xl:px-6">
      <ul role="menu" className="flex flex-col gap-1">
        {menu.map((item) => (
          <li key={item.id}>
            <NavigationMenuItem menuItem={item} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
