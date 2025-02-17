import { ApiSexoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useSexoList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['querySexoList'],
    queryFn: async (): Promise<ApiSexoProps[]> => {
      let sexos: ApiSexoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/sexo?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            sexos = sexos.concat(
              data.data.map((row: ApiSexoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return sexos as unknown as ApiSexoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
