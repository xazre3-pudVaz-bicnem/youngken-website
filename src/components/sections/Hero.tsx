import { getImageProps } from 'next/image';
import { PHOTOS } from '@/lib/photos';

/**
 * 写真主体のヒーロー。CTAボタンは置かない。
 * SPは店頭の縦写真、PCは店構えの引きを使い分ける。
 */
export function Hero() {
  // 暗いグラデーションを重ねるので画質は落として構わない
  const common = { alt: '', priority: true, quality: 60, sizes: '100vw' } as const;

  const desktop = getImageProps({
    ...common,
    src: PHOTOS.exteriorWide.src,
    width: PHOTOS.exteriorWide.width,
    height: PHOTOS.exteriorWide.height,
  }).props;

  const mobile = getImageProps({
    ...common,
    src: PHOTOS.storefront.src,
    width: PHOTOS.storefront.width,
    height: PHOTOS.storefront.height,
  }).props;

  return (
    <section
      className="relative -mt-[68px] flex min-h-[620px] items-end overflow-hidden bg-sumi sm:-mt-[84px] sm:min-h-[720px] lg:h-[100svh] lg:min-h-[680px]"
      aria-label="ヤング軒 三軒茶屋"
    >
      {/* <picture> は Image コンポーネントの自動プリロードが効かないので自分で入れる */}
      <link
        rel="preload"
        as="image"
        media="(max-width: 767px)"
        imageSrcSet={mobile.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(min-width: 768px)"
        imageSrcSet={desktop.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />

      <picture>
        <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
        <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes="100vw" />
        <img
          src={mobile.src}
          alt="三軒茶屋・太子堂にあるヤング軒の店頭。赤い壁に「おいしい寄り道 ヤング軒」の看板と、たこ焼き・立呑の提灯が灯る"
          width={PHOTOS.storefront.width}
          height={PHOTOS.storefront.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_38%] md:object-[50%_24%]"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-sumi/88 via-sumi/35 to-sumi/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-sumi/72 via-sumi/18 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:pb-24">
        <p className="font-gothic text-[0.62rem] uppercase tracking-[0.42em] text-paper/85 sm:text-[0.7rem]">
          Sangenjaya / Tokyo
        </p>

        <h1 className="mt-8 flex flex-row-reverse justify-end gap-x-3 sm:mt-10 sm:gap-x-5">
          <span className="v-text font-mincho text-[1.9rem] leading-[1.7] tracking-[0.14em] text-paper drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-[2.5rem] lg:text-[3.05rem]">
            たこ焼きと一杯。
          </span>
          <span className="v-text font-mincho text-[1.9rem] leading-[1.7] tracking-[0.14em] text-paper drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-[2.5rem] lg:text-[3.05rem]">
            三軒茶屋の寄り道処。
          </span>
        </h1>

        <p className="mt-9 max-w-md font-gothic text-[0.82rem] leading-[2.1] text-paper/85 sm:mt-11 sm:text-[0.92rem]">
          焼きたてのたこ焼きをつまみに、ハイボールを一杯。
          <br />
          仕事帰りにも、一人でも、二軒目にも。
        </p>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 right-6 hidden h-20 w-px bg-gradient-to-b from-transparent to-paper/60 lg:block"
      />
    </section>
  );
}
