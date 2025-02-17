import { useQuery } from '@tanstack/react-query';

export function useAfiliadoCodigos(id: string) {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ['afiliado-codigos', id],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch(`/api/afiliado/${id}/codigo`).then((res) =>
        res.json(),
      );

      return response;
    },
    staleTime: 1000 * 10, // 10 seconds
  });

  return { isLoading, isSuccess, isError, data, error };
}
