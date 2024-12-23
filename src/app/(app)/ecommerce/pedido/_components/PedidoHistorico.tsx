import { Card } from '@/components';
import { dateTimeBr } from '@/helpers';
import { Circle } from '@phosphor-icons/react/dist/ssr';

type SituacaoProps = {
  id: number;
  situacao: {
    id: number;
    nome: string;
    descricao: string;
    cor: string;
  };
  comentario: string;
  dados: string;
  created_at: string;
};

interface PedidoHistoricoProps {
  isLoading: boolean;
  isSuccess: boolean;
  historico: SituacaoProps[] | undefined;
}

export function PedidoHistorico({
  isLoading,
  isSuccess,
  historico,
}: PedidoHistoricoProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && historico) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.Label title="Histórico" />
        </Card.Header>
        <Card.Separator />
        <Card.Body>
          <ul className="flex flex-col gap-2">
            {historico.map((his) => {
              return (
                <li
                  key={his.id}
                  className="flex gap-4 border-b pb-2 last:border-b-0 border-border dark:border-border-dark"
                >
                  <div className="pt-[7px]">
                    <Circle
                      size={10}
                      weight="fill"
                      style={{ color: his.situacao.cor }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{his.situacao.nome}</div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {his.comentario}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {dateTimeBr(his.created_at)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card.Body>
      </Card.Root>
    );
  }

  return <>Erro...</>;
}
