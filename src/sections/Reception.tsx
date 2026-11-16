import { MultilineText } from '../components/MultilineText';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { formatDateKo, formatTimeKo, toKst } from '../lib/date';
import styles from './Reception.module.css';

export function Reception() {
  const { title, message, venue } = wedding.reception;
  const start = toKst(new Date(wedding.reception.start));
  const end = toKst(new Date(wedding.reception.end));

  return (
    <Section enTitle="Reception" title={title}>
      <Reveal>
        <MultilineText className={styles.message} text={message} />
      </Reveal>

      <Reveal delay={100} className={styles.info}>
        <dl>
          <div className={styles.row}>
            <dt className={styles.label}>일시</dt>
            <dd className={styles.value}>
              {formatDateKo(start)}
              <br />
              {formatTimeKo(start)} ~ {formatTimeKo(end)}
            </dd>
          </div>
          <div className={styles.row}>
            <dt className={styles.label}>장소</dt>
            <dd className={styles.value}>
              {venue.name}
              <span className={styles.address}>{venue.address}</span>
            </dd>
          </div>
        </dl>
      </Reveal>
    </Section>
  );
}
