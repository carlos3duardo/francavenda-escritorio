'use server';

import { cookies } from 'next/headers';

export async function getCookie(cookieName: string) {
  if (cookies().has(cookieName)) {
    return cookies().get(cookieName)?.value;
  }
  return null;
}
