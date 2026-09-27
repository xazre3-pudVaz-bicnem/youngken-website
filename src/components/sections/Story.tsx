import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';
import { BARBER, BARBER_TIMELINE } from '@/lib/site';

/**
 * 百年床屋の話。TOPでは物語の芯と年表の要約を見せ、本文は /barber に置く。
 * 年表は BARBER_TIMELINE の short を使い、/barber の body とは書き分けている。
 * 縦書きの中では算用数字を漢数字にする。
 */
const LEAD_VERTICAL =
  '三軒茶屋で百年、髪を切りながら人が集まってきた場所です。床屋は昔から、順番を待つあいだに世間話が生まれるところでした。その理髪店の最初の屋号が「理髪ヤング軒」。創業百年の節目に、三代目がその名前をとって、店の中に寄り道どころを始めています。';

export function Story() {
  return (
    <Section tone="paper-3" size="loose" id="story">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <figure>
              <Photo
                photo={PHOTOS.barberOldInterior}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <figcaption className="mt-3 font-gothic text-[0.72rem] leading-relaxed tracking-[0.08em] text-sumi-3">
                昔の理髪店の店内。
              </figcaption>
            </figure>

            {/* 昔と今の店構えを並べる */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
              <figure>
                <Photo
                  photo={PHOTOS.barberOldExterior}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
                <figcaption className="mt-3 font-gothic text-[0.72rem] tracking-[0.08em] text-sumi-3">
                  <span className="mr-2 text-enji">昔</span>理髪店の店構え
                </figcaption>
              </figure>
              <figure>
                <Photo
                  photo={PHOTOS.exteriorNight}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
                <figcaption className="mt-3 font-gothic text-[0.72rem] tracking-[0.08em] text-sumi-3">
                  <span className="mr-2 text-enji">今</span>サインポールの隣に提灯
                </figcaption>
              </figure>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* PC：縦書き */}
            <div className="hidden lg:flex lg:justify-end lg:gap-10">
              <h2 className="v-text order-2 font-mincho text-[2.4rem] leading-[1.35] tracking-[0.14em] text-sumi xl:text-[2.9rem]">
                百年床屋と
                <span className="text-enji">立ち飲み処。</span>
              </h2>
              <div className="order-1 min-w-0 max-h-[24rem] overflow-x-auto">
                <p className="v-text h-[24rem] text-[0.92rem] leading-[2.3] tracking-[0.09em] text-sumi-2">
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
              <div className="mt-8 space-y-5 text-[0.93rem] leading-[2.15] text-sumi-2">
                <p>
                  三軒茶屋で百年、髪を切りながら人が集まってきた場所です。床屋は昔から、順番を待つあいだに世間話が生まれるところでした。
                </p>
                <p>
                  その理髪店の最初の屋号が「{BARBER.originalName}
                  」。創業100年の節目に、三代目がその名前をとって、店の中に寄り道どころを始めています。
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 年表（要約） */}
        <ol className="mt-16 grid border-t border-rule-strong sm:mt-20 sm:grid-cols-3">
          {BARBER_TIMELINE.map((t, i) => (
            <Reveal
              as="li"
              key={t.year}
              delay={i * 90}
              className="border-b border-rule py-7 sm:border-b-0 sm:border-r sm:px-7 sm:py-9 sm:first:pl-0 sm:last:border-r-0"
            >
              <p className="font-mincho text-[1.05rem] tracking-[0.08em] text-enji">{t.year}</p>
              <h3 className="mt-3 font-mincho text-[1.15rem] leading-[1.6] tracking-[0.05em] text-sumi">
                {t.title}
              </h3>
              <p className="mt-2.5 text-[0.86rem] leading-[2] text-sumi-2">{t.short}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-10 sm:mt-12">
          <p className="font-gothic text-[0.78rem] leading-[2] text-sumi-3">
            {BARBER.foundedYear}年創業、{BARBER.generations}代続く「{BARBER.name}
            」の店内で営業しています。
          </p>
          <Link
            href="/barber"
            className="mt-6 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi transition-colors hover:border-enji hover:text-enji"
          >
            百年床屋とヤング軒の物語を読む
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
