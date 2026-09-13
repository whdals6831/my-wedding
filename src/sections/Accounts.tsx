import { Accordion } from '../components/Accordion';
import { CopyButton } from '../components/CopyButton';
import { MultilineText } from '../components/MultilineText';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import type { Account } from '../config/types';
import { wedding } from '../config/wedding';
import styles from './Accounts.module.css';

export function Accounts() {
  const { message, groom, bride } = wedding.accounts;

  return (
    <Section enTitle="Account" title="마음 전하실 곳" tone="soft">
      <Reveal>
        <MultilineText className={styles.message} text={message} />
      </Reveal>
      <Reveal delay={100}>
        {groom.length > 0 && (
          <Accordion title="신랑측 계좌번호">
            <AccountList accounts={groom} />
          </Accordion>
        )}
        {bride.length > 0 && (
          <Accordion title="신부측 계좌번호">
            <AccountList accounts={bride} />
          </Accordion>
        )}
      </Reveal>
    </Section>
  );
}

function AccountList({ accounts }: { accounts: Account[] }) {
  return (
    <ul className={styles.list}>
      {accounts.map((account) => (
        <li key={`${account.label}-${account.number}`} className={styles.row}>
          <div className={styles.info}>
            <p className={styles.who}>
              {account.label} <span className={styles.holder}>{account.holder}</span>
            </p>
            <p className={styles.number}>
              {account.bank} {account.number}
            </p>
          </div>
          <CopyButton
            text={`${account.bank} ${account.number}`}
            message="계좌번호가 복사되었습니다"
            ariaLabel={`${account.label} ${account.holder} 계좌번호 복사`}
          />
        </li>
      ))}
    </ul>
  );
}
