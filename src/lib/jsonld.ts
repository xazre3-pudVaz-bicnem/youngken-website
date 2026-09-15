import {
  HAS_SITE_URL,
  HOURS,
  NAP,
  SERVICE,
  SITE_NAME,
  SITE_NAME_FULL,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from './site';
import { DRINK_GROUPS, TAKOYAKI_BASE, TAKOYAKI_FLAVORS, YORIMICHI_SET } from './menu';

/** たこ焼きの味を価格ごとにまとめる（700円の味／800円の味） */
const takoyakiPriceGroups = () => {
  const byPrice = new Map<number, string[]>();
  for (const f of TAKOYAKI_FLAVORS) {
    if (f.price === null) continue;
    byPrice.set(f.price, [...(byPrice.get(f.price) ?? []), f.name]);
  }
  return [...byPrice].map(([price, names]) => ({ price, names }));
};

/** 事実確認できた情報だけで構成する。未確認の項目（電話番号・SNS・座標）は出さない。 */

const RESTAURANT_ID = () => (HAS_SITE_URL ? `${SITE_URL}/#restaurant` : undefined);
const WEBSITE_ID = () => (HAS_SITE_URL ? `${SITE_URL}/#website` : undefined);

type Json = Record<string, unknown>;

/** undefined を落として構造化データのエラーを防ぐ */
const clean = <T extends Json>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T;

export const postalAddress = () =>
  clean({
    '@type': 'PostalAddress',
    streetAddress: `${NAP.street} ${NAP.building}`,
    addressLocality: NAP.city,
    addressRegion: NAP.region,
    postalCode: NAP.postalCode,
    addressCountry: 'JP',
  });

export const openingHoursSpecification = () => [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: HOURS.openDays.map((d) => `https://schema.org/${d}`),
    opens: HOURS.open,
    closes: HOURS.close,
  },
];

/** Restaurant（LocalBusiness のサブタイプなので二重に出さない） */
export const restaurantJsonLd = () =>
  clean({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID(),
    name: SITE_NAME,
    alternateName: SITE_NAME_FULL,
    description:
      'ヤング軒は東京都世田谷区太子堂、三軒茶屋駅から徒歩約4分の世田谷通り沿いにある、たこ焼きが名物の寄り道どころです。北海道産の大だこを使ったたこ焼きは6個700円から。ビール500円、ハイボール・サワー600円。たこ焼き三種盛りとドリンク1杯の寄り道セットは税込1,200円。店内のカウンターでお酒とおつまみを楽しめます。',
    slogan: SITE_TAGLINE,
    url: absoluteUrl('/'),
    address: postalAddress(),
    areaServed: [
      { '@type': 'Place', name: '三軒茶屋' },
      { '@type': 'Place', name: '太子堂' },
      { '@type': 'Place', name: '世田谷区' },
    ],
    servesCuisine: [...SERVICE.cuisine],
    priceRange: SERVICE.priceRange,
    currenciesAccepted: 'JPY',
    openingHoursSpecification: openingHoursSpecification(),
    hasMenu: absoluteUrl('/menu'),
    image: HAS_SITE_URL
      ? [absoluteUrl('/photos/storefront.jpg'), absoluteUrl('/photos/takoyaki-sauce.jpg')]
      : undefined,
    makesOffer: [
      ...takoyakiPriceGroups().map((g) => ({
        '@type': 'Offer',
        name: `${TAKOYAKI_BASE.label}／${g.names.join('・')}`,
        price: String(g.price),
        priceCurrency: 'JPY',
      })),
      {
        '@type': 'Offer',
        name: `${YORIMICHI_SET.name}（${YORIMICHI_SET.itemsLabel}＋${YORIMICHI_SET.drinkLabel}）`,
        price: String(YORIMICHI_SET.price),
        priceCurrency: 'JPY',
      },
      ...DRINK_GROUPS.map((g) => ({
        '@type': 'Offer',
        name: g.label,
        price: String(g.price),
        priceCurrency: 'JPY',
      })),
    ],
  });

export const websiteJsonLd = () =>
  clean({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID(),
    name: `${SITE_NAME} 公式サイト`,
    alternateName: SITE_NAME_FULL,
    url: absoluteUrl('/'),
    inLanguage: 'ja-JP',
    publisher: RESTAURANT_ID() ? { '@id': RESTAURANT_ID() } : undefined,
  });

export const breadcrumbJsonLd = (trail: { name: string; href: string }[]) =>
  HAS_SITE_URL
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.href),
        })),
      }
    : undefined;

export type Faq = { q: string; a: string };

export const faqJsonLd = (faqs: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const blogPostingJsonLd = (post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
}) =>
  clean({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'ja-JP',
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: RESTAURANT_ID()
      ? { '@id': RESTAURANT_ID() }
      : { '@type': 'Organization', name: SITE_NAME },
  });

/** <script type="application/ld+json"> を安全に埋める */
export const jsonLdScript = (data: unknown) => ({
  __html: JSON.stringify(data).replaceAll('<', '\\u003c'),
});
