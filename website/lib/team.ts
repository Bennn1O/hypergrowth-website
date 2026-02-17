import { readItems } from '@directus/sdk'
import {
  OPERATING_PARTNER_SLUGS,
  slugToLabel,
} from '@/data/sitemap-routes'
import {
  getDirectusAssetUrl,
  requestDirectus,
  type DirectusRecord,
} from '@/lib/directus'

const teamCollection = process.env.DIRECTUS_TEAM_COLLECTION ?? 'team_members'

const fallbackPartnerNameOverrides: Record<string, string> = {
  'anthony-diochon': 'Anthony Diochon',
  'ben-bremont-operating-partner': 'Benjamin Brémont',
  'elise-hetsch': 'Elise Hetsch',
  'evan-riquelme-operating-partner': 'Evan Riquelme',
  'gabriel-girardon': 'Gabriel Girardon',
  'guillaume-pesnel': 'Guillaume Pesnel',
  'julie-ducourau-operating-partner': 'Julie Ducourau',
  'julie-simon-operating-partner': 'Julie Simon',
  'killian-palermo': 'Killian Palermo',
  'manon-werquin-operating-partner': 'Manon Werquin',
  'samuel-fernandes': 'Samuel Fernandes',
  'ulysselsher-operating-partner': 'Ulysse L. Sher',
}

const fallbackPartnerProfiles: Record<
  string,
  {
    name: string
    title: string
    shortDescription: string
    imageUrl: string | null
    websiteUrl: string | null
    linkedinUrl: string | null
  }
> = {
  'ulysselsher-operating-partner': {
    name: 'Ulysse L. Sher',
    title: 'Operating Partner, CEO de HyperGrowth',
    shortDescription:
      'Expert du scaling personnel pour dirigeants. Il articule performance physique, clarté mentale et posture sociale pour transformer les fondateurs en moteurs crédibles et durables de leur hypercroissance.',
    imageUrl: null,
    websiteUrl: null,
    linkedinUrl: null,
  },
  'manon-werquin-operating-partner': {
    name: 'Manon Werquin',
    title: 'Operating Partner',
    shortDescription:
      'Entrepreneure et experte en structuration opérationnelle, Manon accompagne les dirigeants pour transformer une organisation saturée en système clair et pilotable.',
    imageUrl: null,
    websiteUrl: null,
    linkedinUrl: null,
  },
}

function getStringField(item: DirectusRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = item[key]
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }

  return null
}

function getPublishedStatus(item: DirectusRecord): string | null {
  return getStringField(item, ['status'])
}

function getFileIdFromValue(value: unknown): string | null {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }

  if (value && typeof value === 'object') {
    const fileId = (value as DirectusRecord).id
    if (
      (typeof fileId === 'string' || typeof fileId === 'number') &&
      String(fileId).trim().length > 0
    ) {
      return String(fileId)
    }
  }

  return null
}

function getFileField(item: DirectusRecord, keys: string[]): string | null {
  for (const key of keys) {
    const fileId = getFileIdFromValue(item[key])
    if (fileId) {
      return fileId
    }
  }

  return null
}

function normalizeExternalUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `https://${value}`
}

function getUrlField(item: DirectusRecord, keys: string[]): string | null {
  const value = getStringField(item, keys)
  if (!value) {
    return null
  }

  return normalizeExternalUrl(value)
}

function getProfileImageUrl(item: DirectusRecord): string | null {
  const fileId = getFileField(item, [
    'profile_image',
    'profileImage',
    'image',
    'avatar',
  ])

  if (fileId) {
    return getDirectusAssetUrl(fileId)
  }

  return getStringField(item, ['image_url', 'imageUrl', 'avatar_url'])
}

function toFallbackName(slug: string): string {
  return (
    fallbackPartnerNameOverrides[slug] ??
    slugToLabel(slug).replace(' Operating Partner', '')
  )
}

export async function getOperatingPartnerSlugs(): Promise<string[]> {
  const members = await requestDirectus(
    readItems(teamCollection, {
      fields: ['slug', 'status', 'profile_path', 'sort_order'],
      limit: 300,
      sort: ['sort_order', 'slug'],
    }),
  )

  if (!members || members.length === 0) {
    return [...OPERATING_PARTNER_SLUGS]
  }

  const slugs = members
    .filter((item) => {
      const status = getPublishedStatus(item as DirectusRecord)
      const slug = getStringField(item as DirectusRecord, ['slug'])
      const profilePath = getStringField(item as DirectusRecord, ['profile_path'])

      if (!slug || status !== 'published') {
        return false
      }

      if (!profilePath) {
        return true
      }

      return profilePath.startsWith('/operating-partners/')
    })
    .map((item) => getStringField(item as DirectusRecord, ['slug']))
    .filter((value): value is string => Boolean(value))

  if (slugs.length === 0) {
    return [...OPERATING_PARTNER_SLUGS]
  }

  return [...new Set(slugs)]
}

export async function getOperatingPartnerProfileBySlug(slug: string): Promise<{
  name: string
  title: string
  shortDescription: string
  imageUrl: string | null
  websiteUrl: string | null
  linkedinUrl: string | null
} | null> {
  const members = await requestDirectus(
    readItems(teamCollection, {
      filter: {
        slug: {
          _eq: slug,
        },
      } as never,
      fields: ['*'],
      limit: 1,
    }),
  )

  const member = members?.[0] as DirectusRecord | undefined
  const status = member ? getPublishedStatus(member) : null

  if (member && status === 'published') {
    const name = getStringField(member, ['full_name', 'name']) ?? toFallbackName(slug)
    const title = getStringField(member, ['role']) ?? 'Operating Partner'
    const shortDescription =
      getStringField(member, ['short_bio', 'excerpt', 'description']) ??
      "Profil en cours d'intégration. La structure SEO/routage est déjà en place."
    const imageUrl = getProfileImageUrl(member)
    const websiteUrl = getUrlField(member, ['website_url', 'website', 'site_url'])
    const linkedinUrl = getUrlField(member, ['linkedin_url', 'linkedin', 'linkedinUrl'])

    return {
      name,
      title,
      shortDescription,
      imageUrl,
      websiteUrl,
      linkedinUrl,
    }
  }

  if (!OPERATING_PARTNER_SLUGS.includes(slug as (typeof OPERATING_PARTNER_SLUGS)[number])) {
    return null
  }

  return (
    fallbackPartnerProfiles[slug] ?? {
      name: toFallbackName(slug),
      title: 'Operating Partner',
      shortDescription:
        "Profil en cours d'intégration. La structure SEO/routage est déjà en place.",
      imageUrl: null,
      websiteUrl: null,
      linkedinUrl: null,
    }
  )
}
