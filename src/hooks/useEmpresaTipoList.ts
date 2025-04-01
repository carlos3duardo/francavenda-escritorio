import { ApiEmpresaTipoProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useEmpresaTipoList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryEmpresaTipoList'],
    queryFn: async (): Promise<ApiEmpresaTipoProps[]> => {
      let tipos: ApiEmpresaTipoProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/empresa-tipo?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            tipos = tipos.concat(
              data.data.map((row: ApiEmpresaTipoProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return tipos as unknown as ApiEmpresaTipoProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
