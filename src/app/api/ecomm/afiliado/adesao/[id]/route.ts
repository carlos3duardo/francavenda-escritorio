import { NextRequest, NextResponse } from 'next/server';

type HttpResponseToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const adesaoId = (await params).id;
  const accessToken = await getAccessToken();

  const adesao = await fetch(
    `${process.env.API_URL}/ecomm/afiliado/adesao/${adesaoId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  ).then(async (res) => {
    return res.json();
  });

  return NextResponse.json(adesao, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const adesaoId = (await params).id;
  const accessToken = await getAccessToken();

  const contentType = request.headers.get('Content-Type');

  const data = await (contentType === 'application/json'
    ? request.json()
    : request.formData());

  const response = await fetch(
    `${process.env.API_URL}/ecomm/afiliado/adesao/${adesaoId}/payment`,
    {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  ).then(async (res) => {
    return res.json();
  });

  return NextResponse.json(response, { status: 200 });
}

async function getAccessToken() {
  return fetch(`${process.env.API_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Erro na requisição ao gerar Access Token. HTTP Status: ${response.status}`,
        );
      }
      const responseJson = (await response.json()) as HttpResponseToken;

      return responseJson.access_token;
    })
    .catch((error) => {
      throw new Error(`Erro na requisição: ${error.message}`);
    });
}
