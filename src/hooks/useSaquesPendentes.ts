import { ApiLancamentoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useSaquesPendentes() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['querySaquesPendentes'],
    queryFn: async (): Promise<ApiLancamentoProps[]> => {
      let saques: ApiLancamentoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
          pendentes: 'true',
        });

        await fetch('/api/financeiro/saque?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            saques = saques.concat(
              data.data.map((row: ApiLancamentoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return saques as unknown as ApiLancamentoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
