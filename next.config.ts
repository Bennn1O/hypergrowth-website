import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'wubflow-shield.NOCODEXPORT.DEV',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/operating-partners/ulysse-l-sher-operating-partner',
        destination: '/operating-partners/ulysselsher-operating-partner',
        permanent: true,
      },
      {
        source: '/operating-partners/benjamin-bremont-operating-partner',
        destination: '/operating-partners/ben-bremont-operating-partner',
        permanent: true,
      },
      {
        source: '/concept/test-scalabilite',
        destination: '/concept/test-de-scalabilite',
        permanent: true,
      },
      {
        source: '/ecurie/a-propos',
        destination: '/lecurie/a-propos',
        permanent: true,
      },
      {
        source: '/ecurie/les-op',
        destination: '/lecurie/les-op',
        permanent: true,
      },
      {
        source: '/ecurie/ressources',
        destination: '/lecurie/ressources',
        permanent: true,
      },
      {
        source: '/concept/case-studies/pureva',
        destination: '/case-studies/etude-de-cas-pureva',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
