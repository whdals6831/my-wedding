import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** 앱 아이콘처럼 둥근 사각 바탕 위에 로고를 올린다 */
function AppIcon({ tile, children, ...props }: IconProps & { tile: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" {...props}>
      <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" fill={tile} stroke="#000" strokeOpacity={0.08} />
      {children}
    </svg>
  );
}

export const NaverMapIcon = (props: IconProps) => (
  <AppIcon tile="#fff" {...props}>
    <defs>
      <linearGradient id="naver-map-pin" x1="12" y1="4" x2="12" y2="20.4" gradientUnits="userSpaceOnUse">
        <stop offset="0.15" stopColor="#2a6cf6" />
        <stop offset="0.95" stopColor="#1fdd4c" />
      </linearGradient>
    </defs>
    <path
      fill="url(#naver-map-pin)"
      d="M12 4a6.4 6.4 0 0 0-6.4 6.4c0 3.6 2.6 6.3 5.2 9.2.7.7 1.7.7 2.4 0 2.6-2.9 5.2-5.6 5.2-9.2A6.4 6.4 0 0 0 12 4z"
    />
    <path fill="#fff" d="M9.3 7.7h2l1.6 2.4V7.7h1.8v5.4h-2l-1.6-2.4v2.4H9.3z" />
  </AppIcon>
);

export const KakaoMapIcon = (props: IconProps) => (
  <AppIcon tile="#ffe100" {...props}>
    <path
      fill="#0a7cff"
      fillRule="evenodd"
      d="M12 4.2a5.5 5.5 0 0 0-5.5 5.5c0 2.3 1.5 4 2.9 5.6 1.1 1.3 1.9 2.6 2.2 4.3.1.4.2.6.4.6s.3-.2.4-.6c.3-1.7 1.1-3 2.2-4.3 1.4-1.6 2.9-3.3 2.9-5.6A5.5 5.5 0 0 0 12 4.2zm0 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
    />
  </AppIcon>
);

export const TmapIcon = (props: IconProps) => (
  <AppIcon tile="#fff" {...props}>
    <defs>
      <linearGradient id="tmap-bar" x1="5" y1="6.75" x2="13" y2="6.75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff3ea5" />
        <stop offset="1" stopColor="#7a5cff" />
      </linearGradient>
      <linearGradient id="tmap-stem" x1="17.5" y1="5" x2="11.5" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#35e6a0" />
        <stop offset="1" stopColor="#0a5cff" />
      </linearGradient>
    </defs>
    <path fill="url(#tmap-bar)" d="M5 5h9v3.5H5z" />
    <path
      fill="url(#tmap-stem)"
      d="M10.2 19v-8a6 6 0 0 1 6-6H19v3.5h-2.7a2.5 2.5 0 0 0-2.5 2.5v8z"
    />
  </AppIcon>
);
