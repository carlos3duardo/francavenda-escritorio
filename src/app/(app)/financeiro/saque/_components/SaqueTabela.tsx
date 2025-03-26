'use client';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { Button, DateInput, Dialog } from '@/components';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { ApiSaqueProps } from '@/types';
import { currency, dateTimeBr } from '@/helpers';
import { Check, CircleCheck, Timer } from 'lucide-react';
import { ModalAnexos } from './ModalAnexos';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export function SaqueTabela() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const [inicio, setInicio] = useState(
    searchParams.get('inicio') ||
      dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
  );

  const [fim, setFim] = useState(
    searchParams.get('fim') || dayjs().format('YYYY-MM-DD'),
  );
  const [filters, setFilters] = useState({
    inicio,
    fim,
  });

  const handleFilter = useCallback(() => {
    setFilters({ ...filters, inicio, fim });
  }, [filters, inicio, fim]);

  type ConfirmProps = {
    saqueId: string;
    valor: number;
    afiliadoNome: string;
  };

  const handleAprovarSaque = useCallback(
    (props: ConfirmProps) => {
      Dialog.Confirm.fire({
        title: 'Aprovar lançamento?',
        html: `Você confirma a aprovação do saque de R$ ${currency(props.valor)} do afiliado ${props.afiliadoNome}?`,
        confirmButtonText: 'Aprovar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log('...');
          axios
            .patch(`/api/financeiro/saque/${props.saqueId}/aprovar`, {})
            .then(async () => {
              await queryClient.refetchQueries({
                queryKey: ['historico-saques'],
                exact: false,
              });
            });
        }
      });
    },
    [queryClient],
  );

  const columns = [
    {
      field: 'gerado',
      label: 'Data',
      thClassName: 'text-center',
      tdClassName: 'text-center whitespace-nowrap',
      content: ({ gerado }: ApiSaqueProps) => {
        return dateTimeBr(gerado);
      },
    },
    {
      field: 'afiliado.nome',
      label: 'Embaixador',
      thClassName: 'text-left',
      tdClassName: 'text-left',
      content: ({ afiliado }: ApiSaqueProps) => {
        return afiliado.nome;
      },
    },
    {
      field: 'valor',
      label: 'Valor',
      thClassName: 'text-right',
      tdClassName: 'text-right whitespace-nowrap',
      content: ({ valor }: ApiSaqueProps) => {
        return currency(valor);
      },
    },
    {
      field: 'efetivado',
      label: 'Situação',
      thClassName: 'text-left',
      tdClassName: 'text-left',
      content: ({ efetivado }: ApiSaqueProps) => {
        return efetivado ? (
          <span className="flex items-center gap-2">
            <CircleCheck size={18} className="text-emerald-400" /> Finalizado em
            {` ${dateTimeBr(efetivado)}`}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Timer size={18} className="text-orange-400" /> Pendente
          </span>
        );
      },
    },
    {
      field: 'anexos',
      label: '',
      thClassName: 'text-right',
      tdClassName: 'text-right',
      content: ({ id, afiliado, valor, efetivado, anexos }: ApiSaqueProps) => {
        return (
          <div className="flex items-center justify-end gap-2">
            {anexos.length > 0 && <ModalAnexos anexos={anexos} />}{' '}
            {!efetivado && (
              <Button
                className="h-[28px] w-[28px] p-0 bg-emerald-400 hover:bg-emerald-600"
                title="Aprovar solicitação"
                onClick={() =>
                  handleAprovarSaque({
                    saqueId: id,
                    valor,
                    afiliadoNome: afiliado.nome,
                  })
                }
              >
                <Check size={16} />
              </Button>
            )}
          </div>
        );
      },
    },
  ] as ColumnProps[];

  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.HeaderSection className="w-full grid grid-cols-12">
          <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-3 2xl:col-start-5">
            <label
              htmlFor="inicio"
              className="text-sm text-slate-400 font-medium"
            >
              Início:
            </label>
            <DateInput
              id="inicio"
              label="Inicio"
              allowEmpty={false}
              defaultValue={dayjs().subtract(30, 'days').format('YYYY-MM-DD')}
              onChange={(date) => setInicio(date?.format('YYYY-MM-DD'))}
            />
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-3">
            <label htmlFor="fim" className="text-sm text-slate-400 font-medium">
              Fim:
            </label>
            <DateInput
              id="fim"
              label="Fim"
              defaultValue={dayjs().format('YYYY-MM-DD')}
              onChange={(date) => setFim(date?.format('YYYY-MM-DD'))}
            />
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-2 self-end">
            <div className="flex gap-2">
              <Button color="primary" fullWidth onClick={handleFilter}>
                Filtrar
              </Button>
            </div>
          </div>
        </DataTable.HeaderSection>
      </DataTable.Header>
      <DataTable.Content
        queryId={`historico-saques`}
        columns={columns}
        dataSrc="/api/financeiro/saque"
        defaultParams={filters}
      />
      <DataTable.Footer>
        <DataTable.FooterSection>
          <DataTable.RowsCount />
        </DataTable.FooterSection>
        <DataTable.FooterSection>
          <DataTable.PageCount />
          <DataTable.Pagination />
        </DataTable.FooterSection>
      </DataTable.Footer>
    </DataTable.Root>
  );
}
