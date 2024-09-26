import { NextRequest, NextResponse } from 'next/server';
import { addMinutes, fromUnixTime, getUnixTime } from 'date-fns';

type HttpResponseError = {
  error: string;
  message: string;
};

type HttpResponseToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export async function POST(request: NextRequest) {
  const { username, password, remember } = await request.json();

  try {
    const response = await fetch(`${process.env.API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        username,
        password,
      }),
    });

    if (!response.ok) {
      const data = (await response.json()) as HttpResponseError;

      if (data.error === 'invalid_client') {
        return NextResponse.json(
          {
            error: data.error,
            message: 'Falha na autenticação do cliente API.',
          },
          { status: 401 },
        );
      }

      if (data.error === 'invalid_grant') {
        return NextResponse.json(
          {
            error: data.error,
            message: 'Credenciais do usuário inválidas.',
          },
          { status: 401 },
        );
      }

      return NextResponse.json(
        {
          error: 'server_error',
          message:
            'Erro interno ao criar atenticação. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte.',
        },
        { status: 500 },
      );
    }

    const data = (await response.json()) as HttpResponseToken;

    const nextResponse = NextResponse.json({
      message: 'Credenciais validadas com sucesso.',
    });

    nextResponse.cookies.set({
      name: 'frv:token',
      value: data.access_token,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      maxAge: remember
        ? getUnixTime(addMinutes(fromUnixTime(data.expires_in), 60))
        : undefined,
      sameSite: 'strict',
      path: '/',
    });

    nextResponse.cookies.set({
      name: 'frv:refreshToken',
      value: data.refresh_token,
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      maxAge: remember
        ? getUnixTime(addMinutes(fromUnixTime(data.expires_in), 1440))
        : undefined,
      sameSite: 'strict',
      path: '/',
    });

    return nextResponse;
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Erro desconhecido: ' + err,
      },
      {
        status: 500,
      },
    );
  }
}
