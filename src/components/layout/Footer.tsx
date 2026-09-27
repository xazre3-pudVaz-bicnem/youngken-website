import Link from 'next/link';
import { FOOTER_NAV } from '@/lib/nav';
import { ACCESS, BARBER, HOURS, MAP_SEARCH_URL, NAP, SITE_NAME } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sumi text-paper">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <Logo size="lg" tone="paper" />
            <p className="mt-7 max-w-sm font-gothic text-[0.85rem] leading-[2.1] text-paper/70">
              三軒茶屋・太子堂の、たこ焼きとお酒の店。
              <br />
              仕事帰りの一杯にも、二軒目の寄り道にも。
            </p>

            <address className="mt-8 not-italic font-gothic text-[0.85rem] leading-[2.1] text-paper/80">
              〒{NAP.postalCode}
              <br />
              {NAP.region}
              {NAP.city}
              {NAP.street}
              <br />
              {NAP.building}
              <br />
              {ACCESS.primaryLine} {ACCESS.station} 徒歩約{ACCESS.walkMinutes}分
            </address>

            <dl className="mt-6 font-gothic text-[0.85rem] leading-[2.1] text-paper/80">
              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-paper/60">営業時間</dt>
                <dd>{HOURS.display}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-paper/60">定休日</dt>
                <dd>{HOURS.closedDisplay}</dd>
              </div>
            </dl>

            <a
              href={MAP_SEARCH_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-gothic text-[0.8rem] tracking-[0.1em] text-paper/90 transition-colors hover:border-paper hover:text-paper"
            >
              Googleマップで開く
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="フッターメニュー">
              <p className="font-gothic text-[0.62rem] uppercase tracking-[0.3em] text-paper/60">
                Menu
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mincho text-[0.98rem] tracking-[0.08em] text-paper/85 transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-gothic text-[0.62rem] uppercase tracking-[0.3em] text-paper/60">
                Since {BARBER.foundedYear}
              </p>
              <p className="mt-6 font-mincho text-[1.05rem] leading-relaxed tracking-[0.08em] text-paper/85">
                {BARBER.name}
              </p>
              <p className="mt-4 font-gothic text-[0.8rem] leading-[2] text-paper/60">
                {SITE_NAME}は、三軒茶屋で{BARBER.generations}代続く理髪店
                {BARBER.name}の店内にあります。
              </p>
              <Link
                href="/barber"
                className="mt-5 inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-gothic text-[0.78rem] tracking-[0.1em] text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                百年床屋の話を読む
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/15 pt-7">
          <p className="font-gothic text-[0.68rem] tracking-[0.16em] text-paper/60">
            © {year} 立ち飲み処 {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
