'use server';

import { cookies } from 'next/headers';

export async function signOut() {
  (await cookies()).delete('frv:token');
  (await cookies()).delete('frv:refreshToken');
  (await cookies()).delete('frv:user');
}
