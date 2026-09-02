import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { BARBER } from '@/lib/site';

const PARAGRAPHS = [
  '三軒茶屋の発展とともに歩んできた理髪店「ヤング軒」は、初代が創業した老舗です。昭和40年、二代目が渡米を経験したことをきっかけに、屋号を「スーパーヘアーヤング」へと改名しました。',
  '地域の皆さまに支えられながら、長年にわたり三軒茶屋の街とともに歴史を重ねてきました。そして創業100年という節目を迎え、三代目が新たな挑戦として立ち飲み処「ヤング軒」をオープン。',
  '理髪店として受け継いできた「人と人とのつながり」を大切にしながら、気軽に集い、語らい、笑顔が生まれる場所を目指しています。',
];

/** 縦書きでは算用数字が寝てしまうので漢数字に置き換える */
const PARAGRAPHS_VERTICAL = [
  '三軒茶屋の発展とともに歩んできた理髪店「ヤング軒」は、初代が創業した老舗です。昭和四十年、二代目が渡米を経験したことをきっかけに、屋号を「スーパーヘアーヤング」へと改名しました。',
  '地域の皆さまに支えられながら、長年にわたり三軒茶屋の街とともに歴史を重ねてきました。そして創業百年という節目を迎え、三代目が新たな挑戦として立ち飲み処「ヤング軒」をオープン。',
  '理髪店として受け継いできた「人と人とのつながり」を大切にしながら、気軽に集い、語らい、笑顔が生まれる場所を目指しています。',
];

export function Story() {
  return (
    <Section tone="paper-3" size="loose" id="story">
      <Container size="wide">
        {/* PC：縦書き */}
        <Reveal className="hidden lg:block">
          {/* 縦書きは右から左へ読むので、見出しを右端に置く */}
          <div className="flex justify-center gap-14 xl:gap-20">
            <div className="min-w-0 max-h-[30rem] overflow-x-auto">
              <div className="v-text h-[30rem] text-[0.95rem] leading-[2.35] tracking-[0.09em] text-sumi-2">
                {PARAGRAPHS_VERTICAL.map((p) => (
                  <p key={p} className="ml-9 first:ml-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 gap-7">
              <p className="v-text mt-1 font-gothic text-[0.68rem] tracking-[0.3em] text-sumi-3">
                百年続く床屋が始めた、三軒茶屋の新しい寄り道処。
              </p>
              <h2 className="v-text font-mincho text-[2.9rem] leading-[1.35] tracking-[0.14em] text-sumi xl:text-[3.4rem]">
                百年床屋と
                <span className="text-enji">立ち飲み処。</span>
              </h2>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/barber"
              className="inline-flex items-center gap-2 border-b border-rule-strong pb-1.5 font-gothic text-[0.85rem] tracking-[0.1em] text-sumi transition-colors hover:border-enji hover:text-enji"
            >
              {BARBER.name}とヤング軒の物語
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        {/* SP・タブレット：横書き */}
        <Reveal className="lg:hidden">
          <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji">Story</p>
          <h2 className="mt-6 font-mincho text-[1.9rem] leading-[1.55] tracking-[0.08em] text-sumi sm:text-[2.3rem]">
            百年床屋と、
            <br />
            <span className="text-enji">立ち飲み処。</span>
          </h2>
          <p className="mt-6 font-gothic text-[0.78rem] leading-[2] tracking-[0.14em] text-sumi-3">
            百年続く床屋が始めた、三軒茶屋の新しい寄り道処。
          </p>

          <div className="mt-9 space-y-6 text-[0.93rem] leading-[2.15] text-sumi-2">
            {PARAGRAPHS.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <Link
            href="/barber"
            className="mt-10 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi"
          >
            {BARBER.name}とヤング軒の物語
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
