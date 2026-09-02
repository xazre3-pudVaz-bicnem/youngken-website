import Link from 'next/link';
import { pageMetadata } from '@/lib/meta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { NextLinks } from '@/components/ui/NextLinks';
import { PostCard } from '@/components/sections/BlogTeaser';
import { PHOTOS } from '@/lib/photos';
import { getPostMetas } from '@/lib/blog';

export const metadata = pageMetadata({
  title: 'ブログ｜三軒茶屋の寄り道の話｜ヤング軒',
  description:
    '三軒茶屋で一人飲みするなら、ちょい飲みの楽しみ方、たこ焼きに合うお酒、二軒目の探し方。三軒茶屋・太子堂のたこ焼きと立ち飲み処ヤング軒が書く、街と夜の読みものです。',
  path: '/blog',
});

export default function BlogIndexPage() {
  const posts = getPostMetas();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <main id="main">
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            三茶の夜の、
            <br />
            読みもの。
          </>
        }
        lead={
          <p>
            三軒茶屋で軽く飲みたい夜のこと、たこ焼きとお酒のこと、街のこと。ヤング軒から少しずつ書いていきます。
          </p>
        }
        trail={[{ name: 'ブログ', href: '/blog' }]}
        photo={PHOTOS.exteriorNight}
      />

      <Section tone="paper">
        <Container size="wide">
          {posts.length === 0 ? (
            <div className="panel-paper-deep px-8 py-16 text-center">
              <p className="font-mincho text-[1.2rem] tracking-[0.06em] text-sumi">
                記事はただいま準備中です。
              </p>
              <p className="mt-5 text-[0.9rem] leading-[2] text-sumi-2">
                先に
                <Link href="/menu" className="prose-link mx-1">
                  メニュー
                </Link>
                や
                <Link href="/drink" className="prose-link mx-1">
                  ちょい飲みの使い方
                </Link>
                をご覧ください。
              </p>
            </div>
          ) : (
            <>
              {categories.length > 1 ? (
                <ul className="mb-14 flex flex-wrap gap-x-3 gap-y-3 font-gothic text-[0.74rem] tracking-[0.1em] text-sumi-2">
                  {categories.map((c) => (
                    <li key={c} className="border border-rule px-3.5 py-1.5">
                      {c}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 80}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      <NextLinks
        items={[
          {
            href: '/drink',
            label: 'ちょい飲み・一人飲み',
            body: '三軒茶屋で軽く一杯。990円の寄り道セット。',
          },
          {
            href: '/takoyaki',
            label: 'たこ焼き',
            body: '6個700円。ソース・岩塩・きざみワサビ。',
          },
          {
            href: '/access',
            label: 'アクセス',
            body: '三軒茶屋駅から徒歩4分。営業は16時から。',
          },
        ]}
        tone="paper-2"
      />
    </main>
  );
}
