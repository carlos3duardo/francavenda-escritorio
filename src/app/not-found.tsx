import Link from 'next/link';

import notFoundImage from '@/assets/images/page-not-found.svg';
import Image from 'next/image';
import { Button } from '@/components';

export default function NotFound() {
  return (
    <div className="w-full h-svh flex flex-col lg:flex-row gap-4 items-center justify-center bg-primary-500">
      <figure>
        <Image src={notFoundImage} alt="" width={280} height={280} />
      </figure>
      <div className="text-white flex flex-col gap-4 text-center lg:text-left">
        <h1 className="text-[2rem] font-bold">Página não encontrada</h1>
        <p className="text-lg font-medium">
          A página que você procurava não existe ou o cachorro comeu.
        </p>
        <Link href="/">
          <Button color="white">Voltar para o início</Button>
        </Link>
      </div>
    </div>
  );
}
