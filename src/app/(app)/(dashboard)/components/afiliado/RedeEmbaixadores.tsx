'use client';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { useAfiliadoRedeEmbaixadores } from '@/hooks';

import loadingIcon from '@/assets/lotties/progress.json';
import networkingIcon from '@/assets/images/icons/networking.png';

interface WidgetProps {
  afiliadoId: string;
}

export function RedeEmbaixadores({ afiliadoId }: WidgetProps) {
  const { data, isLoading } = useAfiliadoRedeEmbaixadores(afiliadoId);

  return (
    <div className="relative rounded bg-gradient-to-br from-indigo-200 to-violet-400 dark:from-indigo-600 dark:to-violet-800 text-violet-800 dark:text-white/90 hover:ring hover:ring-violet-400 dark:hover:ring-violet-800 transition duration-200">
      <div
        data-is-loading={isLoading}
        className="absolute left-0 top-0 w-full h-full flex items-center justify-center data-[is-loading=false]:hidden"
      >
        <figure className="w-24 h-24 mx-auto">
          <Lottie animationData={loadingIcon} />
        </figure>
      </div>
      <Link
        href="/minha-rede"
        title="Clique para mais detalhes de sua rede"
        data-is-loading={isLoading}
        className="text-inherit hover:text-inherit dark:text-inherit hover:dark:text-inherit data-[is-loading=true]:opacity-0"
      >
        <div className="flex items-center justify-between gap-6 p-4 2xl:p-6">
          <div className="flex-1">
            <header className="block text-xs font-bold uppercase mb-2">
              Sua rede
            </header>
            <div className="text-4xl font-bold">
              <span>{data ? data.embaixadores.length : `--`}</span>
            </div>
          </div>
          <figure>
            <Image src={networkingIcon} alt="" width={64} height={64} />
          </figure>
        </div>
      </Link>
    </div>
  );
}
