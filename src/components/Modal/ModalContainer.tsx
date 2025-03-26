'use client';
import { ReactNode, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';
import { ModalContext } from './ModalContext';

interface ModalContainerProps {
  children: ReactNode;
  className?: string;
}

export function ModalContainer({ children, className }: ModalContainerProps) {
  const { isOpen, closeModal, modalId } = useContext(ModalContext);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? closeModal() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [closeModal]);

  if (!isOpen) return null;
  if (!modalId) return null;

  const element = document.getElementById(modalId);

  if (!element) return null;

  return createPortal(
    <div className="fixed inset-0 bg-slate-800 bg-opacity-60 z-40 flex justify-center items-center">
      <div
        className={twMerge(
          'relative bg-white p-3 shadow-modal rounded-md min-w-[600px] max-w-[80%]',
          className,
        )}
      >
        <div className="relative flex flex-col gap">{children}</div>
        <button
          className="absolute right-1 top-1 p-1 rounded-sm text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition duration-200"
          onClick={() => closeModal()}
        >
          <X size={24} />
        </button>
      </div>
    </div>,
    element,
  );
}
