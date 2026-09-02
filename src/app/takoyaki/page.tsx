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
import { TAKOYAKI_BASE, TAKOYAKI_FLAVORS, YORIMICHI_SET } from '@/lib/menu';
import { ACCESS } from '@/lib/site';

export const metadata = pageMetadata({
  title: '三軒茶屋でたこ焼きならヤング軒｜お酒と一緒に楽しめる店',
  description:
    '三軒茶屋のたこ焼きはヤング軒へ。注文を受けてから焼く6個700円のたこ焼きを、ソースや岩塩、当店オリジナルのきざみワサビで。立ち飲みなのでお酒と一緒に、持ち帰りにも対応しています。',
  path: '/takoyaki',
});

const SAUCE = TAKOYAKI_FLAVORS.filter((f) => f.name.startsWith('ソース'));
const SALT = TAKOYAKI_FLAVORS.filter((f) => f.name.startsWith('岩塩'));
const ORIGINAL = TAKOYAKI_FLAVORS.filter((f) => f.note);

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
            {f.price === null ? '店頭表示' : `${f.unit} ${f.price}円`}
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
            ヤング軒のたこ焼きは6個{TAKOYAKI_BASE.price}
            円。注文を受けてから鉄板に流し、目の前で一つずつ返して焼き上げます。ソース系と岩塩系、それに当店オリジナルのきざみワサビから選べます。
          </p>
        }
        trail={[{ name: 'たこ焼き', href: '/takoyaki' }]}
        photo={PHOTOS.takoyakiSauce}
      />

      <Section tone="paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Flavor">味は、七つ。</SectionTitle>
              <p className="mt-8 text-[0.95rem] leading-[2.15] text-sumi-2">
                同じ生地でも、かけるものが変われば別の一皿になります。一人なら六個で一種類、二人なら三種盛りで食べ比べ、というのがよくある頼み方です。
              </p>

              <div className="mt-12 space-y-10">
                <div>
                  <h2 className="font-mincho text-[1.2rem] tracking-[0.08em] text-sumi">
                    ソース系
                  </h2>
                  <FlavorList items={SAUCE} />
                </div>

                <div>
                  <h2 className="font-mincho text-[1.2rem] tracking-[0.08em] text-sumi">
                    岩塩系
                  </h2>
                  <FlavorList items={SALT} />
                </div>

                <div>
                  <h2 className="font-mincho text-[1.2rem] tracking-[0.08em] text-sumi">
                    当店オリジナル
                  </h2>
                  <FlavorList items={ORIGINAL} />
                  <p className="mt-4 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
                    きざみワサビの価格は店頭の貼り紙をご確認ください。
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-4">
                <Photo
                  photo={PHOTOS.takoyakiMayo}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                />
                <Photo
                  photo={PHOTOS.takoyakiSalt}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="mt-10"
                />
                <Photo
                  photo={PHOTOS.takoyakiWasabi}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                />
                <Photo
                  photo={PHOTOS.takoyakiMayo2}
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
            </Reveal>
            <Reveal delay={100}>
              <SectionTitle eyebrow="How">焼けるまでの、数分。</SectionTitle>
              <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                <p>
                  たこ焼きは注文が入ってから焼きます。だから、少しだけ待ち時間があります。その数分をどう過ごすかで、ヤング軒の使い方が決まります。
                </p>
                <p>
                  持ち帰るなら、店頭で待つあいだに三軒茶屋の路地を眺めて。カウンターで飲むなら、先にドリンクを頼んで一口。焼き上がりに合わせて二杯目、という人もいます。
                </p>
                <p>
                  三種類を一度に試したいときは、
                  <Link href="/#yorimichi-set" className="prose-link">
                    寄り道セット
                  </Link>
                  が早いです。たこ焼き三種盛にお好きなドリンクが1杯ついて{YORIMICHI_SET.price}円（
                  {YORIMICHI_SET.taxNote}）。
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
                ヤング軒は{ACCESS.primaryLine} {ACCESS.station}から徒歩約{ACCESS.walkMinutes}
                分、世田谷区太子堂4丁目にあります。理髪店スーパーヘアーヤングの店内という、少し珍しい場所です。赤い壁と、たこ焼き・立呑の提灯が目印になります。
              </p>
              <p>
                持ち帰りだけの利用ももちろん歓迎です。ただ、せっかく目の前で焼いているので、そのまま一杯だけ付き合ってもらえるとうれしい、というのが本音です。
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
            body: 'たこ焼き、ドリンク、缶つまみの一覧と価格。',
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
