import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/SectionTitle';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';

export function Intro() {
  return (
    <Section tone="paper" size="loose">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>Introduction</Eyebrow>
            <h2 className="mt-6 font-mincho text-[1.7rem] leading-[1.65] tracking-[0.05em] text-sumi sm:text-[2.1rem] lg:text-[2.4rem]">
              たこ焼き屋であり、
              <br />
              立ち飲み処でもある。
            </h2>
            <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2 sm:text-base">
              <p>
                ヤング軒は、東京都世田谷区太子堂、三軒茶屋駅から徒歩約4分の場所にある、たこ焼きとお酒を楽しめるお店です。焼きたてのたこ焼きは6個700円。ハイボールやサワーは各500円。立ち飲みなので、一杯だけでも気兼ねなくどうぞ。
              </p>
              <p>
                持ち帰りのたこ焼きを買いに来る人もいれば、仕事帰りにそのままカウンターで一杯という人もいます。三軒茶屋で軽く飲みたい夜の、寄り道処として使ってください。
              </p>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-3 font-gothic text-[0.75rem] tracking-[0.1em] text-sumi-2">
              {['たこ焼き', '立ち飲み', 'ちょい飲み', '一人飲み', '二軒目', 'テイクアウト'].map(
                (tag) => (
                  <li key={tag} className="border border-rule px-3.5 py-1.5">
                    {tag}
                  </li>
                ),
              )}
            </ul>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/about" className="prose-link font-gothic text-[0.85rem]">
                ヤング軒について
              </Link>
              <Link href="/drink" className="prose-link font-gothic text-[0.85rem]">
                ちょい飲み・一人飲みの使い方
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <Photo
                photo={PHOTOS.staffCounter}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="shadow-[0_18px_48px_-28px_rgba(32,27,23,0.55)]"
              />
              <p className="mt-4 font-gothic text-[0.72rem] leading-relaxed tracking-[0.08em] text-sumi-3">
                カウンター越しに、今日のたこ焼きを。
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
