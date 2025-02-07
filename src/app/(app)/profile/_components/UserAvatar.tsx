'use client';
import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
// import { notification } from '@/lib';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

type UsuarioCookieProps = {
  id: string;
  admin: boolean;
  nome: string;
  apelido: string;
  email: string;
  avatarUrl: string;
  afiliado: {
    id: string;
  };
};

export function UserAvatar() {
  const [usuario, setUsuario] = useState<UsuarioCookieProps | null>(() => {
    const user = getCookie('frv:user');
    return user ? (JSON.parse(user as string) as UsuarioCookieProps) : null;
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  console.log({ usuario });

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || !evt.target.files.length) {
      return;
    }

    const file = evt.target.files[0];

    // Não pode ultrapassar 512kb
    if (file.size > 1024 * 512) {
      alert('A imagem não pode ultrapassar 512kb.');
      // notification({
      //   type: 'error',
      //   message: 'A imagem não pode ultrapassar 512kb',
      // });

      return;
    }

    axios
      .post(
        '/api/me/avatar',
        { avatar: evt.target.files[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        const user = {
          id: response.data.usuario.id,
          admin: response.data.usuario.admin,
          nome: response.data.usuario.nome,
          apelido: response.data.usuario.apelido,
          email: response.data.usuario.email,
          avatarUrl: response.data.usuario.avatar_url,
          afiliado: response.data.usuario.afiliado,
        };
        setCookie('usuario', JSON.stringify(user), {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
          secure: true,
          httpOnly: false,
        });
        // setEmpresas(response.data.usuario.empresas);
        setUsuario(user);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <figure className="group w-[196px] h-[196px] relative rounded-full ring-2 ring-white dark:bg-slate-900">
      <Image
        src={
          usuario && usuario.avatarUrl
            ? usuario.avatarUrl
            : '/images/avatar-placeholder.png'
        }
        alt="avatar"
        priority={true}
        width={196}
        height={196}
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
          aspectRatio: '1 / 1',
        }}
        className="rounded-full"
      />
      <button
        title="Atualizar foto"
        className="w-8 h-8 flex items-center justify-center rounded-full absolute bottom-3 right-3 bg-slate-400 dark:bg-slate-800 text-white ring-2 ring-white hover:bg-primary-400 duration-200"
        onClick={handleUploadClick}
      >
        <Camera size={18} />
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </figure>
  );
}
