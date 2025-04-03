'use client';
import { useOfertaList, useProdutoList } from '@/hooks';
import { Button, Card, InputSkeleton, Select } from '@/components';
import { ReactNode, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ApiOfertaProps } from '@/types';
import { useRouter } from 'next/navigation';

type InputRowProps = {
  field?: string;
  label?: string;
  children: ReactNode;
  className?: string;
};

function InputRow({ field, label, children, className }: InputRowProps) {
  return (
    <div className="grid grid-cols-12 gap-x-4">
      {label ? (
        <label
          htmlFor={field}
          className="col-span-12 md:col-span-3 xl:col-span-2 text-left md:text-right text-sm text-slate-400 self-center font-medium"
        >
          {label}:
        </label>
      ) : (
        <div className="hidden md:block md:col-span-3 xl:col-span-2" />
      )}

      <div
        className={twMerge(
          'col-span-12 md:col-span-9 xl:col-span-10',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function NovoPedidoFormularioIntroducao() {
  const { data: produtos, isLoading: isLoadingProdutos } = useProdutoList();
  const { data: ofertas } = useOfertaList({});
  const [optionsOfertas, setOptionsOfertas] = useState<ApiOfertaProps[]>([]);
  const [ofertaId, setOfertaId] = useState<string | null>(null);

  const router = useRouter();

  const handleChangeProduto = useCallback(
    (produtoId: string) => {
      const produto = (produtos || []).find((item) => item.id === produtoId);

      setOfertaId(null);

      if (produto) {
        setOptionsOfertas(
          ofertas?.filter((oferta) => oferta.produto.id === produto.id) || [],
        );
      } else {
        setOptionsOfertas([]);
      }
    },
    [ofertas, produtos],
  );

  const handleSubmit = useCallback(() => {
    if (ofertaId) {
      router.push(`/ecommerce/pedido/novo/${ofertaId}`);
    }
  }, [ofertaId, router]);

  return (
    <div>
      <Card.Root>
        <Card.Header>
          <Card.Label title="Definições" />
        </Card.Header>
        <Card.Separator />
        <Card.Body>
          <div className="flex flex-col gap-4">
            <InputRow
              field="produto_id"
              label="Produto"
              className="md:col-span-4 xl:col-span-3"
            >
              {isLoadingProdutos ? (
                <InputSkeleton />
              ) : produtos ? (
                <Select
                  id="produto_id"
                  name="produto_id"
                  placeholder="Selecione"
                  options={produtos.map((produto) => ({
                    value: produto.id,
                    label: `${produto.marca.nome.toUpperCase()} - ${produto.nome}`,
                  }))}
                  onChange={(evt) => handleChangeProduto(evt.target.value)}
                />
              ) : (
                <em>Erro</em>
              )}
            </InputRow>
            <InputRow
              field="oferta_id"
              label="Oferta"
              className="md:col-span-4 xl:col-span-3"
            >
              <Select
                id="oferta_id"
                name="oferta_id"
                placeholder="Selecione uma oferta"
                options={optionsOfertas.map((oferta) => ({
                  value: oferta.id,
                  label: oferta.nome,
                }))}
                onChange={(evt) =>
                  evt.target.value.length > 0
                    ? setOfertaId(evt.target.value)
                    : setOfertaId(null)
                }
              />
            </InputRow>
            <InputRow className="md:col-span-4 xl:col-span-3">
              <Button
                color="primary"
                onClick={handleSubmit}
                disabled={!ofertaId}
              >
                Prosseguir
              </Button>
            </InputRow>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
