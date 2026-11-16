import { BusNotice } from '../components/BusNotice';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import styles from './Bus.module.css';

/** 예식 당일 신랑측·신부측 대절버스. 문의 전화는 각 집 아버지께 */
export function Bus() {
  const { groom, bride } = wedding.bus;

  return (
    <Section enTitle="Shuttle Bus" title="대절버스 안내">
      <div className={styles.list}>
        {groom && <BusNotice bus={groom} contact={wedding.groom.father} contactLabel="신랑 아버지" />}
        {bride && <BusNotice bus={bride} contact={wedding.bride.father} contactLabel="신부 아버지" />}
      </div>
    </Section>
  );
}
