import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';

/** 同じ行のタイルは同じ比率にして、グリッドに穴を作らない */
const ITEMS = [
  // 1段目：全幅の引き
  { photo: PHOTOS.exteriorNight, span: 'sm:col-span-2 lg:col-span-6', ratio: 'wide' },
  // 2段目：縦位置3枚
  { photo: PHOTOS.storefront, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.takoyakiSauce, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.exteriorWide, span: 'lg:col-span-2', ratio: 'tall' },
  // 3段目：横位置2枚
  { photo: PHOTOS.kitchen, span: 'sm:col-span-2 lg:col-span-3', ratio: 'landscape' },
  { photo: PHOTOS.staffCounter, span: 'sm:col-span-2 lg:col-span-3', ratio: 'landscape' },
  // 4段目：料理3枚
  { photo: PHOTOS.takoyakiWasabi, span: 'lg:col-span-2', ratio: 'landscape' },
  { photo: PHOTOS.takoyakiSalt, span: 'lg:col-span-2', ratio: 'landscape' },
  { photo: PHOTOS.takoyakiMayo, span: 'lg:col-span-2', ratio: 'landscape' },
] as const;

export function Gallery() {
  return (
    <Section tone="paper-2" size="loose">
      <Container size="wide">
        <Reveal>
          <SectionTitle eyebrow="Gallery" align="center">
            三軒茶屋の、ある夜のこと。
          </SectionTitle>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {ITEMS.map((item, i) => (
            <Reveal key={`${item.photo.src}-${i}`} delay={(i % 3) * 90} className={item.span}>
              <Photo
                photo={item.photo}
                ratio={item.ratio}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
