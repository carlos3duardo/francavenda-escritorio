import axios from 'axios';
import { cookies } from 'next/headers';

const cookieStore = cookies();
const accessToken = cookieStore.get('frv:token');

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${accessToken?.value}`,
    Accept: 'application/json',
  },
});
