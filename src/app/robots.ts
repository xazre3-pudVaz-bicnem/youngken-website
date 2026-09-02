import type { MetadataRoute } from 'next';
import { HAS_SITE_URL, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // 本番URLが未設定の環境（プレビュー等）は誤インデックスを防ぐため全面Disallow
  if (!HAS_SITE_URL) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
