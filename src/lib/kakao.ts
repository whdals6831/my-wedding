import { copyText } from './clipboard';

interface KakaoStatic {
  init(appKey: string): void;
  isInitialized(): boolean;
  Share: {
    sendDefault(settings: object): void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoStatic;
  }
}

export const KAKAO_JS_KEY: string = import.meta.env.VITE_KAKAO_JS_KEY ?? '';

const SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js';
const SDK_INTEGRITY = 'sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy';

let sdkPromise: Promise<KakaoStatic | null> | null = null;

function initKakao(): KakaoStatic | null {
  const kakao = window.Kakao;
  if (!kakao) return null;
  try {
    if (!kakao.isInitialized()) kakao.init(KAKAO_JS_KEY);
    return kakao;
  } catch (error) {
    console.warn('[kakao] SDK 초기화 실패', error);
    return null;
  }
}

/** 카카오 공유 SDK를 한 번만 불러온다. 키가 없거나 실패하면 null */
export function loadKakaoSdk(): Promise<KakaoStatic | null> {
  if (!KAKAO_JS_KEY) return Promise.resolve(null);

  sdkPromise ??= new Promise((resolve) => {
    if (window.Kakao) {
      resolve(initKakao());
      return;
    }
    const script = document.createElement('script');
    script.src = SDK_SRC;
    script.integrity = SDK_INTEGRITY;
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => resolve(initKakao());
    script.onerror = () => {
      sdkPromise = null;
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return sdkPromise;
}

export interface ShareContent {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  buttonTitle: string;
}

export type ShareResult = 'kakao' | 'native' | 'copied' | 'failed';

function buildTemplate({ url, title, description, imageUrl, buttonTitle }: ShareContent) {
  const link = { mobileWebUrl: url, webUrl: url };
  if (imageUrl) {
    return {
      objectType: 'feed',
      content: { title, description, imageUrl, imageWidth: 1200, imageHeight: 600, link },
      buttons: [{ title: buttonTitle, link }],
    };
  }
  return { objectType: 'text', text: `${title}\n${description}`, link, buttonTitle };
}

/** 카카오톡 공유 → 기기 공유 시트 → 링크 복사 순서로 시도 */
export async function shareInvitation(content: ShareContent): Promise<ShareResult> {
  // 이미 준비된 SDK는 바로 사용해야 PC 팝업 차단을 피할 수 있다
  const kakao = window.Kakao?.isInitialized() ? window.Kakao : await loadKakaoSdk();
  if (kakao) {
    try {
      kakao.Share.sendDefault(buildTemplate(content));
      return 'kakao';
    } catch (error) {
      console.warn('[kakao] 공유 실패', error);
    }
  }

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: content.title, text: content.description, url: content.url });
      return 'native';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'native';
    }
  }

  return (await copyText(content.url)) ? 'copied' : 'failed';
}
