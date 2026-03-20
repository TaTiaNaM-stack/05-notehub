import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Modal({ children, onClick }: ModalProps) {
  useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClick();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
	  };
	}, [onClick]);
   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  return (
    createPortal(
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
      <div className={css.modal}>
        {children}
      </div>
      </div>,
    document.getElementById('modal-root') as HTMLDivElement)
  )
}