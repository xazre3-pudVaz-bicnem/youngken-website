import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Section';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Photo } from '@/components/ui/Photo';
import type { Photo as PhotoData } from '@/lib/photos';

export function PageHeader({
  eyebrow,
  title,
  lead,
  trail,
  photo,
  photoPosition,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  trail: Crumb[];
  photo?: PhotoData;
  photoPosition?: string;
}) {
  return (
    <header className="panel-paper border-b border-rule pt-10 sm:pt-14">
      <Container size="wide">
        <Breadcrumbs trail={trail} />
      </Container>

      <Container size="wide" className="pb-14 pt-9 sm:pb-20 sm:pt-12">
        <div
          className={
            photo
              ? 'grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16'
              : ''
          }
        >
          <div>
            <p className="font-gothic text-[0.62rem] uppercase tracking-[0.36em] text-enji">
              {eyebrow}
            </p>
            <h1 className="mt-6 font-mincho text-[1.9rem] leading-[1.55] tracking-[0.05em] text-sumi sm:text-[2.4rem] lg:text-[2.9rem]">
              {title}
            </h1>
            {lead ? (
              <div className="mt-8 max-w-2xl text-[0.95rem] leading-[2.15] text-sumi-2">
                {lead}
              </div>
            ) : null}
          </div>

          {photo ? (
            <Photo
              photo={photo}
              ratio="landscape"
              position={photoPosition}
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
              quality={60}
            />
          ) : null}
        </div>
      </Container>
    </header>
  );
}
