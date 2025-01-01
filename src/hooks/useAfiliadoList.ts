import { ApiAfiliadoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useAfiliadoList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryAfiliadoList'],
    queryFn: async (): Promise<ApiAfiliadoProps[]> => {
      let afiliados: ApiAfiliadoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/afiliado?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            afiliados = afiliados.concat(
              data.data.map((row: ApiAfiliadoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return afiliados as unknown as ApiAfiliadoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
