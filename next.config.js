/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['firebase', 'undici'],
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'firebase/firestore': require.resolve('firebase/firestore')
    };

    return config;
  }
};

module.exports = nextConfig