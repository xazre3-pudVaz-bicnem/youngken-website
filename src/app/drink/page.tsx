import Link from 'next/link';
import { pageMetadata } from '@/lib/meta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { FaqList } from '@/components/ui/FaqList';
import { NextLinks } from '@/components/ui/NextLinks';
import { PHOTOS } from '@/lib/photos';
import { DRINK_FAQ } from '@/lib/content';
import {
  DRINK_GROUPS,
  DRINK_PRICE_FROM,
  TAKOYAKI_BASE,
  YORIMICHI_SET,
  formatPrice,
} from '@/lib/menu';
import { ACCESS, HOURS, SERVICE } from '@/lib/site';

export const metadata = pageMetadata({
  title: '三軒茶屋でちょい飲み・一人飲み・せんべろ｜ヤング軒',
  description:
    '三軒茶屋で軽く一杯飲みたい夜に。ヤング軒はビール500円、ハイボールやサワー600円。たこ焼き三種盛りとドリンク1杯の寄り道セットは税込1,200円。仕事帰りの一杯、一人飲み、二軒目、スポーツ観戦しながらの一杯まで。',
  path: '/drink',
});

const CASES = [
  {
    title: '仕事帰りに、一杯だけ',
    body: '三軒茶屋駅から徒歩約4分。改札を出て、家に着くまでの途中に寄れます。たこ焼きが焼けるあいだに一杯、焼き上がりで二杯目。それで切り上げても、誰も気にしません。',
  },
  {
    title: '一人で、ふらっと',
    body: 'カウンター越しに焼き場が見えるので、一人でも間が持ちます。たこ焼き六個とハイボールを一杯。一人で来る方が多いお店です。',
  },
  {
    title: '待ち合わせまでの、十五分',
    body: '三軒茶屋は待ち合わせの多い街です。少し早く着いてしまった時間に、一杯だけ。頼むものが決まっているので、時間が読めます。',
  },
  {
    title: '二軒目として',
    body: '一軒目のあと、締めるにはまだ早いとき。たこ焼き六個とハイボールくらいが、ちょうど足ります。営業は22時までです。',
  },
  {
    title: 'スポーツを観ながら',
    body: `${SERVICE.tv}焼きたてのたこ焼きをつまみながら、一人でも、仲間とでも。`,
  },
  {
    title: 'セットで、迷わず',
    body: `たこ焼き三種盛りにお好きなドリンクが1杯ついた寄り道セットが${YORIMICHI_SET.taxNote}${YORIMICHI_SET.price.toLocaleString('ja-JP')}円。何を頼むか決めずに入っても、これで始められます。`,
  },
];

export default function DrinkPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Choinomi"
        title={
          <>
            一杯だけでも、
            <br />
            どうぞ。
          </>
        }
        lead={
          <p>
            ヤング軒は、三軒茶屋・太子堂でたこ焼きとお酒を気軽に楽しめる小さな店です。店内のカウンターで立ち飲みもできます。ビールは{DRINK_PRICE_FROM}
            円から、たこ焼きは6個{TAKOYAKI_BASE.price}
            円から。たこ焼き三種盛りにお好きなドリンクが1杯ついた寄り道セットなら
            {YORIMICHI_SET.taxNote}
            {YORIMICHI_SET.price.toLocaleString('ja-JP')}円です。
          </p>
        }
        trail={[{ name: 'ちょい飲み・一人飲み', href: '/drink' }]}
        photo={PHOTOS.takoyakiWasabiHighball}
      />

      <Section tone="paper">
        <Container size="wide">
          <Reveal>
            <SectionTitle
              eyebrow="Cases"
              lead={
                <p>
                  三軒茶屋で軽く飲みたいとき、ヤング軒がどう使われているか。よくある六つの使い方です。
                </p>
              }
            >
              こんな夜に、寄っていく。
            </SectionTitle>
          </Reveal>

          <div className="mt-14 grid gap-x-14 gap-y-12 sm:mt-18 sm:grid-cols-2">
            {CASES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 90}>
                <h2 className="font-mincho text-[1.25rem] leading-[1.7] tracking-[0.06em] text-sumi sm:text-[1.35rem]">
                  {c.title}
                </h2>
                <p className="mt-4 text-[0.92rem] leading-[2.1] text-sumi-2">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Price">値段が、読める。</SectionTitle>
              <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                <p>
                  ビールは{DRINK_PRICE_FROM}円、ハイボールやサワーは600円。二杯目を足すときも、頭の中で計算が終わります。
                </p>
                <p>
                  寄り道セットは{YORIMICHI_SET.taxNote}
                  {YORIMICHI_SET.price.toLocaleString('ja-JP')}円。{YORIMICHI_SET.itemsLabel}（
                  {YORIMICHI_SET.items.join('・')}）に、{YORIMICHI_SET.drinkLabel}がつきます。
                </p>
              </div>

              <dl className="mt-10 border-t border-rule">
                {DRINK_GROUPS.map((g) => (
                  <div key={g.key} className="border-b border-rule py-4">
                    <dt className="flex items-baseline justify-between gap-6 font-gothic text-[0.9rem] tracking-[0.06em] text-sumi">
                      {g.label}
                      <span className="shrink-0 text-[0.8rem] text-sumi-3">
                        {g.key === 'soft' ? '各' : ''}
                        {formatPrice(g.price)}
                      </span>
                    </dt>
                    <dd className="mt-2 font-gothic text-[0.76rem] leading-[1.9] tracking-[0.05em] text-sumi-3">
                      {g.items
                        .map((item) => (item.note ? `${item.name}（${item.note}）` : item.name))
                        .join('／')}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <Link href="/menu" className="prose-link font-gothic text-[0.85rem]">
                  メニューをすべて見る
                </Link>
                <Link href="/takoyaki" className="prose-link font-gothic text-[0.85rem]">
                  たこ焼きの味を選ぶ
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Photo
                photo={PHOTOS.menuDrink}
                ratio="auto"
                sizes="(min-width: 640px) 420px, 92vw"
                className="mx-auto max-w-[26rem]"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-3">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="Note">一人でも入りやすい理由</SectionTitle>
            <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
              <p>
                ヤング軒は店内のカウンターが主役の小さな店です。長いコース料理はないので、注文してすぐ飲み始められて、切り上げたいときに切り上げられます。
              </p>
              <p>
                たこ焼きが焼ける様子が目の前にあるので、一人でも手持ち無沙汰になりません。焼き手と少し話す人もいれば、黙って一杯だけ飲んで帰る人もいます。どちらでも大丈夫です。
              </p>
              <p>
                営業は{HOURS.display}、定休日は{HOURS.closedDisplay}。
                {ACCESS.primaryLine} {ACCESS.station}から徒歩約{ACCESS.walkMinutes}分です。
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FaqList faqs={DRINK_FAQ} tone="paper" />

      <NextLinks
        items={[
          {
            href: '/menu',
            label: 'メニュー',
            body: 'たこ焼き、ドリンク、缶つまみの一覧と価格。',
          },
          {
            href: '/about',
            label: 'ヤング軒について',
            body: '店の成り立ちと、立ち飲みという間口のこと。',
          },
          {
            href: '/blog',
            label: 'ブログ',
            body: '三軒茶屋の夜の過ごし方についての読みもの。',
          },
        ]}
        tone="paper-2"
      />
    </main>
  );
}
