'use client';
import { ApiPedidoProps } from '@/@types';
import { Card } from '@/components';
import { currency, dateTimeBr, maskCep, maskCpf } from '@/helpers';
import { Circle } from '@phosphor-icons/react/dist/ssr';

interface PedidoInfoProps {
  isLoading: boolean;
  isSuccess: boolean;
  pedido: ApiPedidoProps | undefined;
}

export function PedidoInfo({ isLoading, isSuccess, pedido }: PedidoInfoProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && pedido) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.Label title={`Pedido ${pedido?.numero}`} />
        </Card.Header>
        <Card.Separator />
        <Card.Grid>
          <Card.GridItem className="xl:col-span-6" label="Cliente">
            {pedido.cliente.nome}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Data da compra"
          >
            {dateTimeBr(pedido.created_at)}
          </Card.GridItem>

          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Situação"
          >
            <div className="flex items-center gap-1">
              <Circle
                size={10}
                weight="fill"
                style={{ color: pedido.situacao.cor }}
              />
              {pedido.situacao.nome}
            </div>
          </Card.GridItem>

          {/*  */}

          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="CPF">
            {maskCpf(pedido.cliente.documento)}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Código de Referência"
          >
            {pedido.codigo_referencia || <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-12 xl:col-span-6"
            label="Afiliado"
          >
            {pedido.afiliado ? pedido.afiliado.nome : <>&nbsp;</>}
          </Card.GridItem>

          {/*  */}

          <Card.GridItem
            className="md:col-span-12 xl:col-span-6"
            label="Produto / Serviço"
          >
            {pedido.produto.marca.nome} - {pedido.oferta.nome}
          </Card.GridItem>

          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="Valor">
            R$ {currency(pedido.valor)}
          </Card.GridItem>

          <Card.GridItem
            className="md:col-span-6 xl:col-span-3"
            label="Forma de pagamento"
          >
            {pedido.forma_pagamento.nome}
            {pedido.cartao && <>&nbsp;- Final {pedido.cartao.final}</>}
          </Card.GridItem>

          <Card.GridSeparator />

          <Card.GridItem
            className="md:col-span-6 xl:col-span-6"
            label="Endereço"
          >
            {pedido.endereco?.logradouro} {pedido.endereco?.numero}{' '}
            {pedido.endereco?.complemento}
          </Card.GridItem>
          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="Bairro">
            {pedido.endereco?.bairro}
          </Card.GridItem>
          <Card.GridItem className="md:col-span-6 xl:col-span-3" label="CEP">
            {pedido.endereco ? maskCep(pedido.endereco.cep) : <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-4"
            label="Município"
          >
            {pedido.endereco ? (
              `${pedido.endereco.municipio} - ${pedido.endereco.uf}`
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
          <Card.GridItem className="md:col-span-6 xl:col-span-4" label="E-mail">
            {pedido.cliente.email}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-4"
            label="Celular"
          >
            &nbsp;
          </Card.GridItem>
        </Card.Grid>
      </Card.Root>
    );
  }
}
