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
  /** 店主からの修正指示（2026-09-15） */
  road: '世田谷通り',
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

/**
 * 提供スタイル。
 * 店頭の貼り紙は「立ち飲みもやってるよ！」、提灯は「立呑」。
 * つまり立ち飲みで飲めることは確実だが、着席できる席の有無は写真から確認できていない。
 * したがって「立ち飲み専門」「カウンターだけ」「席がない」と断定しないこと。
 */
export const SERVICE = {
  standing: '立ち飲み',
  takeout: 'テイクアウト',
  priceRange: '￥',
  cuisine: ['たこ焼き', '居酒屋'],
  /** 画面で使う言い回しの基準 */
  styleLabel: '店内のカウンターで立ち飲み／たこ焼きのテイクアウト可',
  /** 店主からの修正指示（2026-09-15） */
  tv: 'カウンター越しにテレビモニターがあり、スポーツ観戦をしながら一杯楽しめます。',
} as const;

/** 5秒で伝えたい要点（ヒーロー直下で使う） */
export const QUICK_FACTS = [
  { label: '場所', value: '三軒茶屋駅 徒歩4分' },
  { label: '名物', value: 'たこ焼き 6個700円〜' },
  { label: 'お酒', value: 'ビール500円・ハイボール600円' },
  { label: '営業', value: '16:00〜22:00／水・日休' },
] as const;

/** 百年床屋のストーリー（既存LP掲載文に準拠） */
export const BARBER = {
  name: 'スーパーヘアーヤング',
  foundedYear: 1923,
  generations: 3,
  renamedEra: '昭和40年',
  /** 創業時の屋号（店主からの修正指示で「ヤング軒」から「理髪ヤング軒」に訂正） */
  originalName: '理髪ヤング軒',
} as const;

/**
 * 百年床屋の年表。TOP の Story（short）と /barber（body）で共有する。
 * 出来事は既存LPと店主の修正指示で確認できたものだけ。推測で足さないこと。
 */
export const BARBER_TIMELINE = [
  {
    year: `${BARBER.foundedYear}年`,
    title: `「${BARBER.originalName}」創業`,
    short: '三軒茶屋の地で、初代が理髪店を開く。',
    body: `三軒茶屋の地で、初代が理髪店を開きました。屋号は「${BARBER.originalName}」。街の発展とともに歩んできた老舗です。`,
  },
  {
    year: BARBER.renamedEra,
    title: `「${BARBER.name}」へ改名`,
    short: '二代目の渡米をきっかけに、屋号を改める。',
    body: `二代目が渡米を経験したことをきっかけに、屋号を「${BARBER.name}」へ。以来、地域の皆さまに支えられながら長年営業を続けてきました。`,
  },
  {
    year: '創業100年',
    title: `「${SITE_NAME}」開店`,
    short: '三代目が、最初の屋号から名前をとって店を開く。',
    body: '創業100年という節目を迎え、三代目が新たな挑戦として店の中に寄り道どころをオープン。最初の屋号の名前が、もう一度看板に戻ってきました。',
  },
] as const;
