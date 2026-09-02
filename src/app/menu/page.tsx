import Link from 'next/link';
import { pageMetadata } from '@/lib/meta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { NextLinks } from '@/components/ui/NextLinks';
import { PHOTOS } from '@/lib/photos';
import {
  DRINKS,
  DRINK_PRICE,
  SNACKS_NOTE,
  TAKOYAKI_BASE,
  TAKOYAKI_FLAVORS,
  YORIMICHI_SET,
  formatPrice,
  type MenuItem,
} from '@/lib/menu';

export const metadata = pageMetadata({
  title: 'メニュー｜三軒茶屋のたこ焼き・立ち飲み ヤング軒',
  description:
    'ヤング軒のメニュー。たこ焼き6個700円（ソース・岩塩・きざみワサビ）、ドリンク各500円（ヤングハイボール・角ハイボール・レモンサワーほか）、寄り道セット990円。三軒茶屋・太子堂の立ち飲み処です。',
  path: '/menu',
});

function PriceList({ items }: { items: MenuItem[] }) {
  return (
    <ul className="mt-7 border-t border-rule">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
        >
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
      ))}
    </ul>
  );
}

export default function MenuPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Menu"
        title={
          <>
            たこ焼きと、
            <br />
            お酒と、缶つまみ。
          </>
        }
        lead={
          <p>
            ヤング軒のメニューです。たこ焼きは6個{TAKOYAKI_BASE.price}円、ドリンクは各
            {DRINK_PRICE}円。価格はすべて店頭の掲示に準じます。
          </p>
        }
        trail={[{ name: 'メニュー', href: '/menu' }]}
        photo={PHOTOS.takoyakiMayo}
      />

      <Section tone="paper">
        <Container>
          <Reveal>
            <div className="panel-paper-deep px-7 py-10 sm:px-12 sm:py-12">
              <p className="font-gothic text-[0.7rem] tracking-[0.2em] text-sumi-3">
                {YORIMICHI_SET.catch}
              </p>
              <h2 className="mt-3 font-mincho text-[1.7rem] tracking-[0.1em] text-sumi sm:text-[2rem]">
                {YORIMICHI_SET.name}
              </h2>
              <p className="mt-6 text-[0.93rem] leading-[2.1] text-sumi-2">
                {YORIMICHI_SET.itemsLabel}（{YORIMICHI_SET.items.join('・')}）＋
                {YORIMICHI_SET.drinkLabel}
              </p>
              <p className="mt-7 font-mincho text-sumi">
                <span className="text-[2.4rem] leading-none text-enji sm:text-[2.8rem]">
                  {YORIMICHI_SET.price.toLocaleString('ja-JP')}
                </span>
                <span className="ml-1.5 text-[1.05rem]">円</span>
                <span className="ml-3 font-gothic text-[0.7rem] tracking-[0.12em] text-sumi-3">
                  （{YORIMICHI_SET.taxNote}）
                </span>
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Takoyaki" as="h2">
                たこ焼き
              </SectionTitle>
              <p className="mt-7 text-[0.9rem] leading-[2.05] text-sumi-2">
                すべて6個入り。注文を受けてから焼き上げます。持ち帰りもできます。
              </p>
              <PriceList items={TAKOYAKI_FLAVORS} />
              <p className="mt-5 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
                きざみワサビは当店オリジナルです。価格は店頭の貼り紙をご確認ください。
              </p>
              <Link href="/takoyaki" className="prose-link mt-6 inline-block font-gothic text-[0.85rem]">
                たこ焼きについて詳しく
              </Link>
            </Reveal>

            <Reveal delay={100}>
              <SectionTitle eyebrow="Drink" as="h2">
                ドリンク
              </SectionTitle>
              <p className="mt-7 text-[0.9rem] leading-[2.05] text-sumi-2">
                どれを選んでも各{DRINK_PRICE}
                円。ヤングハイボールは自家製のジンジャーが香る一杯です。
              </p>
              <PriceList items={DRINKS} />
              <Link href="/drink" className="prose-link mt-6 inline-block font-gothic text-[0.85rem]">
                ちょい飲み・一人飲みの使い方
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Snacks" as="h2">
                焼けるまでの、一品。
              </SectionTitle>
              <p className="mt-8 text-[0.95rem] leading-[2.15] text-sumi-2">{SNACKS_NOTE}</p>
              <p className="mt-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                その日の仕入れによって並ぶものが変わります。棚を見て選んでください。
              </p>
            </Reveal>
            <Reveal delay={100}>
              <Photo
                photo={PHOTOS.staffCounter}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </Reveal>
          </div>

          <p className="mt-14 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
            表示価格・内容は店頭の掲示に準じます。仕入れの状況により、売り切れとなる場合があります。
          </p>
        </Container>
      </Section>

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
        tone="paper-3"
      />
    </main>
  );
}
