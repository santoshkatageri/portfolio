/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow the sandboxed preview host to load /_next/* assets in dev.
  allowedDevOrigins: ['*.e2b.app'],
};

export default nextConfig;
