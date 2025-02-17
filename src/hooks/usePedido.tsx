import { ApiPedidoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function usePedido(id: string, relationships: string[] = []) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['pedido', id, relationships],
    queryFn: async (): Promise<ApiPedidoProps> => {
      const params = new URLSearchParams({
        with: relationships.join(','),
      }).toString();

      const response = await fetch(`/api/pedido/${id}?${params}`).then((res) =>
        res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
