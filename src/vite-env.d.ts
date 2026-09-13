/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_JS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** public/og 이미지의 절대 URL. 이미지가 없으면 빈 문자열 (vite.config.ts에서 주입) */
declare const __OG_IMAGE_URL__: string;
