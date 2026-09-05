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
import { MENU_FAQ } from '@/lib/content';
import {
  DRINKS,
  DRINK_PRICE,
  SNACKS,
  SNACKS_NOTE,
  TAKOYAKI_BASE,
  TAKOYAKI_FLAVORS,
  YORIMICHI_SET,
  formatPrice,
  type MenuItem,
} from '@/lib/menu';

export const metadata = pageMetadata({
  title: 'メニューと値段｜三軒茶屋で飲めるたこ焼き居酒屋 ヤング軒',
  description:
    'ヤング軒のメニューと値段。たこ焼き6個700円（ソース・岩塩・きざみワサビ）、ドリンク各500円、寄り道セット990円、きゅうりの旨キムチや缶つまみも。三軒茶屋・太子堂で料理とお酒を気軽に楽しめる店の品書きです。',
  path: '/menu',
});

function PriceRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
      <span className="font-gothic text-[0.92rem] tracking-[0.06em] text-sumi">
        {item.name}
        {item.note ? (
          <span className="ml-2 text-[0.7rem] tracking-[0.12em] text-enji">{item.note}</span>
        ) : null}
      </span>
      <span className="shrink-0 font-gothic text-[0.82rem] text-sumi-3">
        {item.unit ? `${item.unit} ` : ''}
        {formatPrice(item.price)}
      </span>
    </li>
  );
}

const BUDGET = [
  { price: '500円', body: 'ドリンク1杯。仕事帰りに一杯だけ、という日に。' },
  { price: '700円', body: 'たこ焼き6個。持ち帰りにもできます。' },
  { price: '990円', body: '寄り道セット。たこ焼き三種盛とお好きなドリンク1杯。' },
  { price: '1,500円前後', body: '寄り道セットにもう一杯と、一品を足したあたり。' },
];

export default function MenuPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Menu"
        title={
          <>
            つまみと、お酒と、
            <br />
            名物のたこ焼き。
          </>
        }
        lead={
          <p>
            ヤング軒の品書きです。たこ焼きは6個{TAKOYAKI_BASE.price}円、ドリンクは各
            {DRINK_PRICE}
            円。三軒茶屋で軽く飲みたい夜に、値段の見当がつくように組み立てています。価格はすべて店頭の掲示に準じます。
          </p>
        }
        trail={[{ name: 'メニュー', href: '/menu' }]}
        photo={PHOTOS.takoyakiMayo}
      />

      {/* 寄り道セット */}
      <Section tone="paper">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <Reveal>
              <Photo
                photo={PHOTOS.signboardSet}
                ratio="portrait"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </Reveal>
            <Reveal delay={100}>
              <p className="font-gothic text-[0.7rem] tracking-[0.2em] text-sumi-3">
                {YORIMICHI_SET.catch}
              </p>
              <h2 className="mt-3 font-mincho text-[1.8rem] tracking-[0.1em] text-sumi sm:text-[2.1rem]">
                {YORIMICHI_SET.name}
              </h2>
              <p className="mt-7 text-[0.95rem] leading-[2.15] text-sumi-2">
                {YORIMICHI_SET.itemsLabel}（{YORIMICHI_SET.items.join('・')}）に、
                {YORIMICHI_SET.drinkLabel}。まずこれを頼んで、足りなければ一杯足す。そういう頼み方をされる方が多いセットです。
              </p>
              <p className="mt-8 font-mincho text-sumi">
                <span className="text-[2.6rem] leading-none text-enji sm:text-[3rem]">
                  {YORIMICHI_SET.price.toLocaleString('ja-JP')}
                </span>
                <span className="ml-1.5 text-[1.05rem]">円</span>
                <span className="ml-3 font-gothic text-[0.7rem] tracking-[0.12em] text-sumi-3">
                  （{YORIMICHI_SET.taxNote}）
                </span>
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 名物たこ焼き */}
      <Section tone="paper-2">
        <Container size="wide">
          <Reveal>
            <SectionTitle eyebrow="Takoyaki" as="h2">
              名物のたこ焼き
            </SectionTitle>
            <p className="mt-8 max-w-2xl text-[0.95rem] leading-[2.15] text-sumi-2">
              すべて6個入り{TAKOYAKI_BASE.price}
              円。注文を受けてから鉄板に流して焼き上げます。店内で一杯やりながらでも、持ち帰りでも。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
            <Reveal>
              <Photo
                photo={PHOTOS.takoyakiSauce}
                ratio="square"
                sizes="(min-width: 640px) 31vw, 100vw"
              />
              <p className="mt-3 font-gothic text-[0.75rem] tracking-[0.08em] text-sumi-3">
                ソース系
              </p>
            </Reveal>
            <Reveal delay={80}>
              <Photo
                photo={PHOTOS.takoyakiSalt}
                ratio="square"
                sizes="(min-width: 640px) 31vw, 100vw"
              />
              <p className="mt-3 font-gothic text-[0.75rem] tracking-[0.08em] text-sumi-3">
                岩塩系
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Photo
                photo={PHOTOS.takoyakiWasabi}
                ratio="square"
                sizes="(min-width: 640px) 31vw, 100vw"
              />
              <p className="mt-3 font-gothic text-[0.75rem] tracking-[0.08em] text-sumi-3">
                きざみワサビ（当店オリジナル）
              </p>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ul className="mt-12 border-t border-rule sm:columns-2 sm:gap-x-14">
              {TAKOYAKI_FLAVORS.map((item) => (
                <PriceRow key={item.name} item={item} />
              ))}
            </ul>
            <p className="mt-5 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
              きざみワサビの価格は店頭の貼り紙をご確認ください。
            </p>
            <Link href="/takoyaki" className="prose-link mt-6 inline-block font-gothic text-[0.85rem]">
              たこ焼きについて詳しく
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* おつまみ・一品 */}
      <Section tone="paper">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Otsumami" as="h2">
                焼けるまでの、一品。
              </SectionTitle>
              <p className="mt-8 text-[0.95rem] leading-[2.15] text-sumi-2">{SNACKS_NOTE}</p>
              <ul className="mt-10 border-t border-rule">
                {SNACKS.map((item) => (
                  <PriceRow key={item.name} item={item} />
                ))}
              </ul>
              <p className="mt-5 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
                その日の仕入れによって内容が変わります。棚と黒板を見て選んでください。
              </p>
            </Reveal>

            <Reveal delay={100}>
              <SectionTitle eyebrow="Drink" as="h2">
                お酒は、各{DRINK_PRICE}円。
              </SectionTitle>
              <p className="mt-8 text-[0.95rem] leading-[2.15] text-sumi-2">
                値段を揃えてあるので、二杯目を選ぶときに迷いません。ヤングハイボールは自家製のジンジャーが香る一杯です。
              </p>
              <ul className="mt-10 border-t border-rule">
                {DRINKS.map((item) => (
                  <PriceRow key={item.name} item={item} />
                ))}
              </ul>
              <Link href="/drink" className="prose-link mt-6 inline-block font-gothic text-[0.85rem]">
                ちょい飲み・一人飲みの使い方
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 予算の目安 */}
      <Section tone="paper-3" size="tight">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="Budget" as="h2">
              いくらで、どのくらい。
            </SectionTitle>
          </Reveal>
          <dl className="mt-12 border-t border-rule">
            {BUDGET.map((b, i) => (
              <Reveal
                key={b.price}
                delay={i * 70}
                className="flex flex-col gap-1.5 border-b border-rule py-5 sm:flex-row sm:gap-10"
              >
                <dt className="w-32 shrink-0 font-mincho text-[1.05rem] tracking-[0.06em] text-enji">
                  {b.price}
                </dt>
                <dd className="text-[0.92rem] leading-[2] text-sumi-2">{b.body}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-8 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
            表示価格・内容は店頭の掲示に準じます。仕入れの状況により、売り切れとなる場合があります。
          </p>
        </Container>
      </Section>

      <FaqList faqs={MENU_FAQ} tone="paper" />

      <NextLinks
        items={[
          {
            href: '/takoyaki',
            label: 'たこ焼き',
            body: '味の選び方と、焼き上がりまでの数分のこと。',
          },
          {
            href: '/drink',
            label: 'ちょい飲み・一人飲み',
            body: '千円で足りる、三軒茶屋の寄り道の作り方。',
          },
          {
            href: '/access',
            label: 'アクセス',
            body: '三軒茶屋駅から徒歩4分。営業時間と地図。',
          },
        ]}
        tone="paper-2"
      />
    </main>
  );
}
