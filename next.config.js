/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // PWA対応の準備
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig