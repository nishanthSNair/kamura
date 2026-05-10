import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blueprint",
        destination: "/wellness-checker",
        permanent: true,
      },
      {
        source: "/blog/peptides-101-dubai",
        destination: "/blog/peptides-101-beginners-guide-dubai",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
