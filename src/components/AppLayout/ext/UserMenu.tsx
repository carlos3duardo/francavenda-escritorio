'use client';
import { HelpCircle, History, Lock, LogOut, User } from 'lucide-react';
import { DropdownMenu } from '@/components/DropdownMenu';
import { ReactNode } from 'react';

interface UserMenuProps {
  children: ReactNode;
}

export function UserMenu({ children }: UserMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button>{children}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content hasArrow>
        <DropdownMenu.Item
          label="Meus dados"
          icon={User}
          href="/config?tab-config=usuario"
        />
        <DropdownMenu.Item
          label="Segurança"
          icon={Lock}
          href="/config?tab-config=seguranca"
        />
        <DropdownMenu.Item
          label="Histórico"
          icon={History}
          href="/config?tab-config=historico"
        />
        <DropdownMenu.Separator />
        <DropdownMenu.Item label="Ajuda" icon={HelpCircle} href="/ajuda" />
        <DropdownMenu.Item label="Sair" icon={LogOut} href="/logout" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
