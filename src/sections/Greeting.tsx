import { MultilineText } from '../components/MultilineText';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import styles from './Greeting.module.css';

export function Greeting() {
  const { groom, bride, greeting } = wedding;

  return (
    <Section enTitle="Invitation" title="소중한 분들을 초대합니다" tone="soft">
      <Reveal>
        <MultilineText className={styles.text} text={greeting.text} />
      </Reveal>
      <Reveal delay={100}>
        <p className={styles.sign}>
          {groom.lastName}
          {groom.firstName} <span className={styles.heart}>♥</span> {bride.lastName}
          {bride.firstName}
        </p>
      </Reveal>
    </Section>
  );
}
