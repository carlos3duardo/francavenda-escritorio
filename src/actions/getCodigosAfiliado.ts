import { api } from '@/services';

export async function getCodigosAfiliado(id: string) {
  const response = await api
    .get(`/afiliado/${id}/codigo`)
    .then((res) => res.data);

  return response;
}
