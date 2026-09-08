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
  async headers() {
    return [
      {
        // Anatomy model chunks are content-stable; cache them hard so repeat
        // visits skip the ~33MB download. (Rename chunks if geometry changes.)
        source: "/body-models/:path*.bin",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/body-models/:path*.gz",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // The manifest may change when models are updated; revalidate daily.
        source: "/body-models/atlas.json",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // The atlas moved to the landing page.
        source: "/body",
        destination: "/",
        permanent: true,
      },
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
      {
        source: "/blog/peptides-beginners-guide-dubai",
        destination: "/blog/peptides-101-beginners-guide-dubai",
        permanent: true,
      },
      {
        source: "/peptides/coming-soon",
        destination: "/peptides",
        permanent: true,
      },
      {
        source: "/explore/compare",
        destination: "/explore",
        permanent: true,
      },
      {
        source: "/my/discover",
        destination: "/my",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
