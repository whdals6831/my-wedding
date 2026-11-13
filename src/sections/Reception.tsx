import { CopyButton } from '../components/CopyButton';
import { PhoneIcon } from '../components/Icons';
import { MultilineText } from '../components/MultilineText';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { formatDateKo, formatTimeKo, toKst } from '../lib/date';
import { isMobile } from '../lib/platform';
import styles from './Reception.module.css';

export function Reception() {
  const { title, message, venue, bus } = wedding.reception;
  const { father } = wedding.groom;
  const start = toKst(new Date(wedding.reception.start));
  const end = toKst(new Date(wedding.reception.end));
  // 버스 문의는 신랑 아버지께
  const contact = father?.phone && !father.deceased ? father : undefined;

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

      {bus && (
        <Reveal className={styles.bus}>
          <h3 className={styles.busTitle}>{bus.title}</h3>
          <MultilineText className={styles.busText} text={bus.text} />
          <p className={styles.busNote}>{bus.note}</p>
          {contact?.phone &&
            (isMobile ? (
              <a className={`btn ${styles.busContact}`} href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>
                <PhoneIcon className="icon" />
                신랑 아버지께 전화하기
              </a>
            ) : (
              <CopyButton
                text={contact.phone}
                label={`신랑 아버지 ${contact.phone}`}
                message="전화번호가 복사되었습니다"
                ariaLabel={`신랑 아버지 ${contact.name} 전화번호 복사`}
                className={`btn ${styles.busContact}`}
              />
            ))}
        </Reveal>
      )}
    </Section>
  );
}
