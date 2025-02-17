import { ApiProdutoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useProduto(id: string, relationships: string[] = []) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['produto', id, relationships],
    queryFn: async (): Promise<ApiProdutoProps> => {
      const params = new URLSearchParams({
        with: relationships.join(','),
      }).toString();

      const response = await fetch(`/api/produto/${id}?${params}`).then((res) =>
        res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
