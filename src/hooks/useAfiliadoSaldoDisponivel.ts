import { ApiAfiliadoSaldoDisponivelProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useAfiliadoSaldoDisponivel(afiliadoId: string) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['saldo-disponivel', afiliadoId],
    queryFn: async (): Promise<ApiAfiliadoSaldoDisponivelProps> => {
      const params = new URLSearchParams({
        afiliadoId,
      }).toString();

      const response = await fetch(`/api/financeiro/saldo?${params}`).then(
        (res) => res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
