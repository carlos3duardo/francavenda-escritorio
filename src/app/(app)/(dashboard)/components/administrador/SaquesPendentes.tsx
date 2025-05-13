'use client';

import Lottie from 'lottie-react';
import { Card, Table } from '@/components';
import tableLoading from '@/assets/lotties/table-loading.json';
import { currency, dateTimeBr } from '@/helpers';
import { useSaquesPendentes } from '@/hooks/useSaquesPendentes';
import Link from 'next/link';

export function SaquesPendentes() {
  const { data: saques, isLoading } = useSaquesPendentes();

  return (
    <Card.Root>
      <Card.Header>
        <Card.HeaderSection>
          <Card.Label title="Solicitações pendentes de saque" />
        </Card.HeaderSection>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        {isLoading ? (
          <figure className="w-24 h-24 mx-auto">
            <Lottie animationData={tableLoading} />
          </figure>
        ) : saques ? (
          saques.length > 0 ? (
            <>
              <Table.Root>
                <Table.Head>
                  <Table.Row>
                    <Table.Header>Afiliado</Table.Header>
                    <Table.Header>Data</Table.Header>
                    <Table.Header className="text-right">Valor</Table.Header>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {saques
                    .filter((_, i) => i <= 4)
                    .map((lancamento) => (
                      <Table.Row key={lancamento.id}>
                        <Table.Cell className="text-sm">
                          <Link href="/financeiro/saque">
                            {lancamento.afiliado.apelido}
                          </Link>
                        </Table.Cell>
                        <Table.Cell className="text-sm">
                          <Link href="/financeiro/saque">
                            {dateTimeBr(lancamento.gerado)}
                          </Link>
                        </Table.Cell>
                        <Table.Cell className="text-sm text-right">
                          <Link href="/financeiro/saque">
                            {currency(lancamento.valor)}
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
                {saques.length > 5 && (
                  <Table.Foot>
                    <Table.Row>
                      <Table.Cell colSpan={4} className="text-center">
                        <Link href="/financeiro/saque" className="text-sm">
                          {saques.length - 5} saques pendentes no total
                          <br />
                          Clique aqui para visualizar a página de saques
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Foot>
                )}
              </Table.Root>
            </>
          ) : (
            <>Nenhum saque pendente</>
          )
        ) : (
          <>...</>
        )}
      </Card.Body>
    </Card.Root>
  );
}
