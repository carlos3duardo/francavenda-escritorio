import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

type ResponseDataProps = {
  id: number;
  nome: string;
  ibge: string;
  uf: {
    id: number;
    nome: string;
    sigla: string;
  };
};

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token');

  const { searchParams } = new URL(request.url);
  const busca = searchParams.get('q');

  const endpoint = `${process.env.API_URL}/municipio?q=${busca}`;

  return await axios({
    url: endpoint,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      const data: ResponseDataProps[] = response.data.data;

      const options = data.map((item) => {
        return {
          value: item.id,
          label: `${item.nome} - ${item.uf.sigla}`,
        };
      });

      return NextResponse.json(options, { status: response.status });
    })
    .catch(function (err) {
      return NextResponse.json(err, { status: 500 });
    });
}
