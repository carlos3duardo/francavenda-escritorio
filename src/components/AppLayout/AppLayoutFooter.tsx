import Image from 'next/image';
import Link from 'next/link';

import iconeBussola from '@/assets/images/by-bussola-da-gestao-icon.svg';

export function AppLayoutFooter() {
  return (
    <footer className="h-12 pb-4 px-4 lg:px-8 flex justify-between items-center gap-4 text-sm text-slate-400 font-medium">
      <div className="w-full flex flex-col md:flex-row items-start md:items-cener md:justify-between">
        <div>
          {new Date().getFullYear()} &copy; Todos os direitos reservados
        </div>
        <div className="flex gap-4">
          <Link href="/">Termos de uso</Link>
          <Link href="/">Política de privacidade</Link>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Link href="https://bussoladagestao.com.br" target="_blank">
          <Image
            src={iconeBussola}
            width={18}
            height={18}
            alt="Desenvolvido pela Bússola da Gestão"
            title="Desenvolvido pela Bússola da Gestão"
            className="brightness-0 opacity-30 hover:brightness-100 hover:opacity-100 dark:invert dark:opacity-30 dark:hover:opacity-100 dark:hover:invert-0 transition duration-200"
          />
        </Link>
      </div>
    </footer>
  );
}
