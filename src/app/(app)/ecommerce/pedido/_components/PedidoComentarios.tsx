import { Card } from '@/components';
import { dateTimeBr } from '@/helpers';
import { ChatDots } from '@phosphor-icons/react/dist/ssr';

type ComentarioProps = {
  id: string;
  comentario: string;
  categoria: {
    id: string;
    nome: string;
  };
  usuario: {
    id: string;
    nome: string;
  } | null;
  created_at: string;
};

interface PedidoHistoricoProps {
  isLoading: boolean;
  isSuccess: boolean;
  comentarios: ComentarioProps[] | undefined;
}

export function PedidoComentarios({
  isLoading,
  isSuccess,
  comentarios,
}: PedidoHistoricoProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Loader />
      </Card.Root>
    );
  }

  if (isSuccess && comentarios) {
    return (
      <Card.Root>
        <Card.Header>
          <Card.Label title="Comentários" />
        </Card.Header>
        <Card.Separator />
        <Card.Body>
          <ul className="flex flex-col gap-2">
            {comentarios.map((comentario) => {
              return (
                <li
                  key={comentario.id}
                  className="flex gap-4 border-b pb-2 last:border-b-0 border-border dark:border-border-dark"
                >
                  <div className="pt-[2px]">
                    <ChatDots size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {comentario.comentario.split('\n').map((item) => (
                        <span key={item}>
                          {item}
                          <br />
                        </span>
                      ))}
                    </div>
                    <div className="text-xs font-medium text-slate-400">
                      {comentario.usuario
                        ? `${comentario.usuario.nome} em `
                        : ''}
                      {dateTimeBr(comentario.created_at)}
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
