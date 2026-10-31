import type { WeddingConfig } from './types.ts';

/**
 * 청첩장 내용은 이 파일만 수정하면 됩니다. (TODO 표시된 값은 아직 샘플입니다)
 *
 * - 사진: src/assets/photos/ 에 파일을 넣고 아래 파일명과 맞추세요. 파일이 없으면 빈 자리로 표시됩니다.
 * - 갤러리: src/assets/gallery/ 에 01.jpg, 02.jpg … 처럼 넣으면 파일명 순서대로 자동 표시됩니다.
 * - 공유 썸네일: public/og/og-image.jpg (1200×600) 를 넣으면 카카오톡·링크 미리보기에 사용됩니다.
 * - 줄바꿈은 \n 으로 넣습니다.
 */
export const wedding: WeddingConfig = {
  siteUrl: 'https://whdals6831.github.io/my-wedding/',

  sections: [
    'cover',
    'greeting',
    'calendar',
    'location',
    'directions',
    'gallery',
    'accounts',
    'share',
  ],

  // TODO: phone은 아직 샘플 값
  groom: {
    lastName: '정',
    firstName: '종민',
    en: { lastName: 'Jeong', firstName: 'Jongmin' },
    phone: '010-0000-0000',
    relation: '아들',
    father: { name: '정해균', phone: '010-0000-0000' },
    mother: { name: '전홍자', phone: '010-0000-0000' },
  },

  bride: {
    lastName: '박',
    firstName: '주혜',
    en: { lastName: 'Park', firstName: 'Juhye' },
    phone: '010-0000-0000',
    relation: '딸',
    father: { name: '박도윤', phone: '010-0000-0000' },
    mother: { name: '조은주', phone: '010-0000-0000' },
  },

  dateTime: '2027-01-02T14:30:00+09:00',

  venue: {
    name: '루이비스웨딩홀',
    enName: 'Louisvis Wedding Hall, Seoul',
    mapName: '루이비스 웨딩홀 중구점',
    hall: '한국경제신문사빌딩 18층 다산홀',
    address: '서울 중구 청파로 463 (중림동 441)',
    tel: '02-312-6800',
    lat: 37.5601858,
    lng: 126.967097,
  },

  cover: {
    photo: 'main.webp',
    petals: true,
  },

  intro: {
    text: '사랑은 서로를 바라보는 것이 아니라\n함께 같은 방향을 바라보는 것이다.',
    source: '생텍쥐페리',
  },

  greeting: {
    // 종이 청첩장 문구. 휴대폰 폭(약 310px)에 맞춰 의미 단위로 줄을 나눴다
    text:
      '가을의 문턱에서 처음 마주한 두 사람이\n세 번의 겨울을 함께 건너,\n새해의 둘째 날 평생을 약속합니다.\n\n' +
      '섬세하고 따뜻한 주혜와\n성실하고 다정한 종민이가\n이제 앞으로의 모든 계절을 함께하려 합니다.\n\n' +
      '서툰 날에도 눈부신 날에도\n오늘의 마음을 잊지 않겠습니다.\n' +
      '한 해의 첫 장을 여는 저희의 시작에\n따뜻한 축복으로 함께해 주세요.',
  },

  directions: {
    mapImage: 'directions-map.webp',
    items: [
      { title: '지하철', lines: ['2·5호선 충정로역 4번 출구 도보 3분'] },
      { title: '셔틀버스', lines: ['서울역 서부 롯데마트 앞 승차', '10분 간격 운행'] },
      {
        title: '버스',
        lines: [
          '한국경제신문사·충정로역 하차',
          { label: '간선', tone: 'blue', text: '370, 603, 172, 472, 700, 742, 271, 273, 600, 602' },
          { label: '지선', tone: 'green', text: '7011, 7017, 7013A·B, 1002' },
          { label: '광역', tone: 'red', text: '1004, 8600, G6005 (김포)' },
        ],
      },
      { title: '주차', lines: ['한국경제신문사빌딩 지하 주차장', '하객 2시간 무료'] },
    ],
  },

  notice: {
    title: '안내사항',
    text:
      '지하 주차장에 주차하신 후\n1층에서 고층 엘리베이터로 갈아타시어\n18층 다산홀로 올라와 주세요.',
  },

  accounts: {
    message: '참석이 어려우신 분들을 위해\n계좌번호를 함께 안내드립니다.\n너그러운 마음으로 양해 부탁드립니다.',
    // TODO: 은행명과 계좌번호는 아직 샘플 값
    groom: [
      { label: '신랑', holder: '정종민', bank: '○○은행', number: '000-000-000000' },
      { label: '신랑 아버지', holder: '정해균', bank: '○○은행', number: '000-000-000000' },
      { label: '신랑 어머니', holder: '전홍자', bank: '○○은행', number: '000-000-000000' },
    ],
    bride: [
      { label: '신부', holder: '박주혜', bank: '○○은행', number: '000-000-000000' },
      { label: '신부 아버지', holder: '박도윤', bank: '○○은행', number: '000-000-000000' },
      { label: '신부 어머니', holder: '조은주', bank: '○○은행', number: '000-000-000000' },
    ],
  },

  gallery: {
    initialCount: 9,
    placeholderCount: 12,
  },

  share: {
    title: '종민 ♥ 주혜 결혼합니다',
    description: '2027년 1월 2일 토요일 오후 2시 30분, 루이비스웨딩홀',
    image: 'og/og-image.jpg',
    buttonTitle: '청첩장 보기',
  },
};
