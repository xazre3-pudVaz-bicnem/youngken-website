import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';
import { DRINKS, DRINK_PRICE, SNACKS_NOTE, TAKOYAKI_BASE } from '@/lib/menu';

export function FoodDrink() {
  return (
    <Section tone="paper" size="loose">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            eyebrow="Food & Drink"
            lead={<p>{SNACKS_NOTE}</p>}
          >
            たこ焼きと、お酒と、
            <br className="sm:hidden" />
            缶つまみ。
          </SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="panel-paper-deep p-8 sm:p-10">
              <p className="font-gothic text-[0.62rem] uppercase tracking-[0.32em] text-enji">
                Drink
              </p>
              <p className="mt-5 font-mincho text-[1.35rem] tracking-[0.08em] text-sumi sm:text-[1.55rem]">
                どれを選んでも、
                <span className="tcy mx-0.5">{DRINK_PRICE}</span>円。
              </p>
              <ul className="mt-8 border-t border-rule">
                {DRINKS.map((drink) => (
                  <li
                    key={drink.name}
                    className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
                  >
                    <span className="font-gothic text-[0.9rem] tracking-[0.06em] text-sumi">
                      {drink.name}
                      {drink.note ? (
                        <span className="ml-2 text-[0.72rem] tracking-[0.1em] text-sumi-3">
                          （{drink.note}）
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 font-gothic text-[0.8rem] text-sumi-3">
                      {drink.price}円
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-gothic text-[0.75rem] leading-[1.95] text-sumi-3">
                ヤングハイボールは自家製のジンジャーが香る一杯です。
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/menu" className="prose-link font-gothic text-[0.85rem]">
                メニューをすべて見る
              </Link>
              <Link href="/takoyaki" className="prose-link font-gothic text-[0.85rem]">
                たこ焼きについて
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              photo={PHOTOS.takoyakiSalt}
              ratio="portrait"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <p className="mt-5 text-[0.9rem] leading-[2.05] text-sumi-2">
              たこ焼きは6個{TAKOYAKI_BASE.price}円。焼き上がりを待つあいだは、棚の缶つまみを開けて先に一杯。三軒茶屋の夜の、ちょうどいい入口です。
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
