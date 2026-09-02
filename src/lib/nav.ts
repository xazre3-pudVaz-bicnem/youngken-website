/** ナビゲーション定義。fs には一切依存させない（クライアントからも読むため）。 */

export type NavLink = {
  href: string;
  label: string;
  /** ヘッダー内の小さな補足（PCのみ表示） */
  sub?: string;
};

export const MAIN_NAV: NavLink[] = [
  { href: '/about', label: 'ヤング軒について', sub: 'About' },
  { href: '/takoyaki', label: 'たこ焼き', sub: 'Takoyaki' },
  { href: '/drink', label: 'ちょい飲み', sub: 'Choinomi' },
  { href: '/menu', label: 'メニュー', sub: 'Menu' },
  { href: '/access', label: 'アクセス', sub: 'Access' },
  { href: '/blog', label: 'ブログ', sub: 'Blog' },
];

export const FOOTER_NAV: NavLink[] = [
  ...MAIN_NAV,
  { href: '/barber', label: '百年床屋の話', sub: 'Story' },
];

/** パンくず用のページ名解決 */
export const PAGE_TITLES: Record<string, string> = {
  '/about': 'ヤング軒について',
  '/takoyaki': 'たこ焼き',
  '/drink': 'ちょい飲み・一人飲み',
  '/menu': 'メニュー',
  '/access': 'アクセス・店舗情報',
  '/barber': '百年床屋と、立ち飲み処。',
  '/blog': 'ブログ',
};
