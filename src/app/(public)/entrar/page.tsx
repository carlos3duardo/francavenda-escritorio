import type { Metadata } from 'next';
import Image from 'next/image';
import { FormLogin } from '@/components';

import frame from '@/assets/images/login-frame.png';
import logoFrancaVenda from '@/assets/images/logo-francavenda-lightmode.png';
import imageBackground from '@/assets/images/login-image-background2.jpg';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Escritório virtual',
    openGraph: {
      images: `${process.env.NEXT_PUBLIC_APP_PUBLIC_URL}/api/og.png`,
    },
  };
}

export default function Home() {
  return (
    <main className="flex w-full min-h-screen items-stretch">
      <div className="min-h-screen w-full md:pl-[60px] md:w-[420px] lg:w-[480px] bg-body-background dark:bg-body-background-dark flex flex-col items-center justify-center gap-8 relative">
        <div className="absolute hidden md:block bg-body-background dark:bg-body-background-dark top-0 left-[100%] h-full w-[60px] z-30 rounded-r-[60px]" />
        <figure>
          <Image src={logoFrancaVenda} alt="logo" width={175} height={70} />
        </figure>
        <FormLogin />
      </div>
      <aside className="flex-1 bg-red-400">
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
