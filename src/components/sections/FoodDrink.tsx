import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';
import { DRINKS, DRINK_PRICE, SNACKS } from '@/lib/menu';

/** 「たこ焼き屋」ではなく「飲める店」だと伝える節。おつまみとお酒を並べて見せる。 */
export function FoodDrink() {
  return (
    <Section tone="paper" size="loose">
      <Container size="wide">
        <Reveal>
          <SectionTitle
            eyebrow="Food & Drink"
            lead={
              <p>
                たこ焼きを待つあいだの一品と、それに合わせる一杯。三軒茶屋で軽く飲みたい夜の、ちょうどいい量にしてあります。
              </p>
            }
          >
            つまみがあって、
            <br className="sm:hidden" />
            お酒がある。
          </SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="panel-paper-deep px-7 py-8">
                <p className="font-gothic text-[0.62rem] uppercase tracking-[0.32em] text-enji">
                  Otsumami
                </p>
                <p className="mt-5 font-mincho text-[1.2rem] tracking-[0.06em] text-sumi">
                  焼けるまでの、一品。
                </p>
                <ul className="mt-6 border-t border-rule">
                  {SNACKS.map((snack) => (
                    <li key={snack.name} className="border-b border-rule py-3.5">
                      <p className="font-gothic text-[0.88rem] tracking-[0.06em] text-sumi">
                        {snack.name}
                      </p>
                      {snack.note ? (
                        <p className="mt-1.5 font-gothic text-[0.72rem] tracking-[0.08em] text-sumi-3">
                          {snack.note}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-gothic text-[0.72rem] leading-[1.95] text-sumi-3">
                  価格は店頭の掲示をご確認ください。仕入れによって並ぶものが変わります。
                </p>
              </div>

              <div className="panel-paper-deep px-7 py-8">
                <p className="font-gothic text-[0.62rem] uppercase tracking-[0.32em] text-enji">
                  Drink
                </p>
                <p className="mt-5 font-mincho text-[1.2rem] tracking-[0.06em] text-sumi">
                  どれを選んでも、
                  <span className="tcy mx-0.5">{DRINK_PRICE}</span>円。
                </p>
                <ul className="mt-6 border-t border-rule">
                  {DRINKS.map((drink) => (
                    <li
                      key={drink.name}
                      className="flex items-baseline justify-between gap-4 border-b border-rule py-3.5"
                    >
                      <span className="font-gothic text-[0.88rem] tracking-[0.06em] text-sumi">
                        {drink.name}
                      </span>
                      {drink.note ? (
                        <span className="shrink-0 font-gothic text-[0.68rem] tracking-[0.08em] text-sumi-3">
                          {drink.note}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-gothic text-[0.72rem] leading-[1.95] text-sumi-3">
                  ヤングハイボールは自家製のジンジャーが香る一杯です。
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/menu" className="prose-link font-gothic text-[0.85rem]">
                メニューをすべて見る
              </Link>
              <Link href="/drink" className="prose-link font-gothic text-[0.85rem]">
                ちょい飲み・一人飲みの使い方
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              photo={PHOTOS.takoyakiSalt}
              ratio="portrait"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
