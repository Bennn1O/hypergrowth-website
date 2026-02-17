import { createDirectus, rest, type RestCommand } from '@directus/sdk'

export type DirectusRecord = Record<string, unknown>
type DirectusSchema = Record<string, DirectusRecord[]>

const directusApiUrl =
  process.env.DIRECTUS_URL ??
  process.env.NEXT_PUBLIC_DIRECTUS_URL ??
  'http://localhost:8055'

const directusPublicUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ??
  process.env.DIRECTUS_PUBLIC_URL ??
  directusApiUrl

export const directus = createDirectus<DirectusSchema>(directusApiUrl).with(rest())

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export function getDirectusAssetUrl(assetId: string): string {
  return `${trimTrailingSlash(directusPublicUrl)}/assets/${assetId}`
}

export async function requestDirectus<T>(
  command: RestCommand<T, DirectusSchema>,
): Promise<T | null> {
  try {
    return await directus.request(command)
  } catch (error) {
    console.error('[directus] request failed', error)
    return null
  }
}
