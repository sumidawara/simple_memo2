import type { NextConfig } from "next";

const nextConfig = {
  // ... その他の設定
  eslint: {
    ignoreDuringBuilds: true, // この行を追加
    output: 'standalone',
  },
};

export default nextConfig;
