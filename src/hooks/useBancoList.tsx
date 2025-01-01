import { ApiBancoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useBancoList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryBancoList'],
    queryFn: async (): Promise<ApiBancoProps[]> => {
      let bancos: ApiBancoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/banco?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            bancos = bancos.concat(
              data.data.map((row: ApiBancoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return bancos as unknown as ApiBancoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
