import { useCallback, useState } from 'react';
import { ContactSheet } from '../components/ContactSheet';
import { PhoneIcon } from '../components/Icons';
import { MultilineText } from '../components/MultilineText';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import type { Parent, Side } from '../config/types';
import { wedding } from '../config/wedding';
import styles from './Greeting.module.css';

export function Greeting() {
  const { groom, bride, greeting } = wedding;
  const [contactOpen, setContactOpen] = useState(false);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <Section enTitle="Invitation" title="소중한 분들을 초대합니다" tone="soft">
      <Reveal>
        <MultilineText className={styles.text} text={greeting.text} />
      </Reveal>
      <Reveal delay={100} className={styles.family}>
        <FamilyRow side={groom} role="신랑" />
        <FamilyRow side={bride} role="신부" />
      </Reveal>
      <Reveal delay={150} className={styles.contact}>
        <button type="button" className="btn" onClick={() => setContactOpen(true)}>
          <PhoneIcon className="icon" />
          축하 연락하기
        </button>
      </Reveal>
      <ContactSheet open={contactOpen} onClose={closeContact} groom={groom} bride={bride} />
    </Section>
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
