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
    <Section enTitle="Celebration of" scriptTitle={`${groom.en.firstName} and ${bride.en.firstName}`}>
      <Reveal className={styles.body}>
        <MultilineText className={styles.text} text={greeting.text} />
      </Reveal>
      <Reveal delay={100} className={styles.family}>
        <FamilyColumn side={groom} role="신랑" />
        <span className={styles.divider} aria-hidden="true" />
        <FamilyColumn side={bride} role="신부" />
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

function FamilyColumn({ side, role }: { side: Side; role: string }) {
  const hasParents = Boolean(side.father || side.mother);

  return (
    <p className={styles.side}>
      {hasParents && (
        <span className={styles.parents}>
          {side.father && <ParentName parent={side.father} />}
          {side.father && side.mother && (
            <span className={styles.dot} aria-hidden="true">
              ·
            </span>
          )}
          {side.mother && <ParentName parent={side.mother} />}
          <span className={styles.relation}>의 {side.relation}</span>
        </span>
      )}
      <span className={styles.child}>{`${role} ${side.lastName}${side.firstName}`}</span>
    </p>
  );
}

function ParentName({ parent }: { parent: Parent }) {
  return (
    <span className={styles.parent}>
      {parent.deceased && <span className={styles.deceased}>故 </span>}
      {parent.name}
    </span>
  );
}
