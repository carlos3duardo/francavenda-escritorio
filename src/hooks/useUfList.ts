import { ApiUfProps } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useUfList() {
  const limit = 50;

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['queryUfList'],
    queryFn: async (): Promise<ApiUfProps[]> => {
      let ufs: ApiUfProps[] = [];
      let responseSize = 0;
      let loop = 0;

      do {
        const params = new URLSearchParams({
          offset: (loop * limit).toString(),
          limit: limit.toString(),
        });

        await fetch('/api/uf?' + params)
          .then((res) => res.json())
          .then((data) => {
            loop += 1;

            responseSize = data.data.length;

            ufs = ufs.concat(
              data.data.map((row: ApiUfProps) => {
                return row;
              }),
            );
          });
      } while (responseSize === limit);

      return ufs as unknown as ApiUfProps[];
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
