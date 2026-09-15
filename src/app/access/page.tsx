import { pageMetadata } from '@/lib/meta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { FaqList } from '@/components/ui/FaqList';
import { NextLinks } from '@/components/ui/NextLinks';
import { PHOTOS } from '@/lib/photos';
import { ACCESS_FAQ } from '@/lib/content';
import {
  ACCESS,
  HOURS,
  MAP_EMBED_URL,
  MAP_SEARCH_URL,
  NAP,
  SERVICE,
  SITE_NAME,
} from '@/lib/site';

export const metadata = pageMetadata({
  title: 'アクセス｜三軒茶屋駅 徒歩4分・世田谷区太子堂のヤング軒',
  description:
    'ヤング軒への行き方。東急田園都市線・世田谷線 三軒茶屋駅から徒歩約4分、世田谷区太子堂4丁目5-1のスーパーヘアーヤング内。太子堂で飲める店を探している方へ、地図と駅からの目印、営業時間16:00〜22:00・定休日 水曜・日曜をまとめました。',
  path: '/access',
});

const ROUTE = [
  {
    step: '1',
    title: '三軒茶屋駅の改札を出る',
    body: '東急田園都市線・東急世田谷線の三軒茶屋駅が最寄りです。地上に出たら、世田谷通り側へ向かいます。',
  },
  {
    step: '2',
    title: '世田谷通り沿いを歩く',
    body: '駅前の大きな交差点から、世田谷通り沿いを太子堂4丁目の方向へ進みます。',
  },
  {
    step: '3',
    title: '赤い壁と提灯が目印',
    body: '「スーパーヘアーヤング」の看板と理容店のサインポール、その隣に「たこ焼き」「立呑」の提灯。ここがヤング軒です。駅から徒歩約4分。',
  },
];

const NEARBY = [
  { area: '三軒茶屋駅から', detail: '徒歩約4分。田園都市線・世田谷線どちらの改札からも歩けます。' },
  { area: '太子堂エリアから', detail: '太子堂4丁目。住宅と店の混ざる通り沿いで、散歩の途中にも寄れます。' },
  { area: '若林・三宿方面から', detail: '世田谷通り沿いを三軒茶屋方面へ。徒歩でも自転車でも来やすい場所です。' },
];

export default function AccessPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Access"
        title={
          <>
            三軒茶屋駅から、
            <br />
            歩いて四分。
          </>
        }
        lead={
          <p>
            {SITE_NAME}は{NAP.region}
            {NAP.city}
            {NAP.street}、理髪店スーパーヘアーヤングの店内にあります。{ACCESS.line} {ACCESS.station}
            から徒歩約{ACCESS.walkMinutes}分、{ACCESS.road}沿いです。営業時間は{HOURS.display}、定休日は
            {HOURS.closedDisplay}です。
          </p>
        }
        trail={[{ name: 'アクセス・店舗情報', href: '/access' }]}
        photo={PHOTOS.exteriorWide}
      />

      <Section tone="paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionTitle eyebrow="Info" as="h2">
                店舗情報
              </SectionTitle>

              <dl className="mt-10 border-t border-rule text-[0.92rem] leading-[2.05]">
                <div className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                    店名
                  </dt>
                  <dd className="text-sumi">{SITE_NAME}</dd>
                </div>
                <div className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                    住所
                  </dt>
                  <dd className="text-sumi">
                    〒{NAP.postalCode}
                    <br />
                    {NAP.region}
                    {NAP.city}
                    {NAP.street}
                    <br />
                    {NAP.building}
                  </dd>
                </div>
                <div className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                    最寄り駅
                  </dt>
                  <dd className="text-sumi">
                    {ACCESS.line}
                    <br />
                    {ACCESS.station} 徒歩約{ACCESS.walkMinutes}分
                  </dd>
                </div>
                <div className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                    営業時間
                  </dt>
                  <dd className="text-sumi">{HOURS.display}</dd>
                </div>
                <div className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                    定休日
                  </dt>
                  <dd className="text-sumi">{HOURS.closedDisplay}</dd>
                </div>
                <div className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                    スタイル
                  </dt>
                  <dd className="text-sumi">{SERVICE.styleLabel}</dd>
                </div>
              </dl>

              <a
                href={MAP_SEARCH_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-9 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi transition-colors hover:border-enji hover:text-enji"
              >
                Googleマップで開く
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-3">
                <iframe
                  title="ヤング軒の地図（東京都世田谷区太子堂4-5-1）"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <Photo
                photo={PHOTOS.storefront}
                ratio="landscape"
                position="50% 35%"
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="mt-5"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="Route" as="h2">
              駅からの道順
            </SectionTitle>
          </Reveal>

          <ol className="mt-12">
            {ROUTE.map((r, i) => (
              <Reveal
                as="li"
                key={r.step}
                delay={i * 80}
                className="flex gap-6 border-b border-rule py-7 first:border-t"
              >
                <span className="font-mincho text-[1.5rem] leading-none text-enji">{r.step}</span>
                <div>
                  <h3 className="font-mincho text-[1.15rem] tracking-[0.06em] text-sumi">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[2.05] text-sumi-2">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <h2 className="mt-16 font-mincho text-[1.35rem] tracking-[0.06em] text-sumi">
              周辺からのアクセス
            </h2>
            <dl className="mt-8 border-t border-rule">
              {NEARBY.map((n) => (
                <div
                  key={n.area}
                  className="flex flex-col gap-1.5 border-b border-rule py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="w-40 shrink-0 font-gothic text-[0.8rem] tracking-[0.1em] text-sumi">
                    {n.area}
                  </dt>
                  <dd className="text-[0.9rem] leading-[2] text-sumi-2">{n.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      <FaqList faqs={ACCESS_FAQ} tone="paper-3" />

      <NextLinks
        items={[
          {
            href: '/menu',
            label: 'メニュー',
            body: 'たこ焼き、ドリンク、寄り道セットの価格。',
          },
          {
            href: '/takoyaki',
            label: 'たこ焼き',
            body: '三軒茶屋で焼きたてを六個。味の選び方。',
          },
          {
            href: '/barber',
            label: '百年床屋の話',
            body: 'なぜ理髪店の店内に立ち飲み処があるのか。',
          },
        ]}
      />
    </main>
  );
}
