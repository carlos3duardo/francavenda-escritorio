'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { UserCookieProps } from '@/types';
import { primaryMenu, secondaryMenu } from '@/data/menu';
import icone from '@/assets/images/icone-francavenda-darkmode.png';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { getCookie, hasCookie } from 'cookies-next';
import { SidebarProvider, useSidebar } from './MobileSidebarContext';

function SidebarContent() {
  const { isOpen, setIsOpen } = useSidebar();

  const [usuario, setUsuario] = useState<UserCookieProps | undefined>(
    undefined,
  );

  useEffect(() => {
    const user = hasCookie('frv:user')
      ? (JSON.parse(getCookie('frv:user') as string) as UserCookieProps)
      : undefined;

    setUsuario(user);
  }, []);

  return (
    <>
      <button
        className="lg:hidden h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-200"
        aria-label="Abrir Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        data-is-open={isOpen}
        className="fixed top-0 left-0 h-full w-full bg-white/50 z-40 transition-opacity duration-300 opacity-0 pointer-events-none data-[is-open=true]:opacity-100 data-[is-open=true]:pointer-events-auto"
        onClick={() => setIsOpen(false)}
      />
      <aside
        data-is-open={isOpen}
        className="fixed top-0 left-0 h-full w-[60%] md:w-[40%] lg:w-[24rem] z-50 shadow-lg text-white bg-primary-600 dark:bg-primary-800 -translate-x-full opacity-0 data-[is-open=true]:translate-x-0 data-[is-open=true]:opacity-100 transform transition-all duration-300 ease-in-out"
      >
        <header className="flex items-center justify-between p-4 lg:p-6">
          <Image src={icone} alt="Franca Venda" width={32} height={32} />
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </header>
        <div className="h-[1px] bg-white/20 w-full my-2" />
        <div>
          <MobileNavigationMenu menu={primaryMenu} user={usuario} />
          <div className="h-[1px] bg-white/20 w-full my-2" />
          <MobileNavigationMenu menu={secondaryMenu} user={usuario} />
        </div>
      </aside>
    </>
  );
}

export function MobileSidebar() {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
}
