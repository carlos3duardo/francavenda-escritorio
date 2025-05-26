'use client';

import { useCallback } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { DotsThreeVertical } from '@phosphor-icons/react/dist/ssr';
import { FolderCheck, RotateCw, Send, X } from 'lucide-react';
import { Dialog, DropdownMenu } from '@/components';
import { ApiPedidoProps } from '@/types';

interface PedidoDropdownMenuProps {
  pedido: ApiPedidoProps;
}
export function PedidoDropdownMenu({ pedido }: PedidoDropdownMenuProps) {
  const queryClient = useQueryClient();

  const handleCancelarPedido = useCallback((pedidoId: string) => {
    alert(`Cancelar pedido ${pedidoId}`);
  }, []);

  const handleChecarRestricoes = useCallback(
    (pedidoId: string) => {
      Dialog.Confirm.fire({
        title: 'Verificar restrições',
        text: 'Você deseja verificar se o pedido possui restrições com o fornecedor?',
        confirmButtonText: 'Verificar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return axios
            .post(`/api/pedido/${pedidoId}/checar-restricoes`, {})
            .then(async () => {
              await queryClient.refetchQueries({
                queryKey: ['pedido'],
                exact: false,
              });
            })
            .catch((error) => {
              Dialog.Confirm.showValidationMessage(`Erro: ${error.message}`);
            });
        },
      });
    },
    [queryClient],
  );

  const handleReprocessarPagamento = useCallback(
    (pedidoId: string) => {
      Dialog.Confirm.fire({
        title: 'Reprocessar pagamento',
        text: 'Tem certeza que deseja reprocessar o pagamento deste pedido?',
        confirmButtonText: 'Reprocessar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return axios
            .post(`/api/pedido/${pedidoId}/reprocessar-pagamento`, {})
            .then(async () => {
              await queryClient.refetchQueries({
                queryKey: ['pedido'],
                exact: false,
              });
            })
            .catch((error) => {
              Dialog.Confirm.showValidationMessage(`Erro: ${error.message}`);
            });
        },
      });
    },
    [queryClient],
  );

  const handleEnviarParaFornecedor = useCallback(
    (pedidoId: string) => {
      Dialog.Confirm.fire({
        title: 'Enviar pedido para cadastro?',
        text: 'Você confirma o envio do pedido para o cadastro no fornecedor?',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return axios
            .post(`/api/pedido/${pedidoId}/enviar-para-fornecedor`, {})
            .then(async () => {
              await queryClient.refetchQueries({
                queryKey: ['pedido'],
                exact: false,
              });
            })
            .catch((error) => {
              Dialog.Confirm.showValidationMessage(`Erro: ${error.message}`);
            });
        },
      });
    },
    [queryClient],
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-900 rounded"
        >
          <DotsThreeVertical size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content hasArrow>
        <DropdownMenu.Item
          label="Cancelar pedido"
          icon={X}
          onClick={() => handleCancelarPedido(pedido.id)}
          disabled={![1, 2, 3, 7, 11].includes(pedido.situacao.id)}
        />
        <DropdownMenu.Item
          label="Checar restrições"
          icon={FolderCheck}
          onClick={() => handleChecarRestricoes(pedido.id)}
          disabled={![1, 2, 3, 11].includes(pedido.situacao.id)}
        />
        <DropdownMenu.Item
          label="Reprocessar pagamento"
          icon={RotateCw}
          onClick={() => handleReprocessarPagamento(pedido.id)}
          disabled={![2, 7].includes(pedido.situacao.id)}
        />
        <DropdownMenu.Item
          label="Enviar para fornecedor"
          icon={Send}
          onClick={() => handleEnviarParaFornecedor(pedido.id)}
          disabled={![2, 3, 8].includes(pedido.situacao.id)}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
