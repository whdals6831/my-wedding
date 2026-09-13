import { isTmapAvailable, openKakaoMap, openNaverMap, openTmap, type Destination } from '../lib/navLinks';
import styles from './NavButtons.module.css';

const APPS = [
  { key: 'naver', label: '네이버지도', color: '#03C75A', open: openNaverMap, available: true },
  { key: 'kakao', label: '카카오맵', color: '#FAC700', open: openKakaoMap, available: true },
  { key: 'tmap', label: '티맵', color: '#3D6BFF', open: openTmap, available: isTmapAvailable },
];

export function NavButtons({ destination }: { destination: Destination }) {
  return (
    <ul className={styles.list}>
      {APPS.filter((app) => app.available).map((app) => (
        <li key={app.key} className={styles.item}>
          <button type="button" className={styles.button} onClick={() => app.open(destination)}>
            <span className={styles.dot} style={{ background: app.color }} aria-hidden="true" />
            {app.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
