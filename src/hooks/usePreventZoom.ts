import { useEffect } from 'react';
import { isMobile } from '../lib/platform';

/**
 * 모바일에서 핀치 확대를 막는다. iOS Safari는 viewport의 user-scalable=no를 무시하므로 제스처 이벤트를 직접 막는다.
 * PC(트랙패드·Ctrl+휠) 확대는 막지 않는다.
 */
export function usePreventZoom() {
  useEffect(() => {
    if (!isMobile) return;

    const preventGesture = (event: Event) => event.preventDefault();
    const preventMultiTouch = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault();
    };
    const options = { passive: false } as const;

    document.addEventListener('gesturestart', preventGesture, options);
    document.addEventListener('gesturechange', preventGesture, options);
    document.addEventListener('touchmove', preventMultiTouch, options);
    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('touchmove', preventMultiTouch);
    };
  }, []);
}
