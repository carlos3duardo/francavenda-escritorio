import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const host = process.env.APP_HOST;
  const local = host + '/api/';
  const endpoint = process.env.API_URL + '/' + request.url.slice(local.length);

  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token');

  return await axios({
    url: endpoint,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return NextResponse.json(response.data, { status: response.status });
    })
    .catch(function (err) {
      console.error(err.response.data);
      return NextResponse.json(err.response.data, { status: 500 });
    });
}

export async function POST(request: NextRequest) {
  const urlRequest = new URL(request.url);

  const host = process.env.APP_HOST;
  const local = host + '/api/';
  const endpoint = process.env.API_URL + '/' + request.url.slice(local.length);

  const contentType = request.headers.get('Content-Type');

  const data = await (contentType === 'application/json'
    ? request.json()
    : request.formData());

  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token');

  return axios({
    url: endpoint,
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (urlRequest.pathname === '/api/me/avatar') {
        const nextResponse = NextResponse.json(response.data);

        nextResponse.cookies.set({
          name: 'frv:user',
          value: JSON.stringify({
            id: response.data.usuario.id,
            admin: response.data.usuario.admin,
            nome: response.data.usuario.nome,
            apelido: response.data.usuario.apelido,
            email: response.data.usuario.email,
            avatarUrl: response.data.usuario.avatar_url,
            afiliado: response.data.usuario.afiliado,
          }),
          secure: true,
          httpOnly: false,
          sameSite: 'strict',
          path: '/',
        });

        return nextResponse;
      }

      return NextResponse.json(response.data, { status: response.status });
    })
    .catch(function (error) {
      return NextResponse.json(
        { message: error.response.data.message },
        { status: error.response.status },
      );
    });
}

export async function PUT(request: NextRequest) {
  const host = process.env.APP_HOST;
  const local = host + '/api/';
  const endpoint = process.env.API_URL + '/' + request.url.slice(local.length);
  const contentType = request.headers.get('Content-Type');

  const data = await (contentType === 'application/json'
    ? request.json()
    : request.formData());

  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token');

  return axios({
    url: endpoint,
    method: 'PUT',
    data,
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return NextResponse.json(response.data, { status: response.status });
    })
    .catch(function (error) {
      console.error(error);
      return NextResponse.json({ message: 'Eita...' }, { status: 500 });
    });
}

export async function PATCH(request: NextRequest) {
  const host = process.env.APP_HOST;
  const local = host + '/api/';
  const endpoint = process.env.API_URL + '/' + request.url.slice(local.length);

  const contentType = request.headers.get('Content-Type');

  const data = await (contentType === 'application/json'
    ? request.json()
    : request.formData());

  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token');

  return axios({
    url: endpoint,
    method: 'PATCH',
    data,
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return NextResponse.json(response.data, { status: response.status });
    })
    .catch(function (error) {
      console.error(error);
      return NextResponse.json({ message: 'Eita...' }, { status: 500 });
    });
}

export async function DELETE(request: NextRequest) {
  const host = process.env.APP_HOST;
  const local = host + '/api/';
  const endpoint = process.env.API_URL + '/' + request.url.slice(local.length);

  const cookieStore = cookies();
  const accessToken = cookieStore.get('frv:token');

  return await axios({
    url: endpoint,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return NextResponse.json(response.data, { status: 200 });
    })
    .catch(function () {
      return NextResponse.json({ message: 'Eita...' }, { status: 500 });
    });
}
