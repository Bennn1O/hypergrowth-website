import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

type SanityImageSource = Parameters<typeof builder.image>[0]

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
