'use client';

import { useCallback } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { signOut } from '@/actions';
import { DoorOpen } from 'lucide-react';

export function SignOut() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await signOut();
    router.push('/?signout=true');
  }, [router]);

  const handleDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex flex-col gap-6 items-center bg-white dark:bg-slate-900 p-8 rounded-lg shadow">
      <figure className="ring ring-primary-400 p-6 rounded-full text-primary-400">
        <DoorOpen size={36} />
      </figure>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-center">Desconectar</h2>
        <p className="text-center text-sm text-slate-600">
          Você tem certeza que deseja sair?
        </p>
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:w-[480px] gap-4 items-stretch">
        <Button className="lg:flex-1" color="primary" onClick={handleLogout}>
          Confirmar sair
        </Button>
        <Button
          className="lg:flex-1"
          color="default"
          variant="outline"
          onClick={handleDashboard}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
