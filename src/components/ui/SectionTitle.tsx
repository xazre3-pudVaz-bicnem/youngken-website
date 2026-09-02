import type { ReactNode } from 'react';

export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-gothic text-[0.68rem] font-medium uppercase tracking-[0.32em] text-enji ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  children,
  lead,
  align = 'left',
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: string;
  children: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag
        className={`font-mincho text-[1.75rem] leading-[1.5] tracking-[0.04em] text-sumi sm:text-[2.15rem] lg:text-[2.6rem] ${
          centered ? 'text-center' : ''
        } rule-enji ${centered ? 'rule-enji-center' : ''}`}
      >
        {children}
      </Tag>
      {lead ? (
        <div
          className={`mt-7 max-w-2xl text-[0.95rem] leading-[2.05] text-sumi-2 sm:text-base ${
            centered ? 'mx-auto text-center' : ''
          }`}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
}
