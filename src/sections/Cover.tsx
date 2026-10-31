import { PetalCanvas } from '../components/PetalCanvas';
import { Photo } from '../components/Photo';
import { wedding } from '../config/wedding';
import { formatDateTimeDot, toKst } from '../lib/date';
import { getPhoto } from '../lib/images';
import styles from './Cover.module.css';

export function Cover() {
  const { groom, bride, venue, cover } = wedding;
  const date = toKst(new Date(wedding.dateTime));

  return (
    <header className={styles.cover}>
      {/* 타자기로 친 듯한 영문 정보. 사진 왼쪽 끝에 맞춰 왼쪽 정렬 */}
      <div className={styles.typed}>
        <p>
          {groom.en.lastName} {groom.en.firstName} &amp; {bride.en.lastName} {bride.en.firstName}
        </p>
        <p>{formatDateTimeDot(date)}</p>
        <p>{venue.enName}</p>
      </div>

      <div className={styles.photo}>
        <Photo
          src={getPhoto(cover.photo)}
          alt={`${groom.firstName} ♥ ${bride.firstName} 웨딩 사진`}
          ratio="3 / 4"
          label="MAIN PHOTO"
          priority
        />
      </div>

      <div className={styles.text}>
        <h1 className={styles.names}>
          <span>{groom.firstName}</span>
          <span className={styles.amp} aria-hidden="true">
            &amp;
          </span>
          <span className="sr-only">그리고</span>
          <span>{bride.firstName}</span>
        </h1>
        <p className={styles.venue}>{venue.name}</p>
      </div>

      {cover.petals && <PetalCanvas />}
    </header>
  );
}
