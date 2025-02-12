import { getClientAccessToken } from '@/actions/getClientAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = await getClientAccessToken();
  const body = await request.json();

  if (body.password === body.new_password) {
    return NextResponse.json(
      {
        message: 'A nova senha deve ser diferente da senha atual.',
      },
      {
        status: 400,
      },
    );
  }

  if (body.new_password !== body.new_password_confirm) {
    return NextResponse.json(
      {
        message: 'As senhas devem ser iguais.',
      },
      {
        status: 400,
      },
    );
  }

  return await fetch(`${process.env.API_URL}/password/renew`, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    const response = await res.json();

    if (res.status === 200) {
      return NextResponse.json(
        { message: 'Senha alterada com sucesso.' },
        { status: res.status },
      );
    }

    if (res.status === 400) {
      return NextResponse.json(response, { status: res.status });
    }

    return NextResponse.json(response, { status: res.status });
  });
}
