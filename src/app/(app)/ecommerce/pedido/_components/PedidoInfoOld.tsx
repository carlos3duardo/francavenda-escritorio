'use client';
import { Card } from '@/components';
import { currency, dateTimeBr, maskCep, maskCpf } from '@/helpers';
import { usePedido } from '@/hooks';
import { Circle } from '@phosphor-icons/react/dist/ssr';

interface PedidoInfoProps {
  id: string;
}

export function PedidoInfo({ id }: PedidoInfoProps) {
  const {
    data: pedido,
    isLoading,
    isSuccess,
  } = usePedido(id, [
    'historico',
    'composicao',
    'comentarios',
    'endereco',
    'comentarios',
  ]);

  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (pedido && isSuccess) {
    return (
      <div className="flex flex-col gap-4">
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
            <Card.GridItem
              className="md:col-span-6 xl:col-span-4"
              label="Produto / Serviço"
            >
              {pedido.produto.marca.nome} - {pedido.oferta.nome}
            </Card.GridItem>
            <Card.GridItem
              className="md:col-span-6 xl:col-span-2"
              label="Valor"
            >
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
              className="md:col-span-6 xl:col-span-3"
              label="Afiliado"
            >
              {pedido.afiliado ? pedido.afiliado.nome : <>&nbsp;</>}
            </Card.GridItem>

            <Card.GridSeparator />

            <Card.GridItem
              className="md:col-span-6 xl:col-span-6"
              label="Endereço"
            >
              {pedido.endereco?.logradouro} {pedido.endereco?.numero}{' '}
              {pedido.endereco?.complemento}
            </Card.GridItem>
            <Card.GridItem
              className="md:col-span-6 xl:col-span-3"
              label="Bairro"
            >
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
            <Card.GridItem
              className="md:col-span-6 xl:col-span-4"
              label="E-mail"
            >
              {pedido.cliente.email}
            </Card.GridItem>
            <Card.GridItem
              className="md:col-span-6 xl:col-span-4"
              label="Celular"
            >
              &nbsp;
            </Card.GridItem>
          </Card.Grid>
          <Card.Separator />
        </Card.Root>
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-7 flex flex-col gap-4">
            <Card.Root>
              <Card.Header>
                <Card.Label title="Composição" />
              </Card.Header>
              <Card.Separator />
              <Card.Body>
                {pedido.composicao ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          Nome
                        </th>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          CPF
                        </th>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          Tipo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedido.composicao.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              {item.descricao}
                            </td>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              {maskCpf(item.cpf)}
                            </td>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              {item.tipo.nome}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <>Composição do pedido não carregado</>
                )}
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Card.Label title="Comentários" />
              </Card.Header>
              <Card.Separator />
              <Card.Body>
                {pedido.comentarios ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          Comentário
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedido.comentarios.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              {item.comentario}
                              <div className="text-xs text-slate-400">
                                {item.usuario ? `${item.usuario.nome} em ` : ''}
                                {dateTimeBr(item.created_at)}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <>Composição do pedido não carregado</>
                )}
              </Card.Body>
            </Card.Root>
          </div>
          <div className="col-span-12 xl:col-span-5">
            <Card.Root>
              <Card.Header>
                <Card.Label title="Histórico" />
              </Card.Header>
              <Card.Separator />
              <Card.Body>
                {pedido.historico ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          Situação
                        </th>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          Comentário
                        </th>
                        <th className="text-sm text-slate-400 font-medium uppercase py-2 px-2 text-left">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedido.historico.map((historico) => {
                        return (
                          <tr key={historico.id}>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              <div className="flex items-center gap-2">
                                <Circle
                                  size={10}
                                  weight="fill"
                                  style={{ color: historico.situacao.cor }}
                                />

                                {historico.situacao.nome}
                              </div>
                            </td>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              {historico.comentario}
                            </td>
                            <td className="text-sm text-slate-600 font-medium py-2 px-2 border-t border-t-slate-200">
                              {dateTimeBr(historico.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <>Sem histórico</>
                )}
              </Card.Body>
            </Card.Root>
          </div>
        </div>
      </div>
    );
  }
}
