import type { Side } from '../config/types';
import { isMobile } from '../lib/platform';
import { BottomSheet } from './BottomSheet';
import { CopyButton } from './CopyButton';
import { MessageIcon, PhoneIcon } from './Icons';
import styles from './ContactSheet.module.css';

interface Contact {
  label: string;
  name: string;
  phone: string;
}

function contactsOf(side: Side, role: '신랑' | '신부'): Contact[] {
  const contacts: Contact[] = [];
  if (side.phone) contacts.push({ label: role, name: `${side.lastName}${side.firstName}`, phone: side.phone });
  for (const [parent, title] of [
    [side.father, '아버지'],
    [side.mother, '어머니'],
  ] as const) {
    if (parent?.phone && !parent.deceased) {
      contacts.push({ label: `${role} ${title}`, name: parent.name, phone: parent.phone });
    }
  }
  return contacts;
}

const digits = (phone: string) => phone.replace(/[^\d+]/g, '');

interface ContactSheetProps {
  open: boolean;
  onClose: () => void;
  groom: Side;
  bride: Side;
}

export function ContactSheet({ open, onClose, groom, bride }: ContactSheetProps) {
  const groups = [
    { title: '신랑측', contacts: contactsOf(groom, '신랑') },
    { title: '신부측', contacts: contactsOf(bride, '신부') },
  ].filter((group) => group.contacts.length > 0);

  return (
    <BottomSheet open={open} onClose={onClose} title="축하 연락하기">
      {groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <ul>
            {group.contacts.map((contact) => (
              <li key={contact.label} className={styles.row}>
                <div className={styles.person}>
                  <span className={styles.label}>{contact.label}</span>
                  <span className={styles.name}>{contact.name}</span>
                  {!isMobile && <span className={styles.phone}>{contact.phone}</span>}
                </div>
                <div className={styles.actions}>
                  {isMobile ? (
                    <>
                      <a
                        className={styles.action}
                        href={`tel:${digits(contact.phone)}`}
                        aria-label={`${contact.label} ${contact.name}에게 전화하기`}
                      >
                        <PhoneIcon />
                      </a>
                      <a
                        className={styles.action}
                        href={`sms:${digits(contact.phone)}`}
                        aria-label={`${contact.label} ${contact.name}에게 문자 보내기`}
                      >
                        <MessageIcon />
                      </a>
                    </>
                  ) : (
                    <CopyButton
                      text={contact.phone}
                      label="번호 복사"
                      message="전화번호가 복사되었습니다"
                      ariaLabel={`${contact.label} ${contact.name} 전화번호 복사`}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </BottomSheet>
  );
}
