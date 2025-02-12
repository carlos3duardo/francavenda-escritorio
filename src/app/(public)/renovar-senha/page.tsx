import Image from 'next/image';
import imageBackground from '@/assets/images/senha-redefinir-background.jpg';
import frame from '@/assets/images/login-frame.png';

import logoFrancaVenda from '@/assets/images/logo-francavenda-lightmode.png';
import { Metadata } from 'next';
import FormRenovarSenha from './_components/FormRenovarSenha';

export const metadata: Metadata = {
  title: 'Renovar senha',
};

interface PageParams {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    [key: string]: string | string | undefined;
  }>;
}

export default async function RenovarSenha({ searchParams }: PageParams) {
  const { username, error } = await searchParams;

  return (
    <main className="flex flex-row-reverse w-full min-h-screen items-stretch">
      <div className="min-h-screen w-full md:pr-[60px] md:w-[420px] lg:w-[480px] bg-body-background dark:bg-body-background-dark flex flex-col items-center justify-center gap-2 2xl:gap-8 relative">
        <div className="absolute hidden md:block bg-body-background dark:bg-body-background-dark top-0 right-[100%] h-full w-[60px] z-30 rounded-l-[60px]" />
        <figure>
          <Image src={logoFrancaVenda} alt="logo" width={175} height={70} />
        </figure>
        <div className="text-center">
          {error === 'expired_password' ? (
            <>
              <h1 className="text-xl font-semibold">Sua senha expirou</h1>
              <p className="text-sm">
                Você precisa renovar a sua senha para poder acessar o sistema.
              </p>
            </>
          ) : (
            <h1 className="text-xl font-semibold">Renovar senha</h1>
          )}
        </div>
        <FormRenovarSenha username={username} />
      </div>
      <aside className="flex-1">
        <figure className="relative w-full h-full">
          <Image src={imageBackground} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-blue-800/40" />
          <figure className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <Image
              src={frame}
              alt=""
              fill
              className="object-cover opacity-80"
            />
          </figure>
        </figure>
      </aside>
    </main>
  );
}
