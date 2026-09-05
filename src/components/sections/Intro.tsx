import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/SectionTitle';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';
import { QUICK_FACTS } from '@/lib/site';

/**
 * ヒーロー直下。5秒で「三軒茶屋の、たこ焼きが名物の小さな飲み屋」だと分かるようにする。
 * 詳細は /about /menu /drink へ渡し、ここでは短く。
 */
export function Intro() {
  return (
    <Section tone="paper" size="loose">
      <Container size="wide">
        {/* 5秒で分かる要点 */}
        <Reveal>
          <dl className="grid grid-cols-2 border-t border-rule sm:grid-cols-4">
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-rule px-1 py-5 sm:border-r sm:px-5 sm:last:border-r-0"
              >
                <dt className="font-gothic text-[0.6rem] uppercase tracking-[0.28em] text-enji">
                  {fact.label}
                </dt>
                <dd className="mt-2.5 font-mincho text-[0.98rem] leading-snug tracking-[0.04em] text-sumi sm:text-[1.05rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 sm:mt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-6 font-mincho text-[1.7rem] leading-[1.65] tracking-[0.05em] text-sumi sm:text-[2.1rem] lg:text-[2.4rem]">
              たこ焼きが名物の、
              <br />
              三軒茶屋の小さな飲み屋。
            </h2>
            <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2 sm:text-base">
              <p>
                ヤング軒は、東京都世田谷区太子堂、三軒茶屋駅から徒歩約4分にあります。焼きたてのたこ焼きをつまみに、ハイボールやサワーを一杯。おつまみもお酒も、居酒屋のようにその場で楽しめます。
              </p>
              <p>
                持ち帰りだけの方もいれば、そのままカウンターで飲んでいく方もいます。一人でも、二人でも、仕事帰りの三十分でも。三軒茶屋の夜の、寄り道処として使ってください。
              </p>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-3 gap-y-3 font-gothic text-[0.75rem] tracking-[0.1em] text-sumi-2">
              {['たこ焼き', 'お酒と一品', 'ちょい飲み', '一人飲み', '二軒目', 'テイクアウト'].map(
                (tag) => (
                  <li key={tag} className="border border-rule px-3.5 py-1.5">
                    {tag}
                  </li>
                ),
              )}
            </ul>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/about" className="prose-link font-gothic text-[0.85rem]">
                ヤング軒について
              </Link>
              <Link href="/menu" className="prose-link font-gothic text-[0.85rem]">
                メニューと値段
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              photo={PHOTOS.staffCounter}
              ratio="landscape"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="shadow-[0_18px_48px_-28px_rgba(32,27,23,0.55)]"
            />
            <p className="mt-4 font-gothic text-[0.72rem] leading-relaxed tracking-[0.08em] text-sumi-3">
              カウンター越しに、今日のたこ焼きとお酒を。
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
