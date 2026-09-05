import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';

/**
 * TOPでは物語を要約だけ見せて、本文は /barber に置く。
 * （以前はここに /barber と同じ文章をそのまま載せていて重複していた）
 */
const LEAD =
  '三軒茶屋で百年、髪を切りながら人が集まってきた場所です。その理髪店のいちばん最初の屋号が「ヤング軒」でした。';

const LEAD_VERTICAL =
  '三軒茶屋で百年、髪を切りながら人が集まってきた場所です。その理髪店のいちばん最初の屋号が「ヤング軒」でした。創業百年の節目に、三代目が同じ名前で寄り道処を始めています。';

export function Story() {
  return (
    <Section tone="paper-3" size="loose" id="story">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <Photo
              photo={PHOTOS.exteriorNight}
              ratio="landscape"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </Reveal>

          <Reveal delay={100}>
            {/* PC：縦書き */}
            <div className="hidden lg:flex lg:justify-end lg:gap-10">
              <h2 className="v-text order-2 font-mincho text-[2.4rem] leading-[1.35] tracking-[0.14em] text-sumi xl:text-[2.9rem]">
                百年床屋と
                <span className="text-enji">立ち飲み処。</span>
              </h2>
              <div className="order-1 min-w-0 max-h-[22rem] overflow-x-auto">
                <p className="v-text h-[22rem] text-[0.92rem] leading-[2.3] tracking-[0.09em] text-sumi-2">
                  {LEAD_VERTICAL}
                </p>
              </div>
            </div>

            {/* SP・タブレット：横書き */}
            <div className="lg:hidden">
              <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji">
                Story
              </p>
              <h2 className="mt-6 font-mincho text-[1.9rem] leading-[1.55] tracking-[0.08em] text-sumi sm:text-[2.2rem]">
                百年床屋と、
                <br />
                <span className="text-enji">立ち飲み処。</span>
              </h2>
              <p className="mt-8 text-[0.93rem] leading-[2.15] text-sumi-2">
                {LEAD}創業百年の節目に、三代目が同じ名前で寄り道処を始めています。
              </p>
            </div>

            <Link
              href="/barber"
              className="mt-10 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi transition-colors hover:border-enji hover:text-enji lg:mt-12"
            >
              百年床屋とヤング軒の物語を読む
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
