import { isAndroid, isMobile } from './platform';

export interface Destination {
  name: string;
  lat: number;
  lng: number;
}

/** 모바일은 현재 탭에서, PC는 새 탭으로 연다 */
function openWeb(url: string) {
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/** 앱 스킴을 먼저 시도하고, 앱이 없어 화면이 그대로 남아 있으면 대체 URL로 이동 */
function openAppWithFallback(appUrl: string, fallbackUrl: string, delay = 1500) {
  const timer = window.setTimeout(() => {
    if (!document.hidden) window.location.href = fallbackUrl;
  }, delay);
  const cancel = () => window.clearTimeout(timer);
  document.addEventListener('visibilitychange', cancel, { once: true });
  window.addEventListener('pagehide', cancel, { once: true });
  window.location.href = appUrl;
}

export function openNaverMap({ name, lat, lng }: Destination) {
  const webUrl = `https://map.naver.com/p/search/${encodeURIComponent(name)}`;
  if (!isMobile) {
    openWeb(webUrl);
    return;
  }

  const query =
    `dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}` +
    `&appname=${encodeURIComponent(window.location.origin)}`;

  if (isAndroid) {
    window.location.href =
      `intent://route/car?${query}#Intent;scheme=nmap;action=android.intent.action.VIEW;` +
      'category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end';
    return;
  }
  openAppWithFallback(`nmap://route/car?${query}`, webUrl);
}

export function openKakaoMap({ name, lat, lng }: Destination) {
  // 이름에 쉼표가 있으면 좌표 구분자와 섞이므로 공백으로 치환
  openWeb(`https://map.kakao.com/link/to/${encodeURIComponent(name.replaceAll(',', ' '))},${lat},${lng}`);
}

/** 티맵은 웹 버전이 없어 모바일에서만 노출 */
export const isTmapAvailable = isMobile;

export function openTmap({ name, lat, lng }: Destination) {
  const query = `goalname=${encodeURIComponent(name)}&goalx=${lng}&goaly=${lat}`;
  if (isAndroid) {
    window.location.href = `intent://route?${query}#Intent;scheme=tmap;package=com.skt.tmap.ku;end`;
    return;
  }
  openAppWithFallback(`tmap://route?${query}`, 'https://apps.apple.com/kr/app/id431589174');
}
