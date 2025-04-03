'use client';
import {
  HelpCircle,
  KeyRound,
  Landmark,
  LogOut,
  MapPinned,
  User,
} from 'lucide-react';
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
        <DropdownMenu.Item label="Meus dados" icon={User} href="/meus-dados" />
        <DropdownMenu.Item
          label="Segurança"
          icon={MapPinned}
          href="/meus-dados?tab-profile=endereco"
        />
        <DropdownMenu.Item
          label="Financeiro"
          icon={Landmark}
          href="/meus-dados?tab-profile=financeiro"
        />
        <DropdownMenu.Item
          label="Segurança"
          icon={KeyRound}
          href="/meus-dados?tab-profile=seguranca"
        />
        <DropdownMenu.Separator />
        <DropdownMenu.Item label="Ajuda" icon={HelpCircle} href="/ajuda" />
        <DropdownMenu.Item label="Sair" icon={LogOut} href="/sair" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
