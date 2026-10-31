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
      <Photo
        className={styles.photo}
        src={getPhoto(cover.photo)}
        alt={`${groom.firstName} ♥ ${bride.firstName} 웨딩 사진`}
        ratio="auto"
        label="MAIN PHOTO"
        priority
      />

      {/* 사진 한가운데 필기체 문구 */}
      <p className={styles.script}>
        We&rsquo;re getting
        <br />
        married
      </p>

      <div className={styles.bottom}>
        {/* 타자기로 친 듯한 영문 정보 */}
        <div className={styles.typed}>
          <p>
            {groom.en.lastName} {groom.en.firstName} &amp; {bride.en.lastName} {bride.en.firstName}
          </p>
          <p>{formatDateTimeDot(date)}</p>
          <p>{venue.enName}</p>
        </div>

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
    </header>
  );
}
