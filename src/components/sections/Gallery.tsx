import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PHOTOS } from '@/lib/photos';

/**
 * 同じ行のタイルは同じ比率にして、グリッドに穴を作らない。
 * SP・タブレット(2列)でも穴が出ないよう、1列ぶんのタイルは偶数枚ずつ続けて並べる。
 */
const ITEMS = [
  // 1段目：全幅の引き
  { photo: PHOTOS.exteriorNight, span: 'col-span-2 lg:col-span-6', ratio: 'wide' },
  // 2〜3段目：縦位置6枚（店構え → 料理とつまみ）
  { photo: PHOTOS.storefront, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.takoyakiSauce, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.exteriorWide, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.otsumamiSet, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.peachMelba, span: 'lg:col-span-2', ratio: 'tall' },
  { photo: PHOTOS.takoyakiMix, span: 'lg:col-span-2', ratio: 'tall' },
  // 4段目：横位置2枚（焼き場とカウンター）
  { photo: PHOTOS.kitchen, span: 'col-span-2 lg:col-span-3', ratio: 'landscape' },
  { photo: PHOTOS.staffCounter, span: 'col-span-2 lg:col-span-3', ratio: 'landscape' },
  // 5〜6段目：たこ焼き4枚
  { photo: PHOTOS.takoyakiWasabiHighball, span: 'lg:col-span-3', ratio: 'landscape' },
  { photo: PHOTOS.takoyakiSauceMayo, span: 'lg:col-span-3', ratio: 'landscape' },
  { photo: PHOTOS.takoyakiPepper, span: 'lg:col-span-3', ratio: 'landscape' },
  { photo: PHOTOS.takoyakiWasabi, span: 'lg:col-span-3', ratio: 'landscape' },
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

        <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {ITEMS.map((item, i) => (
            <Reveal key={`${item.photo.src}-${i}`} delay={(i % 3) * 90} className={item.span}>
              <Photo
                photo={item.photo}
                ratio={item.ratio}
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
