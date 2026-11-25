import type { BusInfo, Parent } from '../config/types';
import { wedding } from '../config/wedding';
import { formatTimeKo, toKst, WEEKDAYS_KO } from '../lib/date';
import { isMobile } from '../lib/platform';
import { CopyButton } from './CopyButton';
import { PhoneIcon } from './Icons';
import { Reveal } from './Reveal';
import styles from './BusNotice.module.css';

interface BusNoticeProps {
  bus: BusInfo;
  /** 버스 문의 연락처. 번호가 없거나 고인이면 버튼을 숨긴다 */
  contact?: Parent;
  /** 신랑 아버지, 신부 아버지 등 */
  contactLabel: string;
}

/**
 * 대절버스 안내 박스. 날짜 → 시각 정시 출발 → 장소(주소) → 복귀 시각 순서로 표시.
 * 모바일은 전화 걸기, PC는 번호 복사
 */
export function BusNotice({ bus, contact, contactLabel }: BusNoticeProps) {
  const departure = toKst(new Date(bus.departure));
  const phone = contact && !contact.deceased ? contact.phone : undefined;

  return (
    <Reveal className={styles.box}>
      <h3 className={styles.title}>{bus.title}</h3>
      <p className={styles.text}>
        {departure.month}월 {departure.day}일 {WEEKDAYS_KO[departure.weekday]}요일 예식 당일
        <br />
        {formatTimeKo(departure)} 정시 출발
        <br />
        {bus.place}
      </p>
      {bus.address && <p className={styles.address}>{bus.address}</p>}
      {bus.returnAt && (
        <p className={styles.return}>
          예식 후 {formatTimeKo(toKst(new Date(bus.returnAt)))} {wedding.venue.name}에서 복귀
        </p>
      )}
      <p className={styles.note}>{bus.note}</p>
      {phone &&
        (isMobile ? (
          <a className={`btn ${styles.contact}`} href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
            <PhoneIcon className="icon" />
            {contactLabel}께 전화하기
          </a>
        ) : (
          <CopyButton
            text={phone}
            label={`${contactLabel} ${phone}`}
            message="전화번호가 복사되었습니다"
            ariaLabel={`${contactLabel} ${contact?.name} 전화번호 복사`}
            className={`btn ${styles.contact}`}
          />
        ))}
    </Reveal>
  );
}
