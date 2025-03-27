import { ApiOfertaProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useOferta(id: string, relationships: string[] = []) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['oferta', id, relationships],
    queryFn: async (): Promise<ApiOfertaProps> => {
      const params = new URLSearchParams({
        with: relationships.join(','),
      }).toString();

      const response = await fetch(`/api/oferta/${id}?${params}`).then((res) =>
        res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
