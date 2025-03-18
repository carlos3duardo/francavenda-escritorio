import { ApiCategoriaFinanceiroProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useCategoriaFinanceiroList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryCategoriaFinanceiroList'],
    queryFn: async (): Promise<ApiCategoriaFinanceiroProps[]> => {
      let categorias: ApiCategoriaFinanceiroProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/financeiro/categoria?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            categorias = categorias.concat(
              data.data.map((row: ApiCategoriaFinanceiroProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return categorias as unknown as ApiCategoriaFinanceiroProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
