import { api } from '@/services';
import { GraficoVendasAfiliado } from './GraficoVendasAfiliado';
import { RankingAfiliados } from './RankingAfiliados';

type ResponseProps = {
  relatorio: {
    ano: number;
    mes: number;
    pedidos: number;
    situacoes: {
      id: number;
      nome: string;
      cor: string;
      quantidade: number;
      valor: number;
    }[];
  }[];
};

export async function HomeAdmin() {
  const response = await api()
    .get('/metricas/comercial/pedidos', {
      params: {
        frequencia: 'mes',
      },
    })
    .then((res) => res.data as unknown as ResponseProps);

  const data = {
    categories: response.relatorio.map((item) => {
      const mes = new Date(0, item.mes - 1, 1).toLocaleString('pt-BR', {
        month: 'long',
      });

      return `${mes.substring(0, 3)} ${item.ano}`;
    }),
    series: [
      {
        name: 'Pedidos aprovados',
        type: 'column' as const,
        data: response.relatorio.map((item) => {
          const aprovado = item.situacoes.find(
            (situacao) => situacao.id === 12,
          );

          return aprovado ? aprovado.quantidade : 0;
        }),
        color: 'oklch(58.8% 0.158 241.966)',
      },
      {
        name: 'Total de pedidos',
        type: 'spline' as const,
        data: response.relatorio.map((item) => item.pedidos),
        color: 'oklch(95.4% 0.038 75.164)',
      },
    ],
  };
  return (
    <div className="grid grid-cols-12 gap-4 2xl:gap-6">
      <div className="col-span-12 xl:col-span-7">
        <GraficoVendasAfiliado
          categories={data.categories}
          series={data.series}
        />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <RankingAfiliados />
      </div>
    </div>
  );
}
