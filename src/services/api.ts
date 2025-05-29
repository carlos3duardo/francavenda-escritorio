import axios from 'axios';
import { cookies } from 'next/headers';

export async function api() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('frv:token');

  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      Accept: 'application/json',
    },
  });
}
