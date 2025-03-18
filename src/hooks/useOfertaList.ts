import { ApiOfertaProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface HookProps {
  marcaId?: string;
}

export function useOfertaList({ marcaId }: HookProps) {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryOfertaList', marcaId],
    queryFn: async (): Promise<ApiOfertaProps[]> => {
      let afiliados: ApiOfertaProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
          marcaId: marcaId || '',
        });

        await fetch('/api/oferta?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            afiliados = afiliados.concat(
              data.data.map((row: ApiOfertaProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return afiliados as unknown as ApiOfertaProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
