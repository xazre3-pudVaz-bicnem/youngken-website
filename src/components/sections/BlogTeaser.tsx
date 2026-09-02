import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { formatDate, type BlogPostMeta } from '@/lib/blog';

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="flex items-center gap-4">
          <time
            dateTime={post.date}
            className="font-gothic text-[0.7rem] tracking-[0.16em] text-sumi-3"
          >
            {formatDate(post.date)}
          </time>
          <span className="font-gothic text-[0.66rem] tracking-[0.14em] text-enji">
            {post.category}
          </span>
        </div>
        <h3 className="mt-4 font-mincho text-[1.12rem] leading-[1.7] tracking-[0.05em] text-sumi transition-colors group-hover:text-enji sm:text-[1.2rem]">
          {post.title}
        </h3>
        <p className="mt-3.5 line-clamp-3 text-[0.85rem] leading-[1.95] text-sumi-2">
          {post.description}
        </p>
        <span className="mt-5 inline-block h-px w-full bg-rule transition-colors group-hover:bg-enji" />
      </Link>
    </article>
  );
}

export function BlogTeaser({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <Section tone="paper-2" size="loose">
      <Container size="wide">
        <Reveal className="sm:flex sm:items-end sm:justify-between sm:gap-10">
          <SectionTitle eyebrow="Blog">三茶の夜の、読みもの。</SectionTitle>
          <Link
            href="/blog"
            className="mt-7 inline-flex shrink-0 items-center gap-2 border-b border-rule-strong pb-1 font-gothic text-[0.82rem] tracking-[0.1em] text-sumi transition-colors hover:border-enji hover:text-enji sm:mt-0"
          >
            記事をすべて見る
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:mt-18 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 90}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
