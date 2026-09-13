import { MultilineText } from '../components/MultilineText';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import styles from './Intro.module.css';

export function Intro() {
  const { text, source } = wedding.intro;

  return (
    <Section tone="soft">
      <Reveal>
        <span className={styles.quote} aria-hidden="true">
          &ldquo;
        </span>
        <MultilineText className={styles.text} text={text} />
      </Reveal>
      {source && (
        <Reveal delay={150}>
          <p className={styles.source}>{source}</p>
        </Reveal>
      )}
    </Section>
  );
}
