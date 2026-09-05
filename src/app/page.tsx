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
  '三軒茶屋・太子堂のヤング軒。焼きたてのたこ焼き6個700円をつまみに、ハイボールやサワーを各500円で。たこ焼き三種盛とドリンクの寄り道セットは990円。仕事帰りの一杯、一人飲み、二軒目の寄り道に。三軒茶屋駅から徒歩約4分。';

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
