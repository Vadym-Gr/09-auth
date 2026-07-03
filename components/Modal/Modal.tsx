/*import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

/*export default function Modal({ children, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const root = document.getElementById('modal-root');
    setModalRoot(root);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!mounted || !modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}*/

/*'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const root = document.getElementById('modal-root');
  if (!root) return null;

  return createPortal(<div>{children}</div>, root);
}*/

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Закриття на Escape
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted) return null;

  const root = document.getElementById('modal-root');
  if (!root) return null;

  return createPortal(
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{ background: 'white', padding: '20px', borderRadius: '8px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    root
  );
}