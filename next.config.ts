export default {
  // Removed experimental features that require canary (ppr, useCache)
  // Using stable Next.js 15.5.5
  experimental: {
    inlineCss: true, // Safe for stable
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gawin.pl",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gawin24.pl",
        pathname: "/public/upload/**",
      },
    ],
  },
};
