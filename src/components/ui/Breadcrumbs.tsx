import Link from 'next/link';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ name: 'ホーム', href: '/' }, ...trail];
  const schema = breadcrumbJsonLd(full);

  return (
    <>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schema)} />
      ) : null}
      <nav aria-label="パンくずリスト" className="font-gothic text-[0.72rem] text-sumi-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {full.map((crumb, i) => {
            const last = i === full.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-sumi-2">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="transition-colors hover:text-enji">
                    {crumb.name}
                  </Link>
                )}
                {last ? null : <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
