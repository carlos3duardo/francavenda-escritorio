import { ApiAfiliadoRedeEmbaixadores } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useAfiliadoRedeEmbaixadores(afiliadoId: string) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['minha-rede', afiliadoId],
    queryFn: async (): Promise<ApiAfiliadoRedeEmbaixadores> => {
      const response = await fetch(`/api/me/minha-rede`).then((res) =>
        res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
