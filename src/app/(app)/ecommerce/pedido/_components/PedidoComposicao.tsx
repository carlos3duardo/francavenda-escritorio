import { Card } from '@/components';
import { maskCpf } from '@/helpers';

type ItemProps = {
  id: string;
  descricao: string;
  cpf: string | null;
  tipo: {
    id: number;
    nome: string;
  };
  produto: {
    id: string;
    nome: string;
  };
};

interface PedidoHistoricoProps {
  isLoading: boolean;
  isSuccess: boolean;
  composicao: ItemProps[] | undefined;
}

export function PedidoComposicao({
  isLoading,
  isSuccess,
  composicao,
}: PedidoHistoricoProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && composicao) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.Label title="Composição" />
        </Card.Header>
        <Card.Separator />
        <Card.Body>
          {composicao ? (
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
                {composicao.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="text-sm font-medium py-2 px-2 border-t border-border dark:border-border-dark">
                        {item.descricao}
                      </td>
                      <td className="text-sm font-medium py-2 px-2 border-t border-border dark:border-border-dark">
                        {maskCpf(item.cpf)}
                      </td>
                      <td className="text-sm font-medium py-2 px-2 border-t border-border dark:border-border-dark">
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
    );
  }

  return <>Erro...</>;
}
