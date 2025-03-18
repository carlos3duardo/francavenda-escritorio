'use client';
import Link from 'next/link';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { ApiLancamentoProps } from '@/types';
import { currency, dateTimeBr } from '@/helpers';
import { Button, DateRangePicker, Select } from '@/components';
import dayjs, { Dayjs } from 'dayjs';
import { TimeRangePickerProps } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { useState } from 'react';
import { useAfiliadoList } from '@/hooks';

const columns = [
  {
    field: 'numero',
    label: 'Número',
    thClassName: 'text-center',
    tdClassName: 'text-center text-xs whitespace-nowrap',
    content: ({ id, gerado }: ApiLancamentoProps) => {
      return (
        <Link href={`/financeiro/lancamento/${id}`}>{dateTimeBr(gerado)}</Link>
      );
    },
  },
  {
    field: 'afiliado.apelido',
    label: 'Afiliado',
    thClassName: 'text-left',
    tdClassName: 'text-xs whitespace-nowrap',
    content: ({ id, afiliado }: ApiLancamentoProps) => {
      return (
        <Link href={`/financeiro/lancamento/${id}`}>{afiliado.apelido}</Link>
      );
    },
  },
  {
    field: 'categoria.nome',
    label: 'Categoria',
    thClassName: 'text-left',
    tdClassName: 'text-left text-xs whitespace-nowrap',
    content: ({ id, categoria }: ApiLancamentoProps) => {
      return (
        <Link href={`/financeiro/lancamento/${id}`}>{categoria.nome}</Link>
      );
    },
  },
  {
    field: 'descricao',
    label: 'Descrição',
    thClassName: 'text-left',
    tdClassName: 'text-xs',
    content: ({ id, descricao }: ApiLancamentoProps) => {
      return <Link href={`/financeiro/lancamento/${id}`}>{descricao}</Link>;
    },
  },
  {
    field: 'valor',
    label: 'Valor',
    thClassName: 'text-right',
    tdClassName: 'text-right text-xs whitespace-nowrap',
    content: ({ valor }: ApiLancamentoProps) => {
      return `R$ ${currency(valor)}`;
    },
  },
] as ColumnProps[];

export function LancamentoTabela() {
  const [inicio, setInicio] = useState<Dayjs | null>(
    dayjs().subtract(30, 'days'),
  );
  const [fim, setFim] = useState<Dayjs | null>(dayjs());

  const { data: afiliados } = useAfiliadoList();

  const presetIntervalDates: TimeRangePickerProps['presets'] = [
    {
      label: 'Hoje',
      value: [dayjs().startOf('day'), dayjs().endOf('day')],
    },
    {
      label: 'Mês atual',
      value: [dayjs().startOf('month'), dayjs().endOf('month')],
    },
    {
      label: 'Últimos 30 dias',
      value: [dayjs().subtract(30, 'days'), dayjs().endOf('day')],
    },
  ];

  const handleChange: RangePickerProps['onChange'] = (dates) => {
    setInicio(dates ? dates[0] : null);
    setFim(dates ? dates[1] : dayjs());
  };

  return (
    <DataTable.Root>
      <DataTable.Header>
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
            <label className="text-sm font-medium text-slate-400">
              Intervalo
            </label>
            <DateRangePicker
              id="intervalo"
              defaultValue={[dayjs().subtract(30, 'days'), dayjs()]}
              presets={presetIntervalDates}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <label className="text-sm font-medium text-slate-400">
              Afiliado
            </label>
            {afiliados && (
              <Select
                id="afiliado_id"
                placeholder="Todos"
                options={afiliados.map((afiliado) => {
                  return {
                    label: afiliado.usuario.apelido,
                    value: afiliado.id,
                  };
                })}
              />
            )}
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <label className="text-sm font-medium text-slate-400">Busca</label>
            <DataTable.Search containerClassName="max-w-full" />
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-2 2xl:col-span-3 self-end">
            <Button fullWidth>Filtrar</Button>
          </div>
        </div>
      </DataTable.Header>
      <DataTable.Content
        queryId={`lancamentos`}
        columns={columns}
        dataSrc={`/api/financeiro/lancamento?inicio=${inicio ? inicio.format('YYYY-MM-DD') : ''}&fim=${fim ? fim.format('YYYY-MM-DD') : ''}`}
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
