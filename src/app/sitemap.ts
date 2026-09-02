import type { MetadataRoute } from 'next';
import { HAS_SITE_URL, SITE_URL } from '@/lib/site';
import { getPostMetas } from '@/lib/blog';

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/takoyaki', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/drink', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/menu', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/access', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/barber', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 本番URLが未設定のあいだは sitemap を出さない
  if (!HAS_SITE_URL) return [];

  const now = new Date();
  const posts = getPostMetas();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
