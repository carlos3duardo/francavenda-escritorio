import { ApiServicoAssinaturaProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useServicoAssinaturaList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryServicoAssinaturaList'],
    queryFn: async (): Promise<ApiServicoAssinaturaProps[]> => {
      let servicos: ApiServicoAssinaturaProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/servico-assinatura?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            servicos = servicos.concat(
              data.data.map((row: ApiServicoAssinaturaProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return servicos as unknown as ApiServicoAssinaturaProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
