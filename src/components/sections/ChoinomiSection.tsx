import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PHOTOS } from '@/lib/photos';

const USES = [
  { label: '仕事帰りに一杯', body: '駅から四分。帰り道の途中で寄れます。' },
  { label: '一人でふらっと', body: '立ち飲みなので、席待ちも長居もいりません。' },
  { label: '待ち合わせ前に', body: '五分でも、十分でも。時間つぶしの一杯に。' },
  { label: '二軒目として', body: '締めのラーメンのかわりに、たこ焼きを六個。' },
  { label: '友人と軽く', body: '三種盛りを分ければ、話がひとつ増えます。' },
  { label: 'せんべろ的に', body: '千円あれば、たこ焼きとドリンクが一杯ずつ。' },
];

export function ChoinomiSection() {
  return (
    <Section tone="sumi" size="loose">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
          <Reveal>
            <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji-3">
              Choinomi
            </p>
            <h2 className="mt-6 font-mincho text-[1.85rem] leading-[1.6] tracking-[0.06em] text-paper sm:text-[2.3rem] lg:text-[2.7rem]">
              一杯だけでも、
              <br />
              どうぞ。
            </h2>
            <div className="mt-9 space-y-6 text-[0.93rem] leading-[2.15] text-paper/75">
              <p>
                三軒茶屋で軽く飲みたい夜に。ヤング軒は立ち飲みなので、入るのにも出るのにも構えがいりません。ドリンクは各500円。たこ焼き三種盛とドリンク1杯の寄り道セットなら990円です。
              </p>
              <p>
                一人で来て、たこ焼きが焼けるのを眺めながら一杯。そういう使い方をされる方が多いお店です。
              </p>
            </div>

            <Link
              href="/drink"
              className="mt-10 inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-gothic text-[0.85rem] tracking-[0.08em] text-paper/90 transition-colors hover:border-paper hover:text-paper"
            >
              ちょい飲み・一人飲みについて
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              photo={PHOTOS.exteriorNight}
              ratio="landscape"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
            <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {USES.map((use) => (
                <li key={use.label} className="border-t border-paper/15 pt-4">
                  <p className="font-mincho text-[1.02rem] tracking-[0.08em] text-paper">
                    {use.label}
                  </p>
                  <p className="mt-2 font-gothic text-[0.78rem] leading-[1.95] text-paper/60">
                    {use.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
