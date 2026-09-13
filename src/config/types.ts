export type SectionKey =
  | 'cover'
  | 'intro'
  | 'calendar'
  | 'weddingInfo'
  | 'greeting'
  | 'directions'
  | 'notice'
  | 'accounts'
  | 'gallery'
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
  phone?: string;
  /** 장남, 차남, 장녀 등 */
  relation: string;
  father?: Parent;
  mother?: Parent;
}

export interface Account {
  /** 신랑, 신랑 아버지 등 */
  label: string;
  holder: string;
  bank: string;
  number: string;
}

export interface DirectionItem {
  title: string;
  lines: string[];
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
    hall: string;
    address: string;
    tel?: string;
    lat: number;
    lng: number;
  };
  cover: {
    /** src/assets/photos/ 안의 파일명 */
    photo?: string;
    petals: boolean;
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
