'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { Card, Table } from '@/components';

import tableLoading from '@/assets/lotties/table-loading.json';
import axios from 'axios';
import { currency } from '@/helpers';
import { format, subDays } from 'date-fns';

type AfiliadoProps = {
  id: string;
  nome: string;
  quantidade: number;
  valor: number;
};

export function RankingAfiliados() {
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState<AfiliadoProps[]>([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const fetchRanking = async () => {
      await axios
        .get(`/api/metricas/comercial/ranking/afiliados`, {
          params: {
            inicio: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
            fim: format(new Date(), 'yyyy-MM-dd'),
          },
        })
        .then((res) => {
          const afiliados = res.data as unknown as AfiliadoProps[];
          setRanking(afiliados);
          setIsLoading(false);

          setMaxValue(
            afiliados.reduce((max, afiliado) => {
              if (afiliado.valor > max) {
                return afiliado.valor;
              }

              return max;
            }, 0),
          );
        });
    };

    fetchRanking();
  }, []);

  return (
    <Card.Root>
      <Card.Header>
        <Card.HeaderSection>
          <Card.Label title="Ranking de afiliados" />
        </Card.HeaderSection>
        <Card.HeaderSection>
          <span className="block text-sm font-semibold text-gray-400">
            Últimos 30 dias
          </span>
        </Card.HeaderSection>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        {isLoading ? (
          <figure className="w-24 h-24 mx-auto">
            <Lottie animationData={tableLoading} />
          </figure>
        ) : (
          <Table.Root>
            <Table.Head>
              <Table.Row>
                <Table.Header>Nome</Table.Header>
                <Table.Header className="text-right">Quantidade</Table.Header>
                <Table.Header className="text-right">Valor</Table.Header>
                <Table.Header>&nbsp;</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {ranking.map((afiliado) => (
                <Table.Row key={afiliado.id}>
                  <Table.Cell className="text-sm">{afiliado.nome}</Table.Cell>
                  <Table.Cell className="text-sm text-right">
                    {afiliado.quantidade}
                  </Table.Cell>
                  <Table.Cell className="text-sm text-right">
                    {currency(afiliado.valor)}
                  </Table.Cell>
                  <Table.Cell>
                    <figure className="w-[100px]">
                      <div
                        data-tamanho={Math.round(
                          (afiliado.valor * 100) / maxValue,
                        )}
                        className="bg-primary-400 dark:bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${Math.round(
                            (afiliado.valor * 100) / maxValue,
                          )}%`,
                        }}
                      />
                    </figure>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Card.Body>
    </Card.Root>
  );
}
