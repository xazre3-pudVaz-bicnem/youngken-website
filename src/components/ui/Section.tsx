import type { ReactNode } from 'react';

type Tone = 'paper' | 'paper-2' | 'paper-3' | 'sumi';

const TONE: Record<Tone, string> = {
  paper: '',
  'paper-2': 'panel-paper',
  'paper-3': 'panel-paper-deep',
  sumi: 'bg-sumi text-paper',
};

export function Section({
  children,
  tone = 'paper',
  id,
  className = '',
  size = 'default',
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  size?: 'default' | 'tight' | 'loose';
}) {
  const pad =
    size === 'tight'
      ? 'py-14 sm:py-16 lg:py-20'
      : size === 'loose'
        ? 'py-20 sm:py-28 lg:py-40'
        : 'py-16 sm:py-22 lg:py-32';
  return (
    <section id={id} className={`${TONE[tone]} ${pad} ${className}`}>
      {children}
    </section>
  );
}

export function Container({
  children,
  size = 'default',
  className = '',
}: {
  children: ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
}) {
  const max =
    size === 'narrow'
      ? 'max-w-3xl'
      : size === 'wide'
        ? 'max-w-7xl'
        : size === 'full'
          ? 'max-w-none'
          : 'max-w-5xl';
  return <div className={`mx-auto w-full ${max} px-5 sm:px-8 ${className}`}>{children}</div>;
}
