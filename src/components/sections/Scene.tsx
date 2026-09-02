import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';
import { SCENES } from '@/lib/content';

const SCENE_PHOTOS = [
  PHOTOS.storefront,
  PHOTOS.takoyakiMayo2,
  PHOTOS.staffCounter,
  PHOTOS.takoyakiWasabi,
  PHOTOS.exteriorWide,
];

export function Scene() {
  return (
    <Section tone="paper" size="loose">
      <Container size="wide">
        <Reveal>
          <SectionTitle eyebrow="Scene" align="center">
            こんなときに、ヤング軒。
          </SectionTitle>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {SCENES.map((scene, i) => (
            <Reveal as="li" key={scene.key} delay={i * 80}>
              <Photo
                photo={SCENE_PHOTOS[i]}
                ratio="landscape"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
              />
              <h3 className="mt-6 font-mincho text-[1.2rem] tracking-[0.08em] text-sumi">
                {scene.label}
              </h3>
              <p className="mt-3 text-[0.88rem] leading-[2.05] text-sumi-2">{scene.body}</p>
            </Reveal>
          ))}

          <Reveal as="li" delay={400} className="flex">
            <div className="panel-paper-deep flex w-full flex-col justify-center px-8 py-12">
              <p className="font-mincho text-[1.3rem] leading-[1.8] tracking-[0.08em] text-sumi">
                今日も三茶で、
                <br />
                寄り道を。
              </p>
              <p className="mt-5 font-gothic text-[0.8rem] leading-[2] text-sumi-2">
                営業は16時から22時まで。水曜と日曜はお休みです。
              </p>
            </div>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
