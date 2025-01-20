import { ApiMarcaProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useMarca(id: string, relationships: string[] = []) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['marca', id, relationships],
    queryFn: async (): Promise<ApiMarcaProps> => {
      const params = new URLSearchParams({
        with: relationships.join(','),
      }).toString();

      const response = await fetch(`/api/marca/${id}?${params}`).then((res) =>
        res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
