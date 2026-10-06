import { toast } from 'sonner';
import { isTmapAvailable, openKakaoMap, openNaverMap, openTmap, type Destination } from '../lib/navLinks';
import { KakaoMapIcon, NaverMapIcon, TmapIcon } from './MapAppIcons';
import styles from './NavButtons.module.css';

function openTmapOrNotify(destination: Destination) {
  if (!isTmapAvailable) {
    toast('티맵은 휴대폰에서만 열 수 있습니다.');
    return;
  }
  openTmap(destination);
}

const APPS = [
  { key: 'naver', label: '네이버지도', Icon: NaverMapIcon, open: openNaverMap },
  { key: 'kakao', label: '카카오맵', Icon: KakaoMapIcon, open: openKakaoMap },
  { key: 'tmap', label: '티맵', Icon: TmapIcon, open: openTmapOrNotify },
];

export function NavButtons({ destination }: { destination: Destination }) {
  return (
    <ul className={styles.list}>
      {APPS.map(({ key, label, Icon, open }) => (
        <li key={key} className={styles.item}>
          <button type="button" className={styles.button} onClick={() => open(destination)}>
            <Icon className={styles.icon} />
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
