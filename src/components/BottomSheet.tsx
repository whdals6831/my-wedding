import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { CloseIcon } from './Icons';
import styles from './BottomSheet.module.css';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * 모바일은 아래에서 올라오는 시트, PC는 가운데 모달.
 * native <dialog>는 top layer에 올라가 토스트를 가리므로 포털로 구현한다.
 */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useBodyScrollLock(open);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={onClose} />
      <div ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
