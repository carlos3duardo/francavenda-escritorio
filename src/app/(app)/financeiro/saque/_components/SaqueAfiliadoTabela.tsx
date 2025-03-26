'use client';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { Button, DateInput, Dialog } from '@/components';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { ApiSaqueProps } from '@/types';
import { currency, dateTimeBr } from '@/helpers';
import { FileSearch, FileX2 } from 'lucide-react';
import { UploadNotaFiscal } from './UploadNotaFiscal';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

interface SaqueTabelaProps {
  afiliadoId: string;
}

export function SaqueAfiliadoTabela({ afiliadoId }: SaqueTabelaProps) {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const [inicio, setInicio] = useState(
    searchParams.get('inicio') ||
      dayjs().subtract(90, 'days').format('YYYY-MM-DD'),
  );

  const [fim, setFim] = useState(
    searchParams.get('fim') || dayjs().format('YYYY-MM-DD'),
  );

  const [filters, setFilters] = useState({
    inicio,
    fim,
    afiliadoId,
  });

  const handleFilter = useCallback(() => {
    setFilters({ ...filters, inicio, fim });
  }, [filters, inicio, fim]);

  const handleDeleteNotaFiscal = useCallback(
    (saqueId: string) => {
      Dialog.ConfirmDelete.fire({
        title: 'Excluir arquivo',
        text: `Tem certeza que deseja excluir a nota fiscal deste saque?`,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .delete(`/api/financeiro/saque/${saqueId}/nota-fiscal`)
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

  const handleDownloadNotaFiscal = useCallback(async (saqueId: string) => {
    await axios
      .post(`/api/financeiro/saque/${saqueId}/nota-fiscal/download`, {
        body: JSON.stringify({}),
      })
      .then((response) => {
        window.open(response.data.url, '_blank');
      });
  }, []);

  const columns = [
    {
      field: 'gerado',
      label: 'Data',
      thClassName: 'text-left',
      tdClassName: 'text-left whitespace-nowrap',
      content: ({ gerado }: ApiSaqueProps) => {
        return dateTimeBr(gerado);
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
        return efetivado
          ? `Finalizado em ${dateTimeBr(efetivado)}`
          : 'Solicitado';
      },
    },
    {
      field: 'anexos',
      label: '',
      thClassName: 'text-right',
      tdClassName: 'text-right',
      content: ({ id, anexos }: ApiSaqueProps) => {
        return (
          <div className="flex items-center justify-end gap-2">
            {anexos.length > 0 ? (
              <>
                <Button
                  className="h-[28px] w-[28px] p-0"
                  title="Visualizar nota fiscal"
                  onClick={() => handleDownloadNotaFiscal(id)}
                >
                  <FileSearch size={16} />
                </Button>

                <Button
                  color="danger"
                  className="h-[28px] w-[28px] p-0"
                  title="Excluir nota fiscal"
                  onClick={() => handleDeleteNotaFiscal(id)}
                >
                  <FileX2 size={16} />
                </Button>
              </>
            ) : (
              <UploadNotaFiscal saqueId={id} />
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
