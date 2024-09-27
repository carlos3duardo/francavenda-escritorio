'use client';
import { MoonStar, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ColorModeSwitch() {
  const [colorMode, setColorMode] = useState<string | null>(null);

  useEffect(() => {
    const storedColorMode = localStorage.getItem('theme');

    setColorMode(storedColorMode || 'light');
  }, []);

  const toggleColorMode = () => {
    localStorage.setItem('theme', colorMode === 'light' ? 'dark' : 'light');
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  return (
    <>
      <button
        onClick={toggleColorMode}
        className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-300 rounded-full transition"
      >
        {colorMode === 'light' ? (
          <Sun size={18} className="hover:text-blue-600" />
        ) : (
          <MoonStar size={18} className="hover:text-blue-600" />
        )}
      </button>
    </>
  );
}
