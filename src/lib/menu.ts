/**
 * メニュー情報。
 * 出典は店側から届いたメニュー表（たこ焼き・ドリンク・寄り道セット・ピーチメルバ／2026-09-15）と、
 * 店主からの修正指示。確定できない価格は price を null にして「店頭表示」と出す。
 */

export type MenuItem = {
  name: string;
  note?: string;
  price: number | null;
  unit?: string;
};

/** たこ焼きの基本（すべて6個入り・税込。いちばん安い味が700円） */
export const TAKOYAKI_BASE = {
  pieces: 6,
  price: 700,
  taxNote: '税込',
  label: 'たこ焼き（6個入り）',
} as const;

/** たこ焼きについて店主から聞いた事実（2026-09-15） */
export const TAKOYAKI_STORY = {
  octopus: '北海道産の大だこ',
  maker: '職人の大ちゃん',
  oil: 'こめ油',
  lifeMinutes: 30,
} as const;

export type TakoyakiFlavor = MenuItem & { group: 'sauce' | 'salt' | 'special' };

/** メニュー表の味（すべて6個入り・税込） */
export const TAKOYAKI_FLAVORS: TakoyakiFlavor[] = [
  { name: 'ソース', price: 700, unit: '6個', group: 'sauce' },
  { name: 'ソースマヨ', price: 700, unit: '6個', group: 'sauce' },
  { name: 'からしマヨ', price: 700, unit: '6個', group: 'sauce' },
  { name: 'マヨ七味', price: 700, unit: '6個', group: 'sauce' },
  { name: '岩塩', price: 700, unit: '6個', group: 'salt' },
  { name: '岩塩ペッパー', price: 700, unit: '6個', group: 'salt' },
  { name: 'きざみワサビ', note: '当店オリジナル', price: 800, unit: '6個', group: 'special' },
  { name: 'ガーリックマヨ', price: 800, unit: '6個', group: 'special' },
];

/** 寄り道セット（セットのポスター） */
export const YORIMICHI_SET = {
  name: '寄り道セット',
  catch: 'ちょっと寄ってく？',
  price: 1200,
  taxNote: '税込',
  items: ['きざみワサビ', 'ソースマヨ', '岩塩ペッパー'],
  itemsLabel: 'たこ焼き三種盛り（6個入り）',
  itemsDetail: '3種類×各2個',
  drinkLabel: 'お好きなドリンク1杯',
  drinkChoices: ['缶ビール', 'ヤングハイ（ジンジャーハイボール）', 'ハイボール', 'レモンサワー', '焼酎'],
} as const;

/** ドリンク（メニュー表）。価格帯ごとにまとめて持つ */
export type DrinkGroup = {
  key: string;
  label: string;
  price: number;
  items: MenuItem[];
};

export const DRINK_GROUPS: DrinkGroup[] = [
  {
    key: 'beer',
    label: 'ビール',
    price: 500,
    items: [
      { name: '缶ビール各種', note: 'アサヒ・サッポロ・キリンなど', price: 500 },
      { name: '瓶ビール', note: 'ハイネケン・ハートランド・バドワイザー', price: 500 },
    ],
  },
  {
    key: 'highball',
    label: 'ハイボール・サワー',
    price: 600,
    items: [
      { name: 'ヤングハイボール', note: 'ジンジャー', price: 600 },
      { name: '角ハイボール', price: 600 },
      { name: 'レモンサワー', price: 600 },
      { name: 'はちみつレモンサワー', price: 600 },
      { name: 'コークハイ', price: 600 },
      { name: 'カルピスサワー', price: 600 },
      { name: '緑茶ハイ', price: 600 },
      { name: 'ウーロンハイ', price: 600 },
    ],
  },
  {
    key: 'soft',
    label: 'ソフトドリンク',
    price: 350,
    items: [
      { name: 'コーラ', price: 350 },
      { name: 'オレンジジュース', price: 350 },
      { name: 'クラフトジンジャーエール', price: 350 },
      { name: 'レモネード', price: 350 },
      { name: 'レモンスカッシュ', price: 350 },
      { name: '緑茶', price: 350 },
      { name: '烏龍茶', price: 350 },
    ],
  },
];

/**
 * 焼酎は寄り道セットで選べるドリンクとしてポスターに載っているが、
 * ドリンクのメニュー表に単品価格が無いので「店頭表示」にしている。
 */
export const SHOCHU: MenuItem = { name: '焼酎', note: 'ロック・水割り・お湯割り', price: null };

export const DRINKS: MenuItem[] = [...DRINK_GROUPS.flatMap((g) => g.items), SHOCHU];

/** いちばん安いお酒（ビール） */
export const DRINK_PRICE_FROM = 500;

/**
 * おつまみ・一品。
 * 黒板・写真・店主からの修正指示で確認できたものだけ。価格は未確認のため null（＝店頭表示）。
 * すもっちはパッケージに「やわらかくんせいたまご」とある山形の燻製たまご。
 */
export const SNACKS: MenuItem[] = [
  { name: 'きゅうりの塩キムチ', price: null },
  { name: 'セロリ漬け', price: null },
  { name: '山形名物 すもっち', note: 'やわらかい燻製たまご', price: null },
  { name: '缶つまみ各種', note: '焼き鳥・鯖・いか・赤貝ほか', price: null },
];

export const SNACKS_NOTE =
  'きゅうりの塩キムチに、セロリ漬け。山形名物のすもっちもあります。棚には焼き鳥や鯖、いかの缶つまみ。たこ焼きに添える一品にどうぞ。';

/** 甘いもの（メニュー表） */
export const SWEETS: MenuItem[] = [{ name: 'ピーチメルバ', note: '桃とバニラアイス', price: 450 }];

export const formatPrice = (price: number | null) =>
  price === null ? '店頭表示' : `${price.toLocaleString('ja-JP')}円`;
