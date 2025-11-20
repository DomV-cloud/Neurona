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

  // App Router handles dynamic routes automatically
  // No manual rewrites needed for /patient/[id]
};

export default nextConfig;
