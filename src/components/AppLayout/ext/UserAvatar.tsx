'use server';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { cookies } from 'next/headers';

import avatarPlaceHolder from '@/assets/images/avatar-placeholder.jpg';

type UsuarioCookieProps = {
  id: string;
  nome: string;
  email: string;
  avatarUrl: string;
  empresa: {
    id: string;
    nome: string;
    logotipoUrl: string;
  };
};

export default async function UserAvatar() {
  const cookieStore = await cookies();
  const usuario = cookieStore.get('frv:user')?.value
    ? (JSON.parse(
        cookieStore.get('frv:user')?.value as string,
      ) as UsuarioCookieProps)
    : undefined;

  return (
    <figure className="group w-[42px] h-[42px] relative rounded-full ring-2 ring-white hover:ring-slate-400 transition duration-200">
      <Image
        src={
          usuario && usuario.avatarUrl ? usuario.avatarUrl : avatarPlaceHolder
        }
        alt="avatar"
        width={42}
        height={42}
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
          aspectRatio: '1 / 1',
        }}
        className="rounded-full"
      />
      <span className="absolute left-[calc(100%-8px)] top-[calc(50%-8px)] bg-white group-hover:bg-slate-400 group-hover:text-white block rounded-full transition duration-200">
        <ChevronDown size={16} />
      </span>
    </figure>
  );
}
