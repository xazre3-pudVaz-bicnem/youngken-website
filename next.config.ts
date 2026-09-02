import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 親ディレクトリの lockfile を拾わせない
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [200, 280, 360, 480],
    qualities: [60, 75],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/photos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
