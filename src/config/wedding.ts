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
    'intro',
    'calendar',
    'weddingInfo',
    'greeting',
    'directions',
    'notice',
    'accounts',
    'gallery',
    'share',
  ],

  // TODO: relation(장남/차남 등)과 phone은 아직 샘플 값
  groom: {
    lastName: '정',
    firstName: '종민',
    phone: '010-0000-0000',
    relation: '장남',
    father: { name: '정해균', phone: '010-0000-0000' },
    mother: { name: '전홍자', phone: '010-0000-0000' },
  },

  bride: {
    lastName: '박',
    firstName: '주혜',
    phone: '010-0000-0000',
    relation: '장녀',
    father: { name: '박도윤', phone: '010-0000-0000' },
    mother: { name: '조은주', phone: '010-0000-0000' },
  },

  dateTime: '2027-01-02T14:30:00+09:00',

  venue: {
    name: '루이비스웨딩홀',
    hall: '한국경제신문사빌딩 18층 다산홀',
    address: '서울 중구 청파로 463 (중림동 441)',
    tel: '02-312-6800',
    lat: 37.5601858,
    lng: 126.967097,
  },

  cover: {
    photo: 'wedding-photo-1.jpeg',
    petals: true,
  },

  intro: {
    text: '사랑은 서로를 바라보는 것이 아니라\n함께 같은 방향을 바라보는 것이다.',
    source: '생텍쥐페리',
  },

  greeting: {
    text:
      '서로의 하루를 궁금해하던 두 사람이\n이제 같은 하루를 함께 살아가려 합니다.\n\n' +
      '늘 곁에서 아껴주신 고마운 분들을 모시고\n사랑의 약속을 하려 합니다.\n\n' +
      '바쁘시더라도 귀한 걸음 하시어\n저희의 시작을 따뜻하게 축복해 주세요.',
  },

  directions: {
    mapImage: 'directions-map.jpg',
    items: [
      {
        title: '지하철',
        lines: ['2·5호선 충정로역 4번 출구 도보 3분', '1·4호선 서울역 도보 10분'],
      },
      {
        title: '버스',
        lines: ['충정로역(종근당) 하차', '간선 172, 472, 602, 603', '지선 7011, 7013, 7017'],
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
