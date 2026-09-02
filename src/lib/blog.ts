import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

/** サーバー専用。クライアントコンポーネントから import しないこと。 */

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogCategory =
  | 'ちょい飲み'
  | 'たこ焼き'
  | '三軒茶屋の街'
  | '一人飲み'
  | 'お酒';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  intent: string;
  related: string[];
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, 'content'>;

const isIsoDate = (v: unknown): v is string =>
  typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);

function readPost(file: string): BlogPost | null {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  if (typeof data.title !== 'string' || !data.title.trim()) return null;
  if (typeof data.description !== 'string' || !data.description.trim()) return null;
  if (!isIsoDate(data.date)) return null;

  return {
    slug,
    title: data.title.trim(),
    description: data.description.trim(),
    date: data.date,
    updated: isIsoDate(data.updated) ? data.updated : undefined,
    category: typeof data.category === 'string' ? data.category : '三軒茶屋の街',
    intent: typeof data.intent === 'string' ? data.intent : '',
    related: Array.isArray(data.related)
      ? data.related.filter((r): r is string => typeof r === 'string')
      : [],
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(readPost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug < b.slug ? 1 : -1));
}

export function getPostMetas(): BlogPostMeta[] {
  return getAllPosts().map((post) => {
    const meta: BlogPostMeta = {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      updated: post.updated,
      category: post.category,
      intent: post.intent,
      related: post.related,
    };
    return meta;
  });
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** 同カテゴリ優先で関連記事を最大3件 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPostMeta[] {
  const all = getPostMetas().filter((p) => p.slug !== post.slug);
  const explicit = post.related
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is BlogPostMeta => Boolean(p));
  const sameCategory = all.filter(
    (p) => p.category === post.category && !explicit.some((e) => e.slug === p.slug),
  );
  const rest = all.filter(
    (p) =>
      !explicit.some((e) => e.slug === p.slug) && !sameCategory.some((s) => s.slug === p.slug),
  );
  return [...explicit, ...sameCategory, ...rest].slice(0, limit);
}

export function renderMarkdown(md: string): string {
  marked.setOptions({ gfm: true, breaks: false });
  return marked.parse(md, { async: false });
}

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
};
