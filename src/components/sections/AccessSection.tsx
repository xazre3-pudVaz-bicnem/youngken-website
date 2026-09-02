import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ACCESS, HOURS, MAP_EMBED_URL, MAP_SEARCH_URL, NAP, SITE_NAME } from '@/lib/site';

export function AccessSection() {
  return (
    <Section tone="paper" size="loose" id="access">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Access">店舗情報</SectionTitle>

            <dl className="mt-10 border-t border-rule text-[0.9rem] leading-[2.05]">
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-20 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                  店名
                </dt>
                <dd className="text-sumi">{SITE_NAME}</dd>
              </div>
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-20 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
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
                <dt className="w-20 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                  アクセス
                </dt>
                <dd className="text-sumi">
                  {ACCESS.primaryLine} {ACCESS.station} 徒歩約{ACCESS.walkMinutes}分
                </dd>
              </div>
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-20 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                  営業時間
                </dt>
                <dd className="text-sumi">{HOURS.display}</dd>
              </div>
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-20 shrink-0 font-gothic text-[0.75rem] tracking-[0.14em] text-sumi-3">
                  定休日
                </dt>
                <dd className="text-sumi">{HOURS.closedDisplay}</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={MAP_SEARCH_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="prose-link font-gothic text-[0.85rem]"
              >
                Googleマップで開く
              </a>
              <Link href="/access" className="prose-link font-gothic text-[0.85rem]">
                駅からの道順を見る
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-3 lg:aspect-[4/3.4]">
              <iframe
                title="ヤング軒の地図（東京都世田谷区太子堂4-5-1）"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
