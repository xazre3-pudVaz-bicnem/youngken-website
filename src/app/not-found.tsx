import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { MAIN_NAV } from '@/lib/nav';

export const metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。ヤング軒のメニューやアクセス情報はこちらから。',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <Section tone="paper" size="loose">
        <Container size="narrow">
          <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji">
            404
          </p>
          <h1 className="mt-6 font-mincho text-[1.8rem] leading-[1.6] tracking-[0.05em] text-sumi sm:text-[2.3rem]">
            この道は、
            <br />
            行き止まりのようです。
          </h1>
          <p className="mt-8 text-[0.95rem] leading-[2.15] text-sumi-2">
            お探しのページは見つかりませんでした。アドレスが変わったか、削除された可能性があります。下のページからお探しください。
          </p>

          <ul className="mt-12 border-t border-rule">
            <li className="border-b border-rule">
              <Link
                href="/"
                className="flex items-baseline justify-between py-4 font-mincho text-[1.08rem] tracking-[0.06em] text-sumi transition-colors hover:text-enji"
              >
                トップページ
                <span className="font-gothic text-[0.62rem] uppercase tracking-[0.24em] text-sumi-3">
                  Home
                </span>
              </Link>
            </li>
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-4 font-mincho text-[1.08rem] tracking-[0.06em] text-sumi transition-colors hover:text-enji"
                >
                  {item.label}
                  <span className="font-gothic text-[0.62rem] uppercase tracking-[0.24em] text-sumi-3">
                    {item.sub}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
