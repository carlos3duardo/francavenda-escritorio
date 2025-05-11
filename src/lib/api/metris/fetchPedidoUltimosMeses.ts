import { api } from '@/services';

interface ActionProps {
  inicio?: string;
  fim?: string;
  afiliadoId?: string;
}

export async function fetchPedidoUltimosMeses({
  inicio,
  fim,
  afiliadoId,
}: ActionProps) {
  const response = await api()
    .get(`/metricas/comercial/pedidos`, {
      params: {
        inicio,
        fim,
        afiliadoId,
        frequencia: 'mes',
      },
    })
    .then((res) => res.data);

  console.log({ response });
  return [];
}
