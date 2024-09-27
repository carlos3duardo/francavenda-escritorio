'use client';
import { Files, Folder, House, LogOut, Settings2 } from 'lucide-react';
import { ElementType } from 'react';

export type SubmenuItemProps = {
  id: number;
  label: string;
  href: string;
  permissions?: string;
  free?: boolean;
};

export type MenuItemProps = {
  id: number;
  label: string;
  href: string;
  icon: ElementType;
  isActive?: boolean;
  free?: boolean;
  permissions?: string | string[];
  submenu?: SubmenuItemProps[];
};

export const primaryMenu: MenuItemProps[] = [
  {
    id: 2201,
    label: 'Início',
    href: '/dashboard',
    free: true,
    icon: House,
  },
  {
    id: 2203,
    label: 'Cadastro',
    href: '/cadastro',
    icon: Folder,
    free: false,
    submenu: [
      {
        id: 1,
        label: 'Fornecedores',
        href: '/cadastro/fornecedor',
      },
      {
        id: 2,
        label: 'Marcas',
        href: '/cadastro/marca',
      },
      {
        id: 3,
        label: 'Produtos',
        href: '/cadastro/produto',
      },
      {
        id: 4,
        label: 'Ofertas',
        href: '/cadastro/oferta',
      },
      {
        id: 5,
        label: 'Afiliados',
        href: '/cadastro/afiliado',
      },
    ],
  },
  {
    id: 2206,
    label: 'Relatórios',
    href: '/relatorio',
    icon: Files,
  },
];

export const secondaryMenu: MenuItemProps[] = [
  {
    id: 4202,
    label: 'Configurações',
    href: '/config',
    free: true,
    icon: Settings2,
  },
  {
    id: 4203,
    label: 'Sair',
    href: '/logout',
    free: true,
    icon: LogOut,
  },
];
