/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Add your image domains here
    unoptimized: true, // Disable image optimization for static export
  },
  experimental: {
    appDir: true,
  },
  output: 'export', // For static site generation
};

export default nextConfig;
