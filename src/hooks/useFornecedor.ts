import { ApiFornecedorProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useFornecedor(id: string, relationships: string[] = []) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['fornecedor', id, relationships],
    queryFn: async (): Promise<ApiFornecedorProps> => {
      const params = new URLSearchParams({
        with: relationships.join(','),
      }).toString();

      const response = await fetch(`/api/fornecedor/${id}?${params}`).then(
        (res) => res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
