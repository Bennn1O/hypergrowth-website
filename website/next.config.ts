import { withPayload } from "@payloadcms/next/withPayload";
import { withPayload } from "@payloadcms/next/withPayload";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
        source: '/evenements/charity-gala-2023',
        destination: '/evenements/charity-gala-winter-2023',
        permanent: true,
      },
      {
        source: '/concept/case-studies/pureva',
        destination: '/case-studies/etude-de-cas-pureva',
        permanent: true,
      },
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
    ]
  },
}

export default withPayload(withPayload(withPayload(nextConfig)))
