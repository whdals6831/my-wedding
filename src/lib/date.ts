const TIME_ZONE = 'Asia/Seoul';
const DAY_MS = 86_400_000;

export const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKDAYS_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export interface KstDate {
  year: number;
  /** 1-12 */
  month: number;
  day: number;
  /** 0 = 일요일 */
  weekday: number;
  hour: number;
  minute: number;
}

const kstFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
  hour: 'numeric',
  minute: 'numeric',
  hourCycle: 'h23',
});

/** 보는 사람의 기기 시간대와 상관없이 한국 시간 기준으로 날짜를 분해 */
export function toKst(date: Date): KstDate {
  const parts = kstFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
    weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')),
    hour: Number(get('hour')),
    minute: Number(get('minute')),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');
const hour12 = (hour: number) => hour % 12 || 12;

/** 2027.05.15 SAT */
export const formatDateDot = (d: KstDate) => `${d.year}.${pad(d.month)}.${pad(d.day)} ${WEEKDAYS_EN[d.weekday]}`;

/** PM 12:30 */
export const formatTimeEn = (d: KstDate) => `${d.hour < 12 ? 'AM' : 'PM'} ${hour12(d.hour)}:${pad(d.minute)}`;

/** 2027년 5월 15일 토요일 */
export const formatDateKo = (d: KstDate) => `${d.year}년 ${d.month}월 ${d.day}일 ${WEEKDAYS_KO[d.weekday]}요일`;

/** 오후 12시 30분 */
export const formatTimeKo = (d: KstDate) =>
  `${d.hour < 12 ? '오전' : '오후'} ${hour12(d.hour)}시${d.minute ? ` ${d.minute}분` : ''}`;

export const monthNameEn = (d: KstDate) => MONTHS_EN[d.month - 1];

/** 오늘(한국 시간)부터 target 날짜까지 남은 일수. 지났으면 음수 */
export function daysUntil(target: KstDate, now: KstDate = toKst(new Date())): number {
  const t = Date.UTC(target.year, target.month - 1, target.day);
  const n = Date.UTC(now.year, now.month - 1, now.day);
  return Math.round((t - n) / DAY_MS);
}

/** 달력 칸 배열. 앞쪽 빈 칸은 null */
export function monthGrid(year: number, month: number): (number | null)[] {
  const leadingBlanks = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return [
    ...Array<null>(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
}
