/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://185.251.91.245:5000/api/:path*', // Прокси на ваш сервер
      },
    ];
  },
};

export default nextConfig;
