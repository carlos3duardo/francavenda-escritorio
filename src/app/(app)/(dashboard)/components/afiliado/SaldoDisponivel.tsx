'use client';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { useAfiliadoSaldoDisponivel } from '@/hooks/useAfiliadoSaldoDisponivel';
import { currency } from '@/helpers';

import loadingIcon from '@/assets/lotties/dollar.json';
import walletIcon from '@/assets/images/icons/wallet.svg';
import walletEmptyIcon from '@/assets/images/icons/wallet-empty.svg';

interface WidgetProps {
  afiliadoId: string;
}

export function SaldoDisponivel({ afiliadoId }: WidgetProps) {
  const { data, isLoading } = useAfiliadoSaldoDisponivel(afiliadoId);

  return (
    <div className="relative rounded bg-gradient-to-br from-lime-400 to-lime-600 dark:from-lime-700 dark:to-lime-800 text-lime-800 dark:text-white/90 hover:ring hover:ring-lime-600 dark:hover:ring-lime-800 transition duration-200">
      <div
        data-is-loading={isLoading}
        className="absolute left-0 top-0 w-full h-full flex items-center justify-center data-[is-loading=false]:hidden"
      >
        <figure className="w-24 h-24 mx-auto">
          <Lottie animationData={loadingIcon} />
        </figure>
      </div>
      <Link
        href="/financeiro/saque"
        title="Clique para solicitar saque"
        data-is-loading={isLoading}
        className="text-inherit hover:text-inherit dark:text-inherit hover:dark:text-inherit data-[is-loading=true]:opacity-0"
      >
        <div className="flex items-center justify-between gap-6 p-4 2xl:p-6">
          <div className="flex-1">
            <header className="block text-xs font-bold uppercase mb-2">
              Seu saldo disponível
            </header>
            <div className="text-4xl font-bold">
              <span>R$ {data ? currency(data.saldo) : '-,--'}</span>
            </div>
          </div>
          <figure>
            <Image
              src={data && data.saldo > 0 ? walletIcon : walletEmptyIcon}
              alt=""
              width={64}
              height={64}
            />
          </figure>
        </div>
      </Link>
    </div>
  );
}
