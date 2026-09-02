/**
 * ヤング軒 サイト共通の一次情報。
 * ここに書いてよいのは「店頭掲示・看板・既存LPで確認できた事実」だけ。
 * 未確認の情報（電話番号・SNS・座席数など）は追加しないこと。
 */

export const SITE_NAME = 'ヤング軒';
export const SITE_NAME_FULL = 'おいしい寄り道 ヤング軒';
export const SITE_TAGLINE = 'たこ焼きと一杯。三軒茶屋の寄り道処。';

/** 本番ドメインが決まるまで canonical / OG / sitemap を出力しないためのゲート */
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL = RAW_SITE_URL ? RAW_SITE_URL.replace(/\/$/, '') : '';
export const HAS_SITE_URL = SITE_URL.length > 0;

export const absoluteUrl = (path = '/') =>
  HAS_SITE_URL ? `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}` : undefined;

/** NAP（全ページ共通・表記ゆれ禁止） */
export const NAP = {
  name: SITE_NAME,
  postalCode: '154-0004',
  region: '東京都',
  city: '世田谷区',
  street: '太子堂4丁目5-1',
  building: 'スーパーヘアーヤング内',
  addressLine: '東京都世田谷区太子堂4丁目5-1 スーパーヘアーヤング内',
  addressFull: '〒154-0004 東京都世田谷区太子堂4丁目5-1 スーパーヘアーヤング内',
} as const;

export const ACCESS = {
  station: '三軒茶屋駅',
  line: '東急田園都市線・東急世田谷線',
  primaryLine: '東急田園都市線',
  walkMinutes: 4,
  summary: '東急田園都市線 三軒茶屋駅から徒歩約4分',
} as const;

export const HOURS = {
  open: '16:00',
  close: '22:00',
  display: '16:00〜22:00',
  closedDays: ['水曜日', '日曜日'],
  closedDisplay: '水曜・日曜',
  /** JSON-LD 用（水・日を除く5日） */
  openDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
} as const;

/** Googleマップ導線（店名＋住所検索・実在URLのみ） */
export const MAP_SEARCH_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('ヤング軒 東京都世田谷区太子堂4-5-1');

export const MAP_EMBED_URL =
  'https://maps.google.com/maps?output=embed&hl=ja&z=17&q=' +
  encodeURIComponent('東京都世田谷区太子堂4-5-1');

/** 提供スタイル */
export const SERVICE = {
  standing: '立ち飲み',
  takeout: 'テイクアウト',
  priceRange: '￥',
  cuisine: ['たこ焼き', '居酒屋'],
} as const;

/** 百年床屋のストーリー（既存LP掲載文に準拠） */
export const BARBER = {
  name: 'スーパーヘアーヤング',
  foundedYear: 1923,
  generations: 4,
  renamedEra: '昭和40年',
  originalName: 'ヤング軒',
} as const;
