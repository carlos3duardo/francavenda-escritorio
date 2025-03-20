'use client';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Dialog, InputMoney, Loader } from '@/components';
import { useAfiliadoSaldoDisponivel } from '@/hooks/useAfiliadoSaldoDisponivel';
import { currency } from '@/helpers';

import saqueIcon from '@/assets/images/icons/money-withdrawal.png';
import axios from 'axios';

interface WidgetProps {
  afiliadoId: string;
}
export function WidgetSolicitarSaque({ afiliadoId }: WidgetProps) {
  const { data, isLoading, isError } = useAfiliadoSaldoDisponivel(afiliadoId);
  const [valorSaque, setValorSaque] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const handleSolicitarSaque = useCallback(() => {
    Dialog.Confirm.fire({
      title: 'Solicitação de saque',
      text: `Confirma a solicitação de saque no valor de R$ ${currency(valorSaque)}?`,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return axios
          .post(`/api/financeiro/saque`, {
            afiliadoId,
            valor: valorSaque,
          })
          .then(async () => {
            await queryClient.refetchQueries({
              queryKey: ['historico-saques'],
              exact: false,
            });

            await queryClient.refetchQueries({
              queryKey: ['saldo-disponivel'],
              exact: false,
            });

            if (inputRef && inputRef.current) {
              inputRef.current.value = '';
            }

            setValorSaque(0);
          })
          .catch((error) => {
            Dialog.Confirm.showValidationMessage(`Erro: ${error.message}`);
          });
      },
    });
  }, [afiliadoId, queryClient, valorSaque]);

  if (isError) {
    return (
      <div className="widget flex items-center justify-between gap-6 p-4 2xl:p-6 rounded bg-gradient-to-b from-red-200 to-red-400 dark:from-red-600 dark:to-red-800 text-red-800 dark:text-white/90">
        <div className="flex-1">
          <header className="block text-xs font-bold uppercase mb-2">
            Erro
          </header>
          <div className="text-base font-bold">
            Ocorreu um erro ao consultar o saldo disponível.
          </div>
        </div>
        <figure>
          <Image src={saqueIcon} alt="" width={64} height={64} />
        </figure>
      </div>
    );
  }

  return (
    <div className="widget flex items-center justify-between gap-6 p-4 2xl:p-6 rounded bg-gradient-to-b from-emerald-200 to-emerald-400 dark:from-emerald-600 dark:to-emerald-800 text-emerald-800 dark:text-white/90">
      <div className="flex-1">
        <header className="block text-xs font-bold uppercase mb-2">
          Solicitar saque
        </header>
        <div className="w-full flex lg:flex-col xl:flex-row items-end gap-2">
          {isLoading ? (
            <Loader.Basic size="md" />
          ) : (
            <>
              <div>
                <InputMoney
                  name="valor"
                  id="valor"
                  className="bg-emerald-100 border-emerald-400 focus-within:border-emerald-400 dark:focus-within:border-emerald-400 focus-within:ring-2 dark:focus-within:ring-emerald-600 focus-within:ring-emerald-200 hover:data-[disabled=false]:border-emerald-400 dark:hover:data-[disabled=false]:border-emerald-600"
                  autoComplete="off"
                  ref={inputRef}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;

                    setValorSaque(Number(target.value.replace(',', '.')));
                  }}
                />
              </div>
              <div>
                <Button
                  color="success"
                  fullWidth
                  onClick={handleSolicitarSaque}
                  disabled={
                    !data ||
                    !valorSaque ||
                    data.saldo <= 0 ||
                    data.saldo < valorSaque
                  }
                >
                  Solicitar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <figure>
        <Image src={saqueIcon} alt="" width={64} height={64} />
      </figure>
    </div>
  );
}
