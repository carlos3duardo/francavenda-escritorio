import { ApiPedidoSituacaoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function usePedidoSituacaoList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryPedidoSituacaoList'],
    queryFn: async (): Promise<ApiPedidoSituacaoProps[]> => {
      let situacoes: ApiPedidoSituacaoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/pedido-situacao?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            situacoes = situacoes.concat(
              data.data.map((row: ApiPedidoSituacaoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return situacoes as unknown as ApiPedidoSituacaoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
