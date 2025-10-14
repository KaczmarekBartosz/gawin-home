export default {
  // Removed experimental features that require canary (ppr, useCache)
  // Using stable Next.js 15.5.5
  experimental: {
    inlineCss: true, // Safe for stable
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
