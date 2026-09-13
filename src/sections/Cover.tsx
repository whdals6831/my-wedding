import { PetalCanvas } from '../components/PetalCanvas';
import { Photo } from '../components/Photo';
import { wedding } from '../config/wedding';
import { formatDateDot, formatTimeEn, toKst } from '../lib/date';
import { getPhoto } from '../lib/images';
import styles from './Cover.module.css';

export function Cover() {
  const { groom, bride, venue, cover } = wedding;
  const date = toKst(new Date(wedding.dateTime));

  return (
    <header className={styles.cover}>
      <div className={styles.photoWrap}>
        <Photo
          src={getPhoto(cover.photo)}
          alt={`${groom.firstName} ♥ ${bride.firstName} 웨딩 사진`}
          ratio="3 / 4"
          label="MAIN PHOTO"
          priority
          className={styles.photo}
        />
        {cover.petals && <PetalCanvas />}
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
        <p className={styles.date}>
          {formatDateDot(date)} · {formatTimeEn(date)}
        </p>
        <p className={styles.venue}>{venue.name}</p>
      </div>
    </header>
  );
}
