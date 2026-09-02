import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';
import { YORIMICHI_SET } from '@/lib/menu';

export function YorimichiSetSection() {
  return (
    <Section tone="paper-2" size="loose" id="yorimichi-set">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <Photo
              photo={PHOTOS.signboardSet}
              ratio="portrait"
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="shadow-[0_18px_48px_-30px_rgba(32,27,23,0.6)]"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-enji font-mincho text-[0.78rem] leading-tight tracking-[0.05em] text-paper">
                名物
              </span>
              <div>
                <p className="font-gothic text-[0.72rem] tracking-[0.18em] text-sumi-3">
                  {YORIMICHI_SET.catch}
                </p>
                <h2 className="mt-1.5 font-mincho text-[1.8rem] tracking-[0.1em] text-sumi sm:text-[2.15rem]">
                  {YORIMICHI_SET.name}
                </h2>
              </div>
            </div>

            <p className="mt-9 text-[0.95rem] leading-[2.15] text-sumi-2">
              たこ焼きを三種、食べ比べで。そこにお好きなドリンクが1杯ついて
              <span className="tcy mx-0.5">990</span>
              円。三軒茶屋で軽く一杯だけ、という夜にちょうどいい大きさにしてあります。
            </p>

            <div className="mt-10 border-y border-rule py-8">
              <p className="font-mincho text-[1.25rem] tracking-[0.08em] text-sumi sm:text-[1.4rem]">
                {YORIMICHI_SET.itemsLabel}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 font-gothic text-[0.88rem] tracking-[0.06em] text-sumi-2">
                {YORIMICHI_SET.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-enji-3" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-mincho text-[1.1rem] tracking-[0.08em] text-sumi">
                ＋ {YORIMICHI_SET.drinkLabel}
              </p>

              <p className="mt-8 font-mincho text-sumi">
                <span className="text-[2.6rem] leading-none tracking-[0.02em] text-enji sm:text-[3.1rem]">
                  {YORIMICHI_SET.price.toLocaleString('ja-JP')}
                </span>
                <span className="ml-1.5 text-[1.1rem]">円</span>
                <span className="ml-3 font-gothic text-[0.7rem] tracking-[0.12em] text-sumi-3">
                  （{YORIMICHI_SET.taxNote}）
                </span>
              </p>
            </div>

            <p className="mt-7 font-gothic text-[0.78rem] leading-[2] text-sumi-3">
              内容は店頭の掲示に準じます。売り切れの場合はご容赦ください。
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
