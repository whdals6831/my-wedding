import { useCallback, useState } from 'react';
import { ContactSheet } from '../components/ContactSheet';
import { CopyButton } from '../components/CopyButton';
import { PhoneIcon } from '../components/Icons';
import { NavButtons } from '../components/NavButtons';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { VenueMap } from '../components/VenueMap';
import type { Parent, Side } from '../config/types';
import { wedding } from '../config/wedding';
import { formatDateKo, formatTimeKo, toKst } from '../lib/date';
import styles from './WeddingInfo.module.css';

export function WeddingInfo() {
  const { groom, bride, venue } = wedding;
  const date = toKst(new Date(wedding.dateTime));
  const [contactOpen, setContactOpen] = useState(false);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <>
      <Section>
        <Reveal className={styles.family}>
          <FamilyRow side={groom} role="신랑" />
          <FamilyRow side={bride} role="신부" />
        </Reveal>
        <Reveal delay={100} className={styles.block}>
          <button type="button" className="btn" onClick={() => setContactOpen(true)}>
            <PhoneIcon className="icon" />
            축하 연락하기
          </button>
        </Reveal>
        <ContactSheet open={contactOpen} onClose={closeContact} groom={groom} bride={bride} />
      </Section>

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
          <NavButtons destination={{ name: venue.name, lat: venue.lat, lng: venue.lng }} />
        </Reveal>

        {venue.tel && (
          <Reveal className={styles.block}>
            <a className={styles.tel} href={`tel:${venue.tel.replace(/\D/g, '')}`}>
              예식장 문의 {venue.tel}
            </a>
          </Reveal>
        )}
      </Section>
    </>
  );
}

function FamilyRow({ side, role }: { side: Side; role: string }) {
  const hasParents = Boolean(side.father || side.mother);

  return (
    <p className={styles.row}>
      {hasParents && (
        <span className={styles.parents}>
          {side.father && <ParentName parent={side.father} />}
          {side.father && side.mother && (
            <span className={styles.dot} aria-hidden="true">
              ·
            </span>
          )}
          {side.mother && <ParentName parent={side.mother} />}
        </span>
      )}
      <span className={styles.relation}>{hasParents ? `의 ${side.relation}` : role}</span>
      <span className={styles.child}>{side.firstName}</span>
    </p>
  );
}

function ParentName({ parent }: { parent: Parent }) {
  return (
    <span>
      {parent.deceased && <span className={styles.deceased}>故 </span>}
      {parent.name}
    </span>
  );
}
