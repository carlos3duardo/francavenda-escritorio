'use client';
import { List, Pencil } from '@phosphor-icons/react/dist/ssr';
import { Button, DropdownMenu } from '@/components';
import { ApiMarcaProps } from '@/types';

interface MarcaMenuProps {
  marca: ApiMarcaProps;
}

export function MarcaMenu({ marca }: MarcaMenuProps) {
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
          href={`/cadastro/marca/${marca.id}/editar`}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
