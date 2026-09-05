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
import { DRINKS, DRINK_PRICE, TAKOYAKI_BASE, YORIMICHI_SET } from '@/lib/menu';
import { ACCESS, HOURS } from '@/lib/site';

export const metadata = pageMetadata({
  title: '三軒茶屋でちょい飲み・一人飲み・せんべろ｜ヤング軒',
  description:
    '三軒茶屋で軽く一杯飲みたい夜に。ヤング軒はドリンク各500円、たこ焼き三種盛とドリンク1杯の寄り道セットが990円。千円あればひととおり足ります。仕事帰りの一杯、一人飲み、二軒目、せんべろ的な使い方まで。',
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
            ヤング軒は、三軒茶屋・太子堂で料理とお酒を気軽に楽しめる小さな店です。店先のカウンターで立ち飲みもできます。ドリンクは各{DRINK_PRICE}
            円、たこ焼きは6個{TAKOYAKI_BASE.price}円。たこ焼き三種盛にお好きなドリンクが1杯ついた寄り道セットなら
            {YORIMICHI_SET.price}円（{YORIMICHI_SET.taxNote}）です。
          </p>
        }
        trail={[{ name: 'ちょい飲み・一人飲み', href: '/drink' }]}
        photo={PHOTOS.exteriorNight}
      />

      <Section tone="paper">
        <Container size="wide">
          <Reveal>
            <SectionTitle
              eyebrow="Cases"
              lead={
                <p>
                  三軒茶屋で軽く飲みたいとき、ヤング軒がどう使われているか。実際に多い四つの使い方です。
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
              <SectionTitle eyebrow="Price">千円で、足りる。</SectionTitle>
              <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                <p>
                  寄り道セットは{YORIMICHI_SET.price}円（{YORIMICHI_SET.taxNote}）。
                  {YORIMICHI_SET.itemsLabel}（{YORIMICHI_SET.items.join('・')}）に、
                  {YORIMICHI_SET.drinkLabel}がつきます。三軒茶屋でせんべろを探している方にも、値段の見当がつきやすい一皿です。
                </p>
                <p>
                  単品なら、ドリンクが各{DRINK_PRICE}円、たこ焼きが6個{TAKOYAKI_BASE.price}
                  円。飲み足りなければ二杯目を足す、というだけの分かりやすさにしています。
                </p>
              </div>

              <ul className="mt-10 border-t border-rule">
                {DRINKS.map((d) => (
                  <li
                    key={d.name}
                    className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
                  >
                    <span className="font-gothic text-[0.9rem] tracking-[0.06em] text-sumi">
                      {d.name}
                      {d.note ? (
                        <span className="ml-2 text-[0.72rem] tracking-[0.1em] text-sumi-3">
                          （{d.note}）
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 font-gothic text-[0.8rem] text-sumi-3">
                      {d.price}円
                    </span>
                  </li>
                ))}
              </ul>

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
                photo={PHOTOS.signboardSet}
                ratio="portrait"
                sizes="(min-width: 1024px) 46vw, 100vw"
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
                ヤング軒は店先のカウンターが主役の小さな店です。長いコース料理はないので、注文してすぐ飲み始められて、切り上げたいときに切り上げられます。
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
