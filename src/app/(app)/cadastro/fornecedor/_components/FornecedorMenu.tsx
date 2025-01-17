'use client';
import { List, Pencil } from '@phosphor-icons/react/dist/ssr';
import { Button, DropdownMenu } from '@/components';
import { ApiFornecedorProps } from '@/types';

interface FornecedorMenuProps {
  fornecedor: ApiFornecedorProps;
}

export function FornecedorMenu({ fornecedor }: FornecedorMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="md">
          <List size={20} weight="bold" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content hasArrow>
        <DropdownMenu.Item
          label="Editar"
          icon={Pencil}
          href={`/cadastro/fornecedor/${fornecedor.id}/editar`}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
