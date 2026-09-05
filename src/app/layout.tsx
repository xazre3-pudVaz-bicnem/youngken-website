import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  HAS_SITE_URL,
  SITE_NAME,
  SITE_NAME_FULL,
  SITE_URL,
} from '@/lib/site';
import { jsonLdScript, restaurantJsonLd, websiteJsonLd } from '@/lib/jsonld';

/**
 * 見出し用の明朝は自前ホスト（public/fonts、scripts/fetch-fonts.mjs で取得）。
 * unicode-range で分割された @font-face は約99KBあるので、
 * ページCSSに混ぜず media="print" で非同期に読み込み、
 * FCP / LCP をブロックさせない。実際に落ちてくるのは数チャンクだけ。
 * 本文用のゴシックは端末標準（ヒラギノ／游ゴシック／Meiryo）を使う。
 */
const FONT_CSS = '/fonts/shippori-mincho-b1.css';

const DESCRIPTION =
  '三軒茶屋・太子堂のヤング軒。焼きたてのたこ焼き6個700円をつまみに、ハイボールやサワーを各500円で。寄り道セット990円。仕事帰りの一杯や一人飲み、二軒目にも。三軒茶屋駅から徒歩約4分、16時から22時まで営業。';

export const metadata: Metadata = {
  metadataBase: HAS_SITE_URL ? new URL(SITE_URL) : undefined,
  title: {
    default: `三軒茶屋のたこ焼き居酒屋｜一杯とつまみの寄り道処 ${SITE_NAME}`,
    template: `%s｜${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    '三軒茶屋 たこ焼き',
    '三軒茶屋 居酒屋',
    '三軒茶屋 ちょい飲み',
    '三軒茶屋 立ち飲み',
    '三軒茶屋 二軒目',
    '三軒茶屋 サク飲み',
    '三軒茶屋 一人飲み',
    '三軒茶屋 せんべろ',
    '太子堂 居酒屋',
    'ヤング軒',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: HAS_SITE_URL ? { canonical: '/' } : undefined,
  openGraph: HAS_SITE_URL
    ? {
        type: 'website',
        locale: 'ja_JP',
        siteName: `${SITE_NAME_FULL}`,
        title: `三軒茶屋のたこ焼き居酒屋｜一杯とつまみの寄り道処 ${SITE_NAME}`,
        description: DESCRIPTION,
        url: '/',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ヤング軒 三軒茶屋' }],
      }
    : undefined,
  twitter: HAS_SITE_URL
    ? {
        card: 'summary_large_image',
        title: `三軒茶屋のたこ焼き居酒屋｜一杯とつまみの寄り道処 ${SITE_NAME}`,
        description: DESCRIPTION,
        images: ['/og-image.jpg'],
      }
    : undefined,
  robots: HAS_SITE_URL
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
  other: { 'format-detection': 'telephone=no' },
};

export const viewport: Viewport = {
  themeColor: '#fbf6ee',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(){var l=document.createElement('link');l.rel='stylesheet';` +
              `l.href='${FONT_CSS}';l.media='print';l.onload=function(){this.media='all'};` +
              `document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={FONT_CSS} />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-sumi focus:px-4 focus:py-2 focus:text-paper"
        >
          本文へスキップ
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(restaurantJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
      </body>
    </html>
  );
}
