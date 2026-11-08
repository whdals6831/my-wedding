export type SectionKey =
  | 'cover'
  | 'greeting'
  | 'calendar'
  | 'location'
  | 'directions'
  | 'notice'
  | 'intro'
  | 'gallery'
  | 'accounts'
  | 'share';

export interface Parent {
  name: string;
  phone?: string;
  /** 고인인 경우 이름 앞에 故 표기, 연락처 목록에서 제외 */
  deceased?: boolean;
}

export interface Side {
  lastName: string;
  firstName: string;
  /** 영문 표기 (커버 타자기 문구, 인사말 필기체 타이틀에 사용) */
  en: { lastName: string; firstName: string };
  phone?: string;
  /** 아들, 딸, 장남, 장녀 등. "부모님 이름의 OO" 형태로 표시 */
  relation: string;
  father?: Parent;
  mother?: Parent;
}

interface AccountBase {
  /** 신랑, 신랑 아버지 등 */
  label: string;
  holder: string;
}

/** 계좌번호를 보여주는 줄, 또는 다른 분 계좌로 함께 받을 때 계좌 대신 안내 문구(note)를 보여주는 줄 */
export type Account =
  | (AccountBase & { bank: string; number: string })
  | (AccountBase & { note: string });

/** 분류가 붙는 줄. 길어서 넘어가면 본문은 분류 뒤에 맞춰 정렬된다 */
export interface DirectionLine {
  label: string;
  text: string;
  /** 분류 글자색 (버스 간선·지선·광역 구분용) */
  tone?: 'blue' | 'green' | 'red';
}

export interface DirectionItem {
  title: string;
  lines: (string | DirectionLine)[];
}

export interface WeddingConfig {
  /** 배포 주소 (끝에 / 포함). vite base 경로와 공유 링크에 사용 */
  siteUrl: string;
  /** 렌더링 순서. 빼면 해당 섹션이 숨겨짐 */
  sections: SectionKey[];
  groom: Side;
  bride: Side;
  /** 반드시 +09:00 오프셋 포함 */
  dateTime: string;
  venue: {
    name: string;
    /** 커버 타자기 문구에 쓰는 영문 표기 */
    enName: string;
    /** 지도 앱에서 검색어·도착지로 쓸 이름. 없으면 name 사용 */
    mapName?: string;
    hall: string;
    address: string;
    tel?: string;
    lat: number;
    lng: number;
    /** 지도 화면의 가운데 좌표. 근처 역이 함께 보이도록 옮길 때 사용. 없으면 lat/lng */
    mapCenter?: { lat: number; lng: number };
  };
  cover: {
    /** src/assets/photos/ 안의 파일명 */
    photo?: string;
  };
  intro: {
    text: string;
    source?: string;
  };
  greeting: {
    text: string;
  };
  directions: {
    /** src/assets/photos/ 안의 약도 파일명. 없애면 약도 영역이 숨겨짐 */
    mapImage?: string;
    items: DirectionItem[];
  };
  notice: {
    title: string;
    image?: string;
    text: string;
  };
  accounts: {
    message: string;
    groom: Account[];
    bride: Account[];
  };
  gallery: {
    /** 처음에 보여줄 사진 수 */
    initialCount: number;
    /** 사진이 하나도 없을 때 보여줄 빈 칸 수 */
    placeholderCount: number;
  };
  share: {
    title: string;
    description: string;
    /** public/ 기준 경로. 파일이 있을 때만 링크 미리보기 이미지로 사용 */
    image: string;
    buttonTitle: string;
  };
}
