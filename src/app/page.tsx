import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { TakoyakiSection } from '@/components/sections/TakoyakiSection';
import { FoodDrink } from '@/components/sections/FoodDrink';
import { YorimichiSetSection } from '@/components/sections/YorimichiSet';
import { ChoinomiSection } from '@/components/sections/ChoinomiSection';
import { Story } from '@/components/sections/Story';
import { Gallery } from '@/components/sections/Gallery';
import { AccessSection } from '@/components/sections/AccessSection';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { getPostMetas } from '@/lib/blog';
import { pageMetadata } from '@/lib/meta';

const TITLE = '三軒茶屋のたこ焼き居酒屋｜一杯とつまみの寄り道処 ヤング軒';
const DESCRIPTION =
  '三軒茶屋・太子堂のヤング軒。北海道産の大だこを使った焼きたてのたこ焼きをつまみに、ビール500円、ハイボール600円。たこ焼き三種盛りとドリンクの寄り道セットは税込1,200円。三軒茶屋駅から徒歩約4分、世田谷通り沿い。';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  const posts = getPostMetas().slice(0, 3);

  return (
    <main id="main">
      <Hero />
      <Intro />
      <TakoyakiSection />
      <FoodDrink />
      <YorimichiSetSection />
      <ChoinomiSection />
      <Story />
      <Gallery />
      <AccessSection />
      <BlogTeaser posts={posts} />
    </main>
  );
}
