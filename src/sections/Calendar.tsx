import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { cx } from '../lib/cx';
import {
  WEEKDAYS_KO,
  daysUntil,
  formatDateKo,
  formatTimeKo,
  holidayName,
  monthGrid,
  monthNameEn,
  toKst,
} from '../lib/date';
import styles from './Calendar.module.css';

export function Calendar() {
  const date = toKst(new Date(wedding.dateTime));
  const cells = monthGrid(date.year, date.month);

  return (
    <Section enTitle="Our Wedding Day">
      <Reveal>
        <p className={styles.when}>{formatDateKo(date)}</p>
        <p className={styles.time}>{formatTimeKo(date)}</p>
      </Reveal>

      <Reveal delay={100} className={styles.calendar}>
        <p className={styles.month}>
          {monthNameEn(date)} <span className={styles.year}>{date.year}</span>
        </p>
        <div className={styles.grid}>
          {WEEKDAYS_KO.map((weekday, index) => (
            <span key={weekday} className={cx(styles.weekday, index === 0 && styles.sunday)}>
              {weekday}
            </span>
          ))}
          {cells.map((day, index) => {
            if (day === null) return <span key={`blank-${index}`} />;
            const holiday = holidayName(date.month, day);
            return (
              <span
                key={day}
                className={cx(
                  styles.day,
                  (index % 7 === 0 || holiday) && styles.sunday,
                  day === date.day && styles.wedding,
                )}
              >
                {day}
                {holiday && <span className={styles.holiday}>{holiday}</span>}
                {day === date.day && <span className="sr-only"> 결혼식</span>}
              </span>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={150}>
        <Dday days={daysUntil(date)} />
      </Reveal>
    </Section>
  );
}

function Dday({ days }: { days: number }) {
  const { groom, bride } = wedding;
  const couple = `${groom.firstName} ♥ ${bride.firstName}`;

  if (days === 0) {
    return (
      <div className={styles.dday}>
        <span className={styles.badge}>D-DAY</span>
        <p>오늘은 {couple}의 결혼식 날입니다</p>
      </div>
    );
  }

  if (days < 0) {
    return (
      <div className={styles.dday}>
        <span className={styles.badge}>D+{-days}</span>
        <p>
          {couple}이 부부가 된 지 <strong className={styles.count}>{-days}일</strong>이 되었습니다
        </p>
      </div>
    );
  }

  return (
    <div className={styles.dday}>
      <span className={styles.badge}>D-{days}</span>
      <p>
        {couple}의 결혼식이 <strong className={styles.count}>{days}일</strong> 남았습니다
      </p>
    </div>
  );
}
