import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { TakoyakiSection } from '@/components/sections/TakoyakiSection';
import { ChoinomiSection } from '@/components/sections/ChoinomiSection';
import { FoodDrink } from '@/components/sections/FoodDrink';
import { YorimichiSetSection } from '@/components/sections/YorimichiSet';
import { Scene } from '@/components/sections/Scene';
import { Story } from '@/components/sections/Story';
import { Gallery } from '@/components/sections/Gallery';
import { AccessSection } from '@/components/sections/AccessSection';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { getPostMetas } from '@/lib/blog';
import { pageMetadata } from '@/lib/meta';

const TITLE = '三軒茶屋のたこ焼き・ちょい飲み居酒屋｜ヤング軒';
const DESCRIPTION =
  '三軒茶屋・太子堂のたこ焼きと立ち飲みの店、ヤング軒。焼きたてのたこ焼き6個700円、ドリンク各500円、寄り道セット990円。仕事帰りの一杯、一人飲み、二軒目の寄り道に。三軒茶屋駅から徒歩約4分。';

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
      <ChoinomiSection />
      <FoodDrink />
      <YorimichiSetSection />
      <Scene />
      <Story />
      <Gallery />
      <AccessSection />
      <BlogTeaser posts={posts} />
    </main>
  );
}
