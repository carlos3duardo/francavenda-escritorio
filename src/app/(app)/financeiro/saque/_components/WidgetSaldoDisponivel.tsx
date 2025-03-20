'use client';
import Image from 'next/image';
import { useAfiliadoSaldoDisponivel } from '@/hooks/useAfiliadoSaldoDisponivel';

import saldoIcon from '@/assets/images/icons/loan.png';
import { currency } from '@/helpers';
import { Loader } from '@/components';

interface WidgetProps {
  afiliadoId: string;
}

export function WidgetSaldoDisponivel({ afiliadoId }: WidgetProps) {
  const { data } = useAfiliadoSaldoDisponivel(afiliadoId);

  return (
    <div className="widget flex items-center justify-between gap-6 p-4 2xl:p-6 rounded bg-gradient-to-b from-sky-200 to-sky-400 dark:from-sky-600 dark:to-sky-800 text-sky-800 dark:text-white/90">
      <div className="flex-1">
        <header className="block text-xs font-bold uppercase mb-2">
          Seu saldo atual
        </header>
        <div className="text-4xl font-bold">
          {data ? (
            <span>R$ {currency(data.saldo)}</span>
          ) : (
            <Loader.Basic size="md" />
          )}
        </div>
      </div>
      <figure>
        <Image src={saldoIcon} alt="" width={64} height={64} />
      </figure>
    </div>
  );
}
