'use client';
import Link from 'next/link';
import { ColumnProps, DataTable } from '@/components/DataTable';
import { ApiLancamentoProps } from '@/types';
import { currency, dateTimeBr } from '@/helpers';
import { Button, DateInput, Dialog, Input, Select } from '@/components';
import dayjs from 'dayjs';
import { useAfiliadoList } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { MicrosoftExcelLogo } from '@phosphor-icons/react/dist/ssr';
import { useCategoriaFinanceiroList } from '@/hooks/useCategoriaFinanceiroList';

const columns = [
  {
    field: 'numero',
    label: 'Data',
    thClassName: 'text-center',
    tdClassName: 'text-center whitespace-nowrap',
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
    tdClassName: 'whitespace-nowrap',
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
    tdClassName: 'text-left whitespace-nowrap',
    content: ({ id, categoria }: ApiLancamentoProps) => {
      return (
        <Link href={`/financeiro/lancamento/${id}`}>{categoria.nome}</Link>
      );
    },
  },
  {
    field: 'descricao',
    label: 'Descrição',
    thClassName: '',
    tdClassName: '',
    content: ({ id, descricao }: ApiLancamentoProps) => {
      return <Link href={`/financeiro/lancamento/${id}`}>{descricao}</Link>;
    },
  },
  {
    field: 'valor',
    label: 'Valor',
    thClassName: 'text-right',
    tdClassName: 'text-right whitespace-nowrap',
    content: ({ valor }: ApiLancamentoProps) => {
      return `R$ ${currency(valor)}`;
    },
  },
] as ColumnProps[];

export function LancamentoTabela() {
  const [isProcessingExport, setIsProcessingExport] = useState(false);
  const searchParams = useSearchParams();

  const { data: afiliados } = useAfiliadoList();
  const { data: categorias } = useCategoriaFinanceiroList();

  const [inicio, setInicio] = useState(
    searchParams.get('inicio') ||
      dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
  );

  const [fim, setFim] = useState(
    searchParams.get('fim') || dayjs().format('YYYY-MM-DD'),
  );

  const [afiliadoId, setAfiliadoId] = useState(
    searchParams.get('afiliadoId') || '',
  );

  const [categoriaId, setCategoriaId] = useState(
    searchParams.get('categoriaId') || '',
  );

  const [search, setSearch] = useState(searchParams.get('search') || '');

  const [filters, setFilters] = useState({
    inicio,
    fim,
    afiliadoId,
    categoriaId,
    search,
  });

  const handleFilter = useCallback(() => {
    setFilters({ ...filters, inicio, fim, afiliadoId, categoriaId, search });
  }, [filters, inicio, fim, afiliadoId, categoriaId, search]);

  const handleExport = useCallback(async () => {
    setIsProcessingExport(true);

    try {
      const response = await fetch('/api/financeiro/lancamento/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });

      if (!response.ok) throw new Error('Erro ao gerar o relatório');

      const data = await response.json();

      if (data.url) window.open(data.url, '_blank');
    } catch (error) {
      Dialog.Error.fire({
        title: 'Erro ao gerar o relatório',
        text: (error as Error).message,
      });
    } finally {
      setIsProcessingExport(false);
    }
  }, [filters]);

  return (
    <DataTable.Root>
      <DataTable.Header>
        <DataTable.HeaderSection className="w-full grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
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
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
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
          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="inicio"
              className="text-sm text-slate-400 font-medium"
            >
              Afiliado:
            </label>
            <Select
              id="afiliado_id"
              label="Afiliado"
              placeholder="Todos"
              options={
                afiliados
                  ? afiliados.map((afiliado) => ({
                      label: afiliado.usuario.apelido,
                      value: afiliado.id,
                    }))
                  : []
              }
              onChange={(e) => setAfiliadoId(e.target.value)}
            />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="categoriaId"
              className="text-sm text-slate-400 font-medium"
            >
              Afiliado:
            </label>
            <Select
              id="categoriaId"
              label="Categoria"
              placeholder="Todas"
              options={
                categorias
                  ? categorias.map((categoria) => ({
                      label: categoria.nome,
                      value: categoria.id,
                    }))
                  : []
              }
              onChange={(e) => setCategoriaId(e.target.value)}
            />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2">
            <label
              htmlFor="search"
              className="text-sm text-slate-400 font-medium"
            >
              Busca:
            </label>
            <Input id="search" onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2 self-end">
            <div className="flex gap-2">
              <Button color="primary" fullWidth onClick={handleFilter}>
                Filtrar
              </Button>

              <Button
                color="primary"
                variant="outline"
                title="Exportar para Excel"
                onClick={handleExport}
                isLoading={isProcessingExport}
              >
                <MicrosoftExcelLogo size={20} />
              </Button>
            </div>
          </div>
        </DataTable.HeaderSection>
      </DataTable.Header>
      <DataTable.Content
        queryId={`lancamentos`}
        columns={columns}
        dataSrc="/api/financeiro/lancamento"
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
