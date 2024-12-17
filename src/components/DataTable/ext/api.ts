import axios from 'axios';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('frv:token');

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  },
});
