import Image from 'next/image';
import type { Photo as PhotoData } from '@/lib/photos';

/**
 * 写真を必ず「箱の中」で表示する。
 * ratio で箱の縦横比を決め、画像は fill + object-cover で敷き込む。
 * （親に position を渡さないので高さ 0 事故が起きない）
 */
export function Photo({
  photo,
  ratio = 'portrait',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className = '',
  position,
  quality,
}: {
  photo: PhotoData;
  ratio?: 'portrait' | 'square' | 'landscape' | 'wide' | 'tall' | 'auto';
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
  quality?: number;
}) {
  const aspect =
    ratio === 'square'
      ? 'aspect-square'
      : ratio === 'landscape'
        ? 'aspect-[4/3]'
        : ratio === 'wide'
          ? 'aspect-[16/9]'
          : ratio === 'tall'
            ? 'aspect-[3/4.4]'
            : ratio === 'auto'
              ? ''
              : 'aspect-[3/4]';

  if (ratio === 'auto') {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`h-auto w-full ${className}`}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-paper-3 ${aspect} ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className="object-cover"
        style={{ objectPosition: position ?? photo.position ?? '50% 50%' }}
      />
    </div>
  );
}
