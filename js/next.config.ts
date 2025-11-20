import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper routing for Vercel deployment
  trailingSlash: false,

  // Enable static exports if needed (uncomment if you want static export)
  // output: 'export',

  // Disable image optimization for static export (uncomment if using static export)
  // images: {
  //   unoptimized: true,
  // },

  // Ensure proper rewrites for dynamic routes
  async rewrites() {
    return [
      {
        source: "/patient/:id",
        destination: "/patient/:id",
      },
    ];
  },

  // Handle 404s properly
  async redirects() {
    return [];
  },
};

export default nextConfig;
