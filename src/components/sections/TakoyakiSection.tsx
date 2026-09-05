import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';
import { TAKOYAKI_BASE } from '@/lib/menu';

/** TOPでは写真と要点だけ。味の一覧は /takoyaki と /menu に置く。 */
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
            注文を受けてから鉄板に流し、目の前で焼き上げます。6個{TAKOYAKI_BASE.price}
            円。ソース系と岩塩系、それに当店オリジナルのきざみワサビから選べます。
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

        <Reveal delay={80} className="mt-10 sm:mt-12">
          <Link
            href="/takoyaki"
            className="inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-sumi transition-colors hover:border-enji hover:text-enji"
          >
            三軒茶屋で楽しむヤング軒のたこ焼き
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
