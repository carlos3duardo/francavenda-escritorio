import jwt from 'jsonwebtoken';
import { isBefore, fromUnixTime } from 'date-fns';

export function isTokenExpired(token: string): boolean {
  const decoded = jwt.decode(token) as { exp?: number } | null;

  if (!decoded?.exp) return true;

  const expirationDate = fromUnixTime(decoded.exp);
  const now = new Date();

  return isBefore(expirationDate, now);
}

export async function isTokenActive(token: string): Promise<boolean> {
  if (isTokenExpired(token)) {
    return false;
  }

  try {
    const response = await fetch(process.env.API_URL + '/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
}
