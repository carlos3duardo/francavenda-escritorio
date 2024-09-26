import Image from 'next/image';
import imageBackground from '@/assets/images/login-image-background3.jpg';
import frame from '@/assets/images/login-frame.png';

import logoFrancaVenda from '@/assets/images/logo-francavenda-lightmode.png';
import { FormLogin } from '@/components';

export default function Home() {
  return (
    <main className="flex w-full min-h-screen items-stretch">
      <div className="min-h-screen w-full md:pl-[60px] md:w-[420px] lg:w-[480px] bg-white flex flex-col items-center justify-center gap-8 relative">
        <div className="absolute hidden md:block bg-white top-0 left-[100%] h-full w-[60px] z-30 rounded-r-[60px]" />
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
              className="object-cover opacity-90"
            />
          </figure>
        </figure>
      </aside>
    </main>
  );
}
