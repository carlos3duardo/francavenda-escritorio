'use client';
import {
  Files,
  Folder,
  House,
  Landmark,
  LogOut,
  Settings2,
  ShoppingBag,
} from 'lucide-react';
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
    id: 2202,
    label: 'Loja Virtual',
    href: '/ecommerce',
    free: true,
    icon: ShoppingBag,
    submenu: [
      {
        id: 1,
        label: 'Destaques',
        href: '/ecommerce/destaques',
      },
      {
        id: 2,
        label: 'Ofertas',
        href: '/ecommerce/ofertas',
      },
      {
        id: 3,
        label: 'Pedidos',
        href: '/ecommerce/pedido',
      },
    ],
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
        id: 5,
        label: 'Afiliados',
        href: '/cadastro/afiliado',
      },
      {
        id: 6,
        label: 'Clientes',
        href: '/cadastro/cliente',
      },
    ],
  },
  {
    id: 4200,
    label: 'Financeiro',
    href: '/financeiro',
    icon: Landmark,
    free: true,
    submenu: [
      {
        id: 4201,
        label: 'Adesão',
        href: '/financeiro/adesao',
      },
      {
        id: 4202,
        label: 'Mensalidades',
        href: '/financeiro/mensalidade',
      },
      {
        id: 4203,
        label: 'Comissões',
        href: '/financeiro/comissao',
      },
      {
        id: 4204,
        label: 'Saques',
        href: '/financeiro/saque',
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
    href: '/signout',
    free: true,
    icon: LogOut,
  },
];
