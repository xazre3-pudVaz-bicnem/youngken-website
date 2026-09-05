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
import { MAIN_FAQ } from '@/lib/content';
import { ACCESS, BARBER, HOURS, NAP } from '@/lib/site';
import { DRINK_PRICE, TAKOYAKI_BASE, YORIMICHI_SET } from '@/lib/menu';

export const metadata = pageMetadata({
  title: 'ヤング軒について｜三軒茶屋・太子堂のたこ焼きと一杯の店',
  description:
    'ヤング軒は東京都世田谷区太子堂、三軒茶屋駅から徒歩約4分にある、たこ焼きが名物の小さな飲み屋です。店の成り立ち、使い方、営業時間、百年続く床屋との関係をまとめました。',
  path: '/about',
});

const FACTS = [
  { label: '店名', value: 'ヤング軒（おいしい寄り道 ヤング軒）' },
  { label: '業態', value: 'たこ焼き・立ち飲み処（居酒屋）' },
  { label: '所在地', value: `〒${NAP.postalCode} ${NAP.addressLine}` },
  {
    label: '最寄り駅',
    value: `${ACCESS.primaryLine} ${ACCESS.station} 徒歩約${ACCESS.walkMinutes}分`,
  },
  { label: '営業時間', value: HOURS.display },
  { label: '定休日', value: HOURS.closedDisplay },
  {
    label: '価格帯',
    value: `たこ焼き6個 ${TAKOYAKI_BASE.price}円／ドリンク各 ${DRINK_PRICE}円／寄り道セット ${YORIMICHI_SET.price}円`,
  },
  { label: 'スタイル', value: '店先のカウンターで立ち飲み／たこ焼きのテイクアウト可' },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="About"
        title={
          <>
            たこ焼きと一杯の、
            <br />
            寄り道処です。
          </>
        }
        lead={
          <p>
            ヤング軒は東京都世田谷区太子堂、東急田園都市線 三軒茶屋駅から徒歩約4分にある、たこ焼きが名物の小さな飲み屋です。焼きたてのたこ焼きやおつまみをつまみながら、ハイボールやサワーを一杯。一人でも、二人でも、仕事帰りの一杯にも使えます。
          </p>
        }
        trail={[{ name: 'ヤング軒について', href: '/about' }]}
        photo={PHOTOS.staffCounter}
      />

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="Basic">お店のこと</SectionTitle>
          </Reveal>

          <dl className="mt-12 border-t border-rule">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1.5 border-b border-rule py-5 sm:flex-row sm:gap-8"
              >
                <dt className="w-32 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                  {fact.label}
                </dt>
                <dd className="text-[0.92rem] leading-[2] text-sumi">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 font-gothic text-[0.76rem] leading-[2] text-sumi-3">
            価格・内容は店頭の掲示に準じます。仕入れの状況により、売り切れとなる場合があります。
          </p>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Style">飲む店としての、間口。</SectionTitle>
              <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                <p>
                  主役は店先のカウンターです。焼き上がったたこ焼きをつまみながら、ハイボールやサワーを一杯。それだけで一晩ぶんになります。
                </p>
                <p>
                  頼むものが決まっているので、時間が読めます。三軒茶屋で待ち合わせまで二十分あるとき。一軒目のあとに、もう少しだけ話したいとき。家に帰る前に、今日を一度区切りたいとき。そういう夜のための店です。
                </p>
                <p>
                  たこ焼きだけの持ち帰りもできます。焼きたてを持って帰って、家で飲むのもいい使い方です。
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                <Link href="/drink" className="prose-link font-gothic text-[0.85rem]">
                  ちょい飲み・一人飲みの使い方
                </Link>
                <Link href="/menu" className="prose-link font-gothic text-[0.85rem]">
                  メニューを見る
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Photo
                photo={PHOTOS.kitchen}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <Photo
                photo={PHOTOS.takoyakiSauce}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="mt-5"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-3">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="Story">名前は、床屋から。</SectionTitle>
            <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
              <p>
                ヤング軒があるのは、三軒茶屋で{BARBER.foundedYear}年から
                {BARBER.generations}世代続く理髪店「{BARBER.name}」の店内です。そしてその理髪店のいちばん最初の屋号が、「ヤング軒」でした。
              </p>
              <p>
                髪を切りに来る人と、一杯飲みに来る人。人が集まる場所であることは、百年前から変わっていません。
              </p>
            </div>
            <Link
              href="/barber"
              className="mt-9 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi transition-colors hover:border-enji hover:text-enji"
            >
              百年床屋と、立ち飲み処。
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </Container>
      </Section>

      <FaqList faqs={MAIN_FAQ} tone="paper-2" />

      <NextLinks
        items={[
          {
            href: '/takoyaki',
            label: '三軒茶屋のたこ焼き',
            body: '6個700円。味の選び方と、焼き上がりまでの過ごし方。',
          },
          {
            href: '/drink',
            label: 'ちょい飲み・一人飲み',
            body: '990円の寄り道セットと、500円のドリンクのこと。',
          },
          {
            href: '/access',
            label: 'アクセス・店舗情報',
            body: '三軒茶屋駅からの道順と、営業時間のまとめ。',
          },
        ]}
      />
    </main>
  );
}
