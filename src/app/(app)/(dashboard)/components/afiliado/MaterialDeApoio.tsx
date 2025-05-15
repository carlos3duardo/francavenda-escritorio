import Image from 'next/image';
import Link from 'next/link';

import iconFiles from '@/assets/images/icons/folder.png';

export function MaterialDeApoio() {
  return (
    <div className="rounded bg-gradient-to-br from-orange-200 to-red-400 dark:from-orange-600 dark:to-red-800 text-red-800 dark:text-white/90 hover:ring hover:ring-red-400 dark:hover:ring-red-800 transition duration-200">
      <Link
        href="/downloads"
        title="Material de Apoio"
        className="text-inherit hover:text-inherit dark:text-inherit hover:dark:text-inherit data-[is-loading=true]:opacity-0"
      >
        <div className="flex items-center justify-between gap-6 p-4 2xl:p-6">
          <div className="flex-1">
            <header className="block text-xs font-bold uppercase">
              Material de apoio
            </header>
            <div className="text-xl font-bold">
              Encontre aqui material para download que podem lhe auxiliar a
              turbinar suas vendas
            </div>
          </div>
          <figure className="ml-16">
            <Image src={iconFiles} alt="" width={64} height={64} />
          </figure>
        </div>
      </Link>
    </div>
  );
}
