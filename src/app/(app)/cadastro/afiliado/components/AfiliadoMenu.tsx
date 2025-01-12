'use client';
import { useCallback } from 'react';
import axios from 'axios';
import { Check, List, Pencil } from '@phosphor-icons/react/dist/ssr';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Dialog, DropdownMenu } from '@/components';
import { ApiAfiliadoProps } from '@/types';

interface AfiliadoMenuProps {
  afiliado: ApiAfiliadoProps;
}

export function AfiliadoMenu({ afiliado }: AfiliadoMenuProps) {
  const queryClient = useQueryClient();

  const handleAtivarAfiliado = useCallback(() => {
    Dialog.Confirm.fire({
      title: 'Ativar afiliado',
      text: 'Tem certeza que deseja ativar esse afiliado?',
      confirmButtonText: 'Ativar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return axios
          .patch(`/api/afiliado/${afiliado.id}/historico/`, {
            situacao_id: 2,
          })
          .then(async () => {
            await queryClient.refetchQueries({
              queryKey: ['afiliado', afiliado.id],
              exact: false,
            });
          })
          .catch((error) => {
            Dialog.Confirm.showValidationMessage(`Erro: ${error.message}`);
          });
      },
    });
  }, [afiliado, queryClient]);

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
          href={`/cadastro/afiliado/${afiliado.id}/editar`}
        />
        <DropdownMenu.Item
          label="Aprovar cadastro"
          icon={Check}
          onClick={() => handleAtivarAfiliado()}
          disabled={afiliado.situacao.id !== 1}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
