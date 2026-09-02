import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';
import { TAKOYAKI_BASE, TAKOYAKI_FLAVORS } from '@/lib/menu';

export function TakoyakiSection() {
  return (
    <Section tone="paper-2" size="loose">
      <Container size="wide">
        <Reveal className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Eyebrow>Takoyaki</Eyebrow>
            <h2 className="mt-6 font-mincho text-[1.75rem] leading-[1.6] tracking-[0.05em] text-sumi sm:text-[2.2rem] lg:text-[2.6rem]">
              一つずつ、返して焼く。
            </h2>
          </div>
          <p className="mt-7 max-w-md text-[0.95rem] leading-[2.15] text-sumi-2 lg:mt-0">
            注文を受けてから鉄板に流し、目の前で焼き上げます。6個{TAKOYAKI_BASE.price}円。味は黒板から選べます。
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <Photo
              photo={PHOTOS.takoyakiSauce}
              ratio="landscape"
              sizes="(min-width: 1024px) 56vw, (min-width: 640px) 50vw, 100vw"
            />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <Photo
              photo={PHOTOS.kitchen}
              ratio="landscape"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-5">
              <Photo
                photo={PHOTOS.takoyakiMayo}
                ratio="portrait"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
              <Photo
                photo={PHOTOS.takoyakiWasabi}
                ratio="landscape"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-mincho text-[1.35rem] leading-[1.6] tracking-[0.06em] text-sumi sm:text-[1.6rem]">
              味は、黒板から。
            </h3>
            <p className="mt-6 text-[0.93rem] leading-[2.1] text-sumi-2">
              ソース系と岩塩系。それに、当店オリジナルのきざみワサビ。同じたこ焼きでも、味が変わればもう一皿いけてしまいます。
            </p>

            <ul className="mt-9 border-t border-rule">
              {TAKOYAKI_FLAVORS.map((flavor) => (
                <li
                  key={flavor.name}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
                >
                  <span className="font-gothic text-[0.9rem] tracking-[0.06em] text-sumi">
                    {flavor.name}
                    {flavor.note ? (
                      <span className="ml-2 font-gothic text-[0.68rem] tracking-[0.12em] text-enji">
                        {flavor.note}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 font-gothic text-[0.8rem] tracking-[0.08em] text-sumi-3">
                    {flavor.price === null ? '店頭表示' : `${flavor.unit} ${flavor.price}円`}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/takoyaki"
              className="mt-9 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi transition-colors hover:border-enji hover:text-enji"
            >
              三軒茶屋で楽しむヤング軒のたこ焼き
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
