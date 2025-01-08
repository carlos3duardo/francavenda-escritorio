import { ApiAfiliadoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useAfiliado(id: string, relationships: string[] = []) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['afiliado', id, relationships],
    queryFn: async (): Promise<ApiAfiliadoProps> => {
      const params = new URLSearchParams({
        with: relationships.join(','),
      }).toString();

      const response = await fetch(`/api/afiliado/${id}?${params}`).then(
        (res) => res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
