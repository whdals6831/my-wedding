import { useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import { KAKAO_JS_KEY } from '../lib/kakao';
import { LockIcon, PinIcon, UnlockIcon } from './Icons';
import styles from './VenueMap.module.css';

interface VenueMapProps {
  name: string;
  lat: number;
  lng: number;
}

/** 카카오 키가 없거나 지도 로드에 실패하면 플레이스홀더를 보여준다 */
export function VenueMap(props: VenueMapProps) {
  if (!KAKAO_JS_KEY) return <MapPlaceholder name={props.name} />;
  return <KakaoVenueMap {...props} />;
}

function KakaoVenueMap({ name, lat, lng }: VenueMapProps) {
  const [loading, error] = useKakaoLoader({ appkey: KAKAO_JS_KEY });
  const [unlocked, setUnlocked] = useState(false);

  if (error) return <MapPlaceholder name={name} />;
  if (loading) return <MapPlaceholder name={name} />;

  const position = { lat, lng };

  return (
    <div>
      <div className={styles.frame}>
        <Map
          center={position}
          level={3}
          draggable={unlocked}
          zoomable={unlocked}
          scrollwheel={unlocked}
          disableDoubleClickZoom={!unlocked}
          className={styles.map}
          style={{ width: '100%', height: '100%' }}
        >
          <MapMarker position={position} />
        </Map>
        {/* 잠금 상태에서는 지도 위 터치가 페이지 스크롤로 전달되도록 덮개를 둔다 */}
        {!unlocked && <div className={styles.lockOverlay} aria-hidden="true" />}
        <button
          type="button"
          className={styles.lockButton}
          aria-pressed={unlocked}
          aria-label={unlocked ? '지도 잠그기' : '지도 움직이기'}
          onClick={() => setUnlocked((value) => !value)}
        >
          {unlocked ? <UnlockIcon /> : <LockIcon />}
        </button>
      </div>
      <p className={styles.hint}>
        {unlocked ? '자물쇠를 누르면 지도가 다시 고정됩니다.' : '자물쇠를 누르면 지도를 움직일 수 있습니다.'}
      </p>
    </div>
  );
}

function MapPlaceholder({ name }: { name: string }) {
  return (
    <div className={styles.frame}>
      <div className={styles.placeholder}>
        <PinIcon className={styles.pin} />
        <span className={styles.placeholderName}>{name}</span>
      </div>
    </div>
  );
}
