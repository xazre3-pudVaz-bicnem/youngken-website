/**
 * メニュー情報。出典は店頭の黒板・貼り紙・立て看板の写真のみ。
 * 写真から確定できない価格は price を null にして「店頭表示」と出す。
 */

export type MenuItem = {
  name: string;
  note?: string;
  price: number | null;
  unit?: string;
};

/** たこ焼き（6個 700円・ソース／塩） */
export const TAKOYAKI_BASE = {
  pieces: 6,
  price: 700,
  label: 'たこ焼き（6個）',
} as const;

/** 黒板に掲示されている味の一覧 */
export const TAKOYAKI_FLAVORS: MenuItem[] = [
  { name: 'ソース', price: 700, unit: '6個' },
  { name: 'ソースマヨ', price: 700, unit: '6個' },
  { name: 'ソースからしマヨ', price: 700, unit: '6個' },
  { name: 'ソース七味マヨ', price: 700, unit: '6個' },
  { name: '岩塩マヨ', price: 700, unit: '6個' },
  { name: '岩塩ブラックペッパー', price: 700, unit: '6個' },
  { name: 'きざみワサビ', note: '当店オリジナル', price: null, unit: '6個' },
];

/** 寄り道セット（店頭立て看板） */
export const YORIMICHI_SET = {
  name: '寄り道セット',
  catch: 'ちょっと寄ってく？',
  price: 990,
  taxNote: '税込',
  items: ['ソースマヨネーズ', '岩塩ペッパー', 'きざみワサビ'],
  itemsLabel: 'たこ焼き三種盛',
  drinkLabel: 'お好きなドリンク1杯',
} as const;

/** ドリンク（黒板 DRINK・各500円） */
export const DRINK_PRICE = 500;

export const DRINKS: MenuItem[] = [
  { name: 'ヤングハイボール', note: 'ジンジャー', price: DRINK_PRICE },
  { name: '角ハイボール', price: DRINK_PRICE },
  { name: 'レモンサワー', price: DRINK_PRICE },
  { name: 'ウーロンハイ', price: DRINK_PRICE },
  { name: '緑茶ハイ', price: DRINK_PRICE },
  { name: '缶ビール', price: DRINK_PRICE },
];

/** 店内の棚に並ぶ缶つまみ。銘柄は特定せず、種類のみ記載する。 */
export const SNACKS_NOTE =
  'カウンターの棚には、焼き鳥・鯖・いかなどの缶つまみを常備。たこ焼きが焼き上がるまでの一品にどうぞ。';

export const formatPrice = (price: number | null) =>
  price === null ? '店頭表示' : `${price.toLocaleString('ja-JP')}円`;
