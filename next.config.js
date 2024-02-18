/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'nxqwqvpgdaksxhkhkiem.supabase.co'
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/dashboard',
          destination: '/dashboard/create',
          permanent: true,
        },
      ]
    }
  };

module.exports = nextConfig;
