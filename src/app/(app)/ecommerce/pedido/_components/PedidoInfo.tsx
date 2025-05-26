'use client';

import { Circle } from '@phosphor-icons/react/dist/ssr';
import { ApiPedidoProps } from '@/types';
import { Card } from '@/components';
import {
  currency,
  dateBr,
  dateTimeBr,
  maskCep,
  maskCnpj,
  maskCpf,
  maskTelefone,
} from '@/helpers';
import { PedidoDropdownMenu } from './PedidoDropdownMenu';

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
          <Card.Toolbar>
            <PedidoDropdownMenu pedido={pedido} />
          </Card.Toolbar>
        </Card.Header>

        <Card.Separator />

        <Card.Grid>
          {pedido.cliente.usuario ? (
            <>
              <Card.GridItem className="xl:col-span-6" label="Razão Social">
                {pedido.cliente.usuario.nome}
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
              <Card.GridItem
                className="md:col-span-6 xl:col-span-3"
                label="CPF"
              >
                {pedido.cliente.usuario.cpf ? (
                  maskCpf(pedido.cliente.usuario.cpf)
                ) : (
                  <>&nbsp;</>
                )}
              </Card.GridItem>
              <Card.GridItem
                className="md:col-span-6 xl:col-span-3"
                label="Nascimento"
              >
                {pedido.cliente.usuario.nascimento ? (
                  dateBr(pedido.cliente.usuario.nascimento)
                ) : (
                  <>&nbsp;</>
                )}
              </Card.GridItem>

              <Card.GridItem className="md:col-span-6 xl:col-span-3" label="RG">
                {pedido.cliente.usuario.rg ? (
                  pedido.cliente.usuario.rg
                ) : (
                  <>&nbsp;</>
                )}
                {pedido.cliente.usuario.rg_emissor ? (
                  ` / ${pedido.cliente.usuario.rg_emissor}`
                ) : (
                  <>&nbsp;</>
                )}
              </Card.GridItem>

              <Card.GridItem
                className="md:col-span-6 xl:col-span-3"
                label="Sexo"
              >
                {pedido.cliente.usuario.sexo ? (
                  pedido.cliente.usuario.sexo.nome
                ) : (
                  <>&nbsp;</>
                )}
              </Card.GridItem>
            </>
          ) : pedido.cliente.empresa ? (
            <>
              <Card.GridItem className="xl:col-span-6" label="Razão Social">
                {pedido.cliente.empresa.razao_social}
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
              <Card.GridItem className="xl:col-span-6" label="Nome Fantasia">
                {pedido.cliente.empresa.nome_fantasia}
              </Card.GridItem>
              <Card.GridItem className="xl:col-span-3" label="CNPJ">
                {maskCnpj(pedido.cliente.empresa.cnpj)}
              </Card.GridItem>
              <Card.GridItem className="xl:col-span-3" label="Tipo">
                {pedido.cliente.empresa.tipo?.nome || <>&nbsp;</>}
              </Card.GridItem>

              <Card.GridItem className="xl:col-span-6" label="Contato">
                {pedido.cliente.empresa.contato || <>&nbsp;</>}
              </Card.GridItem>
              <Card.GridItem className="xl:col-span-3" label="E-mail">
                {pedido.cliente.empresa.email || <>&nbsp;</>}
              </Card.GridItem>
              <Card.GridItem className="xl:col-span-3" label="Telefone">
                {pedido.cliente.empresa.telefone ? (
                  maskTelefone(pedido.cliente.empresa.telefone)
                ) : (
                  <>&nbsp;</>
                )}
              </Card.GridItem>
            </>
          ) : (
            <>Tipo de cliente desconhecido ({pedido.cliente.natureza})</>
          )}
          <Card.GridSeparator />
          <Card.GridItem
            className="md:col-span-12 xl:col-span-6"
            label="Produto / Serviço"
          >
            {pedido.produto.marca.nome} - {pedido.oferta?.nome}
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
          <Card.GridItem
            className="md:col-span-12 xl:col-span-6"
            label="Afiliado"
          >
            {pedido.afiliado ? pedido.afiliado.nome : <>&nbsp;</>}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-6"
            label="Código de Referência"
          >
            {pedido.codigo_referencia || <>&nbsp;</>}
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
            {pedido.cliente.empresa ? (
              pedido.cliente.empresa.email
            ) : pedido.cliente.usuario ? (
              pedido.cliente.usuario.email
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
          <Card.GridItem
            className="md:col-span-6 xl:col-span-4"
            label="Celular"
          >
            {pedido.cliente.empresa && pedido.cliente.empresa.telefone ? (
              maskTelefone(pedido.cliente.empresa.telefone)
            ) : pedido.cliente.usuario && pedido.cliente.usuario.celular ? (
              maskTelefone(pedido.cliente.usuario.celular)
            ) : (
              <>&nbsp;</>
            )}
          </Card.GridItem>
        </Card.Grid>
      </Card.Root>
    );
  }
}
