import axios from 'axios';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('frv:token');

export const api = axios.create({
  baseURL: process.env.APP_HOST,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  },
});
