const ua = navigator.userAgent;

export const isAndroid = /Android/i.test(ua);

/** iPadOS는 데스크톱 UA를 쓰므로 터치 포인트로 구분 */
export const isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

export const isMobile = isAndroid || isIOS || /Mobi/i.test(ua);
