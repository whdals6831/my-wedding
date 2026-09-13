import { useId, useState, type ReactNode } from 'react';
import { ChevronDownIcon } from './Icons';
import styles from './Accordion.module.css';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={styles.item} data-open={open || undefined}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{title}</span>
        <ChevronDownIcon className={styles.chevron} />
      </button>
      <div id={panelId} className={styles.panel} role="region" inert={!open}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
