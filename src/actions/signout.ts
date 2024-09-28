'use server';

import { cookies } from 'next/headers';

export async function signOut() {
  cookies().delete('frv:token');
  cookies().delete('frv:refreshToken');
}
