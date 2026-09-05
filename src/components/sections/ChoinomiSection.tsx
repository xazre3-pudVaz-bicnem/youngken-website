import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';
import { SCENES } from '@/lib/content';

const SCENE_PHOTOS = [
  PHOTOS.storefront,
  PHOTOS.staffCounter,
  PHOTOS.takoyakiMayo2,
  PHOTOS.takoyakiWasabi,
  PHOTOS.signboardSet,
  PHOTOS.exteriorWide,
];

/**
 * 一人飲み・ちょい飲み・二軒目。
 * 以前は「CHOINOMI」と「SCENE」で似た内容を2セクション出していたので1つに統合した。
 */
export function ChoinomiSection() {
  return (
    <Section tone="sumi" size="loose">
      <Container size="wide">
        <Reveal className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji-3">
              Choinomi
            </p>
            <h2 className="mt-6 font-mincho text-[1.85rem] leading-[1.6] tracking-[0.06em] text-paper sm:text-[2.3rem] lg:text-[2.7rem]">
              一杯だけでも、どうぞ。
            </h2>
          </div>
          <p className="mt-7 max-w-md text-[0.93rem] leading-[2.15] text-paper/75 lg:mt-0">
            三軒茶屋で軽く飲みたい夜に。ドリンクは各500円、寄り道セットは990円。こんな使われ方をしています。
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map((scene, i) => (
            <Reveal as="li" key={scene.key} delay={(i % 3) * 80}>
              <Photo
                photo={SCENE_PHOTOS[i]}
                ratio="landscape"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
              />
              <h3 className="mt-6 font-mincho text-[1.15rem] tracking-[0.07em] text-paper">
                {scene.label}
              </h3>
              <p className="mt-3 text-[0.86rem] leading-[2.05] text-paper/70">{scene.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-14">
          <Link
            href="/drink"
            className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-paper/90 transition-colors hover:border-paper hover:text-paper"
          >
            ちょい飲み・一人飲みについて
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
