import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Reveal } from './Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  /** Playfair 이탤릭 영문 타이틀 */
  enTitle?: string;
  /** 영문 타이틀 아래 한글 소제목 */
  title?: string;
  tone?: 'default' | 'soft';
  /** 같은 배경 섹션 사이에 표시되는 짧은 구분선 */
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

export function Section({ id, enTitle, title, tone = 'default', divider = true, className, children }: SectionProps) {
  const EnTitleTag = title ? 'p' : 'h2';

  return (
    <section id={id} className={cx(styles.section, className)} data-tone={tone} data-divider={divider}>
      {(enTitle || title) && (
        <Reveal className={styles.heading}>
          {enTitle && <EnTitleTag className={styles.enTitle}>{enTitle}</EnTitleTag>}
          {title && <h2 className={styles.title}>{title}</h2>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
