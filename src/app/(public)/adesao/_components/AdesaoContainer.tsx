'use client';
import { Loader } from '@/components';
import { ApiAdesaoProps } from '@/types';
import { useParams } from 'next/navigation';
import { FormPagamentoAdesao } from './FormPagamentoAdesao';
import { CheckCircle, Lock } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

import logoFrancaVenda from '@/assets/images/logo-francavenda-lightmode.png';
import { currency, firstName } from '@/helpers';
import { useQuery } from '@tanstack/react-query';

export function AdesaoContainer() {
  const params = useParams<{ id: string }>();
  const adesaoId = params.id;

  const {
    isLoading,
    isSuccess,
    data: adesao,
  } = useQuery({
    queryKey: ['adesao', adesaoId],
    queryFn: async (): Promise<ApiAdesaoProps> => {
      const response = await fetch(
        `/api/ecomm/afiliado/adesao/${adesaoId}`,
      ).then((res) => res.json());

      return response;
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  return (
    <main className="container max-w-[860px] py-12 md:py-24 px-12 md:px-4 flex flex-col-reverse md:flex-row gap-8 mx-auto">
      {isLoading ? (
        <div className="w-full flex flex-col items-center gap-2">
          <figure>
            <Loader.Basic />
          </figure>
          <p>Carregando...</p>
        </div>
      ) : isSuccess && adesao ? (
        <>
          <div className="w-full flex-1">
            <h1 className="text-lg font-bold mb-4">
              Olá,{' '}
              {firstName({ fullName: adesao.afiliado.nome, ucfirst: true })}.
              <br />
              Falta pouco para você ativar sua conta.
            </h1>
            <FormPagamentoAdesao />
          </div>
          <div className="w-full md:w-96">
            <div className="flex flex-col gap-8 bg-slate-200 text-primary-900 rounded-md w-full p-6 md:py-6">
              <div className="leading-tight text-center">
                <h3 className="text-sm font-semibold">Valor cobrado</h3>
                <div className="text-[2.5rem] font-bold">
                  R$ {currency(adesao.valor)}
                </div>
                <p className="text-sm font-semibold flex gap-1 justify-center mt-2 text-green-500">
                  <Lock size={18} weight="bold" /> Pagamento seguro
                </p>
              </div>
              <div>
                <ul className="text-sm flex flex-col gap-2">
                  <li className="flex gap-2">
                    <figure>
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-primary-500"
                      />
                    </figure>
                    <div>
                      <strong>Receba 60% suas indicações</strong>
                      <br />
                      Você poderá montar sua própria rede e receber comissão das
                      adesões e das vendas de seus embaixadores.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <figure>
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-primary-500"
                      />
                    </figure>
                    <div>
                      <strong>Acesso aos treinamentos de vendas</strong>
                      <br />
                      Receba dicas e estratégias de vendas que ajudarão a vocẽ
                      aumentar suas vendas manter uma renda mensal.
                    </div>
                  </li>
                </ul>
              </div>
              <figure className="flex justify-center rounded-md p-8">
                <Image
                  src={logoFrancaVenda}
                  alt="logo"
                  width={125}
                  height={50}
                />
              </figure>
            </div>
          </div>
        </>
      ) : (
        <>Erro</>
      )}
    </main>
  );
}
