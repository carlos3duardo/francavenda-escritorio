'use client';
import {
  Files,
  Folder,
  House,
  Landmark,
  LogOut,
  Settings2,
  ShoppingBag,
  User,
} from 'lucide-react';
import { ElementType } from 'react';

export type SubmenuItemProps = {
  id: number;
  label: string;
  href: string;
  permissions?: string;
  free?: boolean;
  onlyAfiliates?: boolean;
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
    href: '/',
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
        free: false,
      },
      {
        id: 2,
        label: 'Ofertas',
        href: '/ecommerce/ofertas',
        free: false,
      },
      {
        id: 3,
        label: 'Pedidos',
        href: '/ecommerce/pedido',
        free: false,
      },
      {
        id: 4,
        label: 'Meus pedidos',
        href: '/ecommerce/meus-pedidos',
        free: true,
        onlyAfiliates: true,
      },
      {
        id: 5,
        label: 'Meus links',
        href: '/ecommerce/links',
        free: true,
        onlyAfiliates: true,
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
        free: false,
      },
      {
        id: 2,
        label: 'Marcas',
        href: '/cadastro/marca',
        free: false,
      },
      {
        id: 3,
        label: 'Produtos',
        href: '/cadastro/produto',
        free: false,
      },
      {
        id: 5,
        label: 'Afiliados',
        href: '/cadastro/afiliado',
        free: false,
      },
      {
        id: 6,
        label: 'Clientes',
        href: '/cadastro/cliente',
        free: false,
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
        label: 'Lançamentos',
        href: '/financeiro/lancamento',
        free: true,
      },
      {
        id: 4202,
        label: 'Adesão',
        href: '/financeiro/adesao',
        free: true,
        onlyAfiliates: true,
      },
      {
        id: 4203,
        label: 'Mensalidades',
        href: '/financeiro/mensalidade',
        free: true,
        onlyAfiliates: true,
      },
      {
        id: 4204,
        label: 'Comissões',
        href: '/financeiro/comissao',
        free: true,
      },
      {
        id: 4205,
        label: 'Saques',
        href: '/financeiro/saque',
        free: true,
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
    id: 4201,
    label: 'Meus dados',
    href: '/meus-dados',
    free: true,
    icon: User,
  },
  {
    id: 4202,
    label: 'Configurações',
    href: '/config',
    free: false,
    icon: Settings2,
  },
  {
    id: 4203,
    label: 'Sair',
    href: '/sair',
    free: true,
    icon: LogOut,
  },
];
