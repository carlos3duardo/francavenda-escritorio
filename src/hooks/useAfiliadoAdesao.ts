import { ApiAfiliadoAdesaoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useAfiliadoAdesao(afiliadoId: string) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['adesao', afiliadoId],
    queryFn: async (): Promise<ApiAfiliadoAdesaoProps> => {
      const response = await fetch('/api/me/adesao');

      if (response.status === 200) {
        return await response.json();
      }

      throw new Error('Erro ao buscar adesão');

      // console.log({ response });

      // return await fetch(`/api/me/adesao`).then((res) => {
      //   if (res.status === 400) {
      //     return res.json();
      //   }

      //   const error = await res.json();

      //   throw new Error(error.message || 'Erro ao buscar adesão');
      // });
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
