'use server';

import { cookies } from 'next/headers';

export async function getCookie(cookieName: string) {
  if ((await cookies()).has(cookieName)) {
    return (await cookies()).get(cookieName)?.value;
  }
  return null;
}
