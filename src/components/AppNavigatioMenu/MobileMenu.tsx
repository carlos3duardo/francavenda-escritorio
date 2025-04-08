'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-200"
        aria-label="Abrir Menu"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-full bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        data-is-open={isOpen}
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        md:translate-x-0 md:opacity-100 md:relative md:block`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Relatórios
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Configurações
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}
