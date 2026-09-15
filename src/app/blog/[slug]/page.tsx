import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/meta';
import { Container, Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { NextLinks } from '@/components/ui/NextLinks';
import { PostCard } from '@/components/sections/BlogTeaser';
import {
  formatDate,
  getAllPosts,
  getPost,
  getRelatedPosts,
  renderMarkdown,
} from '@/lib/blog';
import { blogPostingJsonLd, jsonLdScript } from '@/lib/jsonld';
import { HAS_SITE_URL } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: '記事が見つかりません' };

  return pageMetadata({
    title: `${post.title}｜ヤング軒`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const related = getRelatedPosts(post);

  return (
    <main id="main">
      {HAS_SITE_URL ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(
            blogPostingJsonLd({
              title: post.title,
              description: post.description,
              slug: post.slug,
              date: post.date,
              updated: post.updated,
            }),
          )}
        />
      ) : null}

      <header className="panel-paper border-b border-rule pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs
            trail={[
              { name: 'ブログ', href: '/blog' },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </Container>

        <Container className="pb-14 pt-9 sm:pb-18 sm:pt-12">
          <div className="flex items-center gap-4">
            <time
              dateTime={post.date}
              className="font-gothic text-[0.72rem] tracking-[0.16em] text-sumi-3"
            >
              {formatDate(post.date)}
            </time>
            <span className="font-gothic text-[0.68rem] tracking-[0.14em] text-enji">
              {post.category}
            </span>
          </div>
          <h1 className="mt-6 font-mincho text-[1.65rem] leading-[1.6] tracking-[0.04em] text-sumi sm:text-[2.1rem]">
            {post.title}
          </h1>
          <p className="mt-7 text-[0.93rem] leading-[2.1] text-sumi-2">{post.description}</p>
        </Container>
      </header>

      <Section tone="paper">
        <Container size="narrow">
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-16 border-t border-rule pt-10">
            <p className="font-gothic text-[0.78rem] leading-[2] text-sumi-3">
              ヤング軒は、三軒茶屋・太子堂のたこ焼きと立ち飲みの店です。営業は16:00〜22:00、定休日は水曜・日曜。
              <Link href="/access" className="prose-link ml-1">
                アクセスはこちら
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="paper-2" size="tight">
          <Container size="wide">
            <Reveal>
              <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji">
                Related
              </p>
              <h2 className="mt-5 font-mincho text-[1.4rem] tracking-[0.06em] text-sumi sm:text-[1.7rem]">
                関連する記事
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 3) * 80}>
                  <PostCard post={r} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <NextLinks
        items={[
          {
            href: '/drink',
            label: 'ちょい飲み・一人飲み',
            body: '三軒茶屋で軽く一杯。税込1,200円の寄り道セット。',
          },
          {
            href: '/takoyaki',
            label: 'たこ焼き',
            body: '6個700円から。味は8種類。',
          },
          {
            href: '/blog',
            label: 'ブログ一覧',
            body: '三軒茶屋の街と、夜の過ごし方の読みもの。',
          },
        ]}
        tone="paper-3"
      />
    </main>
  );
}
