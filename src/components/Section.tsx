import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Reveal } from './Reveal';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  /** 자간을 넓힌 영문 대문자 타이틀 */
  enTitle?: string;
  /** 영문 타이틀 아래 크게 쓰는 필기체 타이틀 */
  scriptTitle?: string;
  /** 맨 아래 한글 소제목 */
  title?: string;
  /** 섹션 위쪽 가운데 짧은 구분선 */
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

export function Section({ id, enTitle, scriptTitle, title, divider = true, className, children }: SectionProps) {
  // 가장 아래에 오는 타이틀이 섹션 제목(h2)이 된다
  const headingLevel = title ? 'title' : scriptTitle ? 'script' : 'en';
  const EnTitleTag = headingLevel === 'en' ? 'h2' : 'p';
  const ScriptTitleTag = headingLevel === 'script' ? 'h2' : 'p';

  return (
    <section id={id} className={cx(styles.section, className)} data-divider={divider}>
      {(enTitle || scriptTitle || title) && (
        <Reveal className={styles.heading}>
          {enTitle && <EnTitleTag className={styles.enTitle}>{enTitle}</EnTitleTag>}
          {scriptTitle && <ScriptTitleTag className={styles.scriptTitle}>{scriptTitle}</ScriptTitleTag>}
          {title && <h2 className={styles.title}>{title}</h2>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
