import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export type NextLinkItem = { href: string; label: string; body: string };

/** ページ末尾の回遊導線。サイト内を孤立させないために全ページに置く。 */
export function NextLinks({
  items,
  title = 'あわせて読む',
  tone = 'paper',
}: {
  items: NextLinkItem[];
  title?: string;
  tone?: 'paper' | 'paper-2' | 'paper-3';
}) {
  return (
    <Section tone={tone} size="tight">
      <Container size="wide">
        <Reveal>
          <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji">
            Next
          </p>
          <h2 className="mt-5 font-mincho text-[1.4rem] tracking-[0.06em] text-sumi sm:text-[1.7rem]">
            {title}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.href} delay={(i % 3) * 80}>
              <Link href={item.href} className="group block border-t border-rule pt-5">
                <p className="font-mincho text-[1.08rem] tracking-[0.06em] text-sumi transition-colors group-hover:text-enji">
                  {item.label}
                </p>
                <p className="mt-3 text-[0.85rem] leading-[1.95] text-sumi-2">{item.body}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
