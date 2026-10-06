import { CopyButton } from '../components/CopyButton';
import { NavButtons } from '../components/NavButtons';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { VenueMap } from '../components/VenueMap';
import { wedding } from '../config/wedding';
import { formatDateKo, formatTimeKo, toKst } from '../lib/date';
import styles from './Location.module.css';

export function Location() {
  const { venue } = wedding;
  const date = toKst(new Date(wedding.dateTime));

  return (
    <Section enTitle="Location" title="예식 장소">
      <Reveal>
        <p className={styles.venueName}>{venue.name}</p>
        <p className={styles.hall}>{venue.hall}</p>
        <p className={styles.when}>
          {formatDateKo(date)} {formatTimeKo(date)}
        </p>
      </Reveal>

      <Reveal className={styles.block}>
        <VenueMap name={venue.name} lat={venue.lat} lng={venue.lng} />
      </Reveal>

      <Reveal className={styles.address}>
        <span>{venue.address}</span>
        <CopyButton text={venue.address} label="주소 복사" message="주소가 복사되었습니다" />
      </Reveal>

      <Reveal className={styles.nav}>
        <NavButtons destination={{ name: venue.mapName ?? venue.name, lat: venue.lat, lng: venue.lng }} />
      </Reveal>

      {venue.tel && (
        <Reveal className={styles.block}>
          <a className={styles.tel} href={`tel:${venue.tel.replace(/\D/g, '')}`}>
            예식장 문의 {venue.tel}
          </a>
        </Reveal>
      )}
    </Section>
  );
}
