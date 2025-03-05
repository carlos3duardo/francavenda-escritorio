import { ReactNode, useContext } from 'react';
import md5 from 'md5';
import { ModalContext } from './ModalContext';

interface ModalTriggerProps {
  children: ReactNode;
  id: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  if (document.getElementById(wrapperId)) return;

  const wrapperElement = document.createElement('div');

  wrapperElement.classList.add('--modal-wrapper');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
}

export function ModalTrigger({ children, id }: ModalTriggerProps) {
  const { openModal, setModalId } = useContext(ModalContext);
  const wrapperId = `modal-${md5(id)}`;

  const handleClick = () => {
    createWrapperAndAppendToBody(wrapperId);

    setModalId(wrapperId);
    openModal();
  };

  return <div onClick={handleClick}>{children}</div>;
}
