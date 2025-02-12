import { getClientAccessToken } from '@/actions/getClientAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = await getClientAccessToken();
  const body = await request.json();
  const { username } = body;

  const response = await fetch(
    `${process.env.API_URL}/password/recovery-token`,
    {
      body: JSON.stringify({
        username,
        method: 'link',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/redefinir-senha`,
        channel: 'email',
      }),
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
