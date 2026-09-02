'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MAIN_NAV } from '@/lib/nav';
import { HOURS } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = !overlay || scrolled || open;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-500 ${
          solid ? 'bg-paper/94 border-b border-rule' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:h-[84px] sm:px-8">
          <Link href="/" className="shrink-0">
            <Logo size="md" tone={solid ? 'sumi' : 'paper'} />
          </Link>

          <nav aria-label="メインメニュー" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {MAIN_NAV.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex flex-col items-center gap-1 font-gothic text-[0.82rem] tracking-[0.1em] transition-colors ${
                        solid
                          ? active
                            ? 'text-enji'
                            : 'text-sumi-2 hover:text-enji'
                          : 'text-paper/90 hover:text-paper'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`h-px w-full origin-center scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100 ${
                          active ? 'scale-x-100' : ''
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 text-right lg:block">
            <p
              className={`font-gothic text-[0.68rem] leading-relaxed tracking-[0.12em] ${
                solid ? 'text-sumi-3' : 'text-paper/80'
              }`}
            >
              {HOURS.display}
              <span className="mx-1.5">/</span>
              定休 {HOURS.closedDisplay}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? 'メニューを閉じる' : 'メニューを開く'}</span>
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-6 transition-all duration-300 ${
                  solid ? 'bg-sumi' : 'bg-paper'
                } ${open ? 'top-2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-2 block h-px w-6 transition-opacity duration-200 ${
                  solid ? 'bg-sumi' : 'bg-paper'
                } ${open ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 block h-px w-6 transition-all duration-300 ${
                  solid ? 'bg-sumi' : 'bg-paper'
                } ${open ? 'top-2 -rotate-45' : 'top-4'}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* ヘッダーの外に置く（ヘッダー内の fixed は潰れるため） */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-50 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
      >
        <button
          type="button"
          aria-label="メニューを閉じる"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full bg-sumi/45"
        />
        <div className="panel-paper absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto border-l border-rule px-7 pb-12 pt-7">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-sumi"
            >
              <span className="sr-only">閉じる</span>
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span className="absolute left-0 top-2 block h-px w-5 rotate-45 bg-sumi" />
                <span className="absolute left-0 top-2 block h-px w-5 -rotate-45 bg-sumi" />
              </span>
            </button>
          </div>

          <nav aria-label="モバイルメニュー" className="mt-10">
            <ul className="flex flex-col">
              {MAIN_NAV.map((item) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-mincho text-[1.12rem] tracking-[0.08em] text-sumi"
                  >
                    {item.label}
                    <span className="font-gothic text-[0.6rem] uppercase tracking-[0.24em] text-sumi-3">
                      {item.sub}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-b border-rule">
                <Link
                  href="/barber"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-mincho text-[1.12rem] tracking-[0.08em] text-sumi"
                >
                  百年床屋の話
                  <span className="font-gothic text-[0.6rem] uppercase tracking-[0.24em] text-sumi-3">
                    Story
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-10 border-t border-rule pt-6 font-gothic text-[0.78rem] leading-loose text-sumi-2">
            <p>東京都世田谷区太子堂4-5-1</p>
            <p>三軒茶屋駅 徒歩約4分</p>
            <p className="mt-3">
              営業 {HOURS.display}
              <br />
              定休 {HOURS.closedDisplay}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
