// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {appDir: true,},
  output: 'standalone',
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  env: {
    CUSTOM_KEY: 'shipment-invoice-system',
  },
};

export default nextConfig;
