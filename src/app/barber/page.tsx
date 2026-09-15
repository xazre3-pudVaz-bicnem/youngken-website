import Link from 'next/link';
import { pageMetadata } from '@/lib/meta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { NextLinks } from '@/components/ui/NextLinks';
import { PHOTOS } from '@/lib/photos';
import { BARBER, BARBER_TIMELINE, SITE_NAME } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'スーパーヘアーヤングとヤング軒の歴史｜三軒茶屋の百年床屋',
  description:
    '三軒茶屋で1923年から4世代続く理髪店スーパーヘアーヤング。その最初の屋号が「理髪ヤング軒」でした。創業100年の節目に三代目が始めたヤング軒と、街と店の物語をまとめました。',
  path: '/barber',
});

export default function BarberPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Story"
        title={
          <>
            百年床屋と、
            <br />
            <span className="text-enji">立ち飲み処。</span>
          </>
        }
        lead={
          <p>
            {SITE_NAME}があるのは、三軒茶屋で{BARBER.foundedYear}年から{BARBER.generations}
            世代続く理髪店「{BARBER.name}」の店内です。そして、その理髪店の最初の屋号が「
            {BARBER.originalName}」でした。
          </p>
        }
        trail={[{ name: '百年床屋の話', href: '/barber' }]}
        photo={PHOTOS.barberOldInterior}
      />

      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionTitle eyebrow="History" as="h2">
              名前が、戻ってきた。
            </SectionTitle>
            <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
              <p>
                三軒茶屋の発展とともに歩んできた「{BARBER.originalName}」は、初代が創業した理髪店です。
                {BARBER.renamedEra}
                、二代目が渡米を経験したことをきっかけに、屋号を「{BARBER.name}」へと改名しました。
              </p>
              <p>
                それから長い年月、地域の皆さまに支えられながら、三軒茶屋の街とともに歴史を重ねてきました。髪を切りに来る人が、世間話をして帰っていく。そういう場所として、百年続いてきたお店です。
              </p>
              <p>
                そして創業100年という節目に、三代目が新たな挑戦として、最初の屋号から名前をとった「
                {SITE_NAME}」を始めました。理髪店として受け継いできた「人と人とのつながり」を大切にしながら、気軽に集い、語らい、笑顔が生まれる場所を目指しています。
              </p>
            </div>
          </Reveal>

          {/* 昔の写真（撮影年は未確認なので年代は書かない） */}
          <Reveal className="mt-14 grid items-start gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <figure>
              <Photo
                photo={PHOTOS.barberOldExterior}
                ratio="portrait"
                sizes="(min-width: 768px) 290px, 100vw"
              />
              <figcaption className="mt-3 font-gothic text-[0.72rem] leading-relaxed tracking-[0.08em] text-sumi-3">
                昔の理髪店の店構え。
              </figcaption>
            </figure>
            <figure>
              <Photo
                photo={PHOTOS.oldTram}
                ratio="landscape"
                sizes="(min-width: 768px) 440px, 100vw"
              />
              <figcaption className="mt-3 font-gothic text-[0.72rem] leading-relaxed tracking-[0.08em] text-sumi-3">
                昔の路面電車の風景。
                <span className="ml-2">写真：生田誠氏提供</span>
              </figcaption>
            </figure>
          </Reveal>

          <ol className="mt-16">
            {BARBER_TIMELINE.map((t, i) => (
              <Reveal
                as="li"
                key={t.year}
                delay={i * 90}
                className="grid gap-3 border-b border-rule py-8 first:border-t sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
              >
                <p className="font-mincho text-[1.05rem] tracking-[0.08em] text-enji">{t.year}</p>
                <div>
                  <h3 className="font-mincho text-[1.2rem] tracking-[0.06em] text-sumi">
                    {t.title}
                  </h3>
                  <p className="mt-3.5 text-[0.9rem] leading-[2.05] text-sumi-2">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="paper-2">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <Photo
                photo={PHOTOS.exteriorNight}
                ratio="landscape"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </Reveal>
            <Reveal delay={100}>
              <SectionTitle eyebrow="Place" as="h2">
                人が集まってきた場所に。
              </SectionTitle>
              <div className="mt-9 space-y-6 text-[0.95rem] leading-[2.15] text-sumi-2">
                <p>
                  床屋というのは、昔から街の寄り合い所のような場所でした。順番を待つあいだ、知らない人と天気の話をする。切り終わっても、なんとなく座ったまま話し込む。
                </p>
                <p>
                  {SITE_NAME}
                  がやろうとしているのも、たぶん同じことです。たこ焼きが焼けるのを待つ数分。カウンターに立って飲む一杯。用事はそれだけなのに、なぜか少し長くいてしまう。
                </p>
                <p>
                  三軒茶屋で百年、人が集まってきた場所に、新しい寄り道どころができました。そういう店だと思ってもらえたら、うれしいです。
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper-3" size="tight">
        <Container>
          <Reveal>
            <div className="border-l-2 border-ai pl-7">
              <h2 className="font-mincho text-[1.35rem] tracking-[0.06em] text-sumi sm:text-[1.5rem]">
                {BARBER.name}
              </h2>
              <p className="mt-5 font-mincho text-[1.1rem] tracking-[0.06em] text-sumi-2">
                おかげさまで創業100年。
              </p>
              <p className="mt-5 text-[0.92rem] leading-[2.1] text-sumi-2">
                {BARBER.foundedYear}年の創業以来、三軒茶屋の地で{BARBER.generations}
                世代にわたり、地域の皆さまの「いつも」を支えてきました。これからも、変わらぬ技術と温かい笑顔で、みなさまの身だしなみを整えてまいります。
              </p>
              <p className="mt-6 font-gothic text-[0.78rem] leading-[2] text-sumi-3">
                {SITE_NAME}は、この{BARBER.name}の店内で営業しています。
                <Link href="/access" className="prose-link ml-1">
                  場所と行き方はこちら
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <NextLinks
        items={[
          {
            href: '/about',
            label: 'ヤング軒について',
            body: '店の使い方と、飲む店としての間口のこと。',
          },
          {
            href: '/takoyaki',
            label: 'たこ焼き',
            body: '北海道産の大だこ。三軒茶屋で焼きたてをつまむ。',
          },
          {
            href: '/blog',
            label: 'ブログ',
            body: '三軒茶屋の街と、夜の過ごし方の読みもの。',
          },
        ]}
      />
    </main>
  );
}
