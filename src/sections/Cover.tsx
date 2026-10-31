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

      {/* 사진 가운데보다 조금 아래, 필기체 문구 */}
      <h1 className={styles.script}>
        We&rsquo;re getting
        <br />
        married
      </h1>

      {/* 타자기로 친 듯한 영문 정보 */}
      <div className={styles.typed}>
        <p>
          {groom.en.lastName} {groom.en.firstName} &amp; {bride.en.lastName} {bride.en.firstName}
        </p>
        <p>{formatDateTimeDot(date)}</p>
        <p>{venue.enName}</p>
      </div>
    </header>
  );
}
