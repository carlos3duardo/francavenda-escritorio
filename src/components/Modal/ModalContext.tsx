'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface ModalContextProps {
  isOpen?: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalId?: string;
  setModalId: (id: string) => void;
}

export const ModalContext = createContext({} as ModalContextProps);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wrapperId, setWrapperId] = useState('first');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    // const modals = document.getElementsByClassName('--modal-wrapper');

    // const lastModal = modals.length ? modals[modals.length - 1] : null;

    // if (lastModal) {
    //   lastModal.remove();
    // }

    setIsOpen(false);
  }

  function setModalId(id: string) {
    setWrapperId(id);
  }

  useEffect(() => {
    if (!isOpen) {
      document.getElementById(wrapperId)?.remove();
    }
  }, [isOpen, wrapperId]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalId: wrapperId,
        setModalId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
