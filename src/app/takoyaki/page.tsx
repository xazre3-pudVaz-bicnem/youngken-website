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
import { TAKOYAKI_FAQ } from '@/lib/content';
import {
  TAKOYAKI_BASE,
  TAKOYAKI_FLAVORS,
  TAKOYAKI_STORY,
  YORIMICHI_SET,
  formatPrice,
} from '@/lib/menu';
import { ACCESS } from '@/lib/site';

export const metadata = pageMetadata({
  title: '三軒茶屋でたこ焼きならヤング軒｜お酒と一緒に楽しめる店',
  description:
    '三軒茶屋のたこ焼きはヤング軒へ。北海道産の大だこを使い、職人が焼く屋台のたこ焼き。外はカリッと中はとろっと。6個700円から、ソースや岩塩、当店オリジナルのきざみワサビなど8種類。お酒と一緒に、持ち帰りにも。',
  path: '/takoyaki',
});

const GROUPS = [
  { key: 'sauce', label: 'ソース系' },
  { key: 'salt', label: '岩塩系' },
  { key: 'special', label: 'ワサビとガーリック' },
] as const;

function FlavorList({ items }: { items: typeof TAKOYAKI_FLAVORS }) {
  return (
    <ul className="mt-5 border-t border-rule">
      {items.map((f) => (
        <li
          key={f.name}
          className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
        >
          <span className="font-gothic text-[0.9rem] tracking-[0.06em] text-sumi">
            {f.name}
            {f.note ? (
              <span className="ml-2 text-[0.68rem] tracking-[0.12em] text-enji">{f.note}</span>
            ) : null}
          </span>
          <span className="shrink-0 font-gothic text-[0.8rem] text-sumi-3">
            {f.unit} {formatPrice(f.price)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function TakoyakiPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Takoyaki"
        title={
          <>
            三軒茶屋で、
            <br />
            たこ焼きを六個。
          </>
        }
        lead={
          <p>
            ヤング軒のたこ焼きは、{TAKOYAKI_STORY.octopus}を使った、{TAKOYAKI_STORY.maker}
            が焼く屋台のたこ焼きです。外はカリッと、中はとろっと。6個{TAKOYAKI_BASE.price}
            円から、味は{TAKOYAKI_FLAVORS.length}種類から選べます。
          </p>
        }
        trail={[{ name: 'たこ焼き', href: '/takoyaki' }]}
        photo={PHOTOS.takoyakiSauce}
      />

      <Section tone="paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Flavor">味は、八つ。</SectionTitle>
              <p className="mt-8 text-[0.95rem] leading-[2.15] text-sumi-2">
                同じ生地でも、かけるものが変われば別の一皿になります。一人なら六個で一種類、二人なら三種盛りで食べ比べ、というのがよくある頼み方です。
              </p>

              <div className="mt-12 space-y-10">
                {GROUPS.map((g) => (
                  <div key={g.key}>
                    <h2 className="font-mincho text-[1.2rem] tracking-[0.08em] text-sumi">
                      {g.label}
                    </h2>
                    <FlavorList items={TAKOYAKI_FLAVORS.filter((f) => f.group === g.key)} />
                  </div>
                ))}
              </div>
              <p className="mt-5 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
                すべて6個入り・{TAKOYAKI_BASE.taxNote}です。
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                <Photo
                  photo={PHOTOS.takoyakiSauceMayo}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                />
                <Photo
                  photo={PHOTOS.takoyakiPepper}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="mt-10"
                />
                <Photo
                  photo={PHOTOS.takoyakiWasabiHighball}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                />
                <Photo
                  photo={PHOTOS.takoyakiPepperLift}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="mt-10"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Photo
                photo={PHOTOS.kitchen}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Photo
                  photo={PHOTOS.logoDai}
                  ratio="square"
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
                <Photo
                  photo={PHOTOS.takoyakiMix}
                  ratio="square"
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <SectionTitle eyebrow="How">焼けるまでの、数分。</SectionTitle>
              <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                <p>
                  たこ焼きの寿命は{TAKOYAKI_STORY.lifeMinutes}
                  分。いつもいい状態ですぐに出せるよう、職人が勘を研ぎ澄ませて火加減を調節しています。
                </p>
                <p>
                  良質な{TAKOYAKI_STORY.oil}
                  を使い、油は少なめでカリッと焼き上げます。だから脂っこくなく、出汁の味が生きています。
                </p>
                <p>
                  たこは、北海道から取り寄せた大だこ。材料にこだわった、ほかにはないたこ焼きです。
                </p>
                <p>
                  お得な
                  <Link href="/#yorimichi-set" className="prose-link">
                    {YORIMICHI_SET.name}
                  </Link>
                  は、当店一押しのたこ焼き三種盛り（6個入り）に、お好きなドリンクを選べて
                  {YORIMICHI_SET.taxNote}
                  {YORIMICHI_SET.price.toLocaleString('ja-JP')}円です。
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-3" size="tight">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="Local">三軒茶屋でたこ焼きを探している方へ</SectionTitle>
            <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
              <p>
                ヤング軒は{ACCESS.station}から徒歩約{ACCESS.walkMinutes}分、{ACCESS.road}
                沿いの世田谷区太子堂4丁目にあります。理髪店スーパーヘアーヤングの店内という、少し珍しい場所です。赤い壁と、たこ焼き・立呑の提灯が目印になります。
              </p>
              <p>
                持ち帰りだけの利用ももちろん歓迎です。ただ、店内ならアツアツの焼きたてが食べられるので、そのまま一杯だけ付き合ってもらえるとうれしい、というのが本音です。
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FaqList faqs={TAKOYAKI_FAQ} tone="paper" />

      <NextLinks
        items={[
          {
            href: '/menu',
            label: 'メニュー',
            body: 'たこ焼き、お酒、おつまみの一覧と価格。',
          },
          {
            href: '/drink',
            label: 'ちょい飲み・一人飲み',
            body: 'たこ焼きをつまみに一杯、という夜の使い方。',
          },
          {
            href: '/access',
            label: 'アクセス',
            body: '三軒茶屋駅から徒歩4分。地図と道順。',
          },
        ]}
        tone="paper-2"
      />
    </main>
  );
}
