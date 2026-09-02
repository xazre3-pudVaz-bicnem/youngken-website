import type { Metadata } from 'next';
import { HAS_SITE_URL } from './site';

/** ページごとの metadata を同じ形で組み立てる（title・description・canonical・OGP・Twitter） */
export function pageMetadata({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  if (!HAS_SITE_URL) {
    return { title: { absolute: title }, description };
  }

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      locale: 'ja_JP',
      images: [{ url: image, width: 1200, height: 630 }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
