import { ApiProdutoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useProdutoList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryProdutoList'],
    queryFn: async (): Promise<ApiProdutoProps[]> => {
      let afiliados: ApiProdutoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/produto?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            afiliados = afiliados.concat(
              data.data.map((row: ApiProdutoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return afiliados as unknown as ApiProdutoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
