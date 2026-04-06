import { defineQuery } from 'next-sanity'

export const CASE_STUDIES_LIST_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt asc) {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    description,
    "image": coalesce(image.asset->url, imageUrl),
    "imageAlt": coalesce(image.alt, title),
    imageObjectClass,
    imageBgClass,
    stats,
    attribution,
    linkedinName,
    linkedinUrl,
    companyUrl
  }
`)

export const ALL_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt asc) {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    description,
    "image": coalesce(image.asset->url, imageUrl),
    "imageAlt": coalesce(image.alt, title),
    imageObjectClass,
    imageBgClass,
    stats,
    attribution,
    linkedinName,
    linkedinUrl,
    companyUrl,
    "detail": select(defined(detail.subtitle) => {
      "subtitle": detail.subtitle,
      "heroImage": {
        "src": coalesce(detail.heroImage.asset->url, detail.heroImageUrl),
        "alt": coalesce(detail.heroImage.alt, title)
      },
      "avant": detail.avant,
      "apres": detail.apres,
      "stats": detail.stats,
      "testimonial": select(defined(detail.testimonial.quote) => {
        "quote": detail.testimonial.quote,
        "author": detail.testimonial.author,
        "authorImage": coalesce(detail.testimonial.authorImage.asset->url, detail.testimonial.authorImageUrl),
        "linkedinUrl": detail.testimonial.linkedinUrl
      })
    })
  }
`)

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt asc) {
    "slug": slug.current
  }
`)

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    description,
    "image": coalesce(image.asset->url, imageUrl),
    "imageAlt": coalesce(image.alt, title),
    imageObjectClass,
    imageBgClass,
    stats,
    attribution,
    linkedinName,
    linkedinUrl,
    companyUrl,
    "detail": select(defined(detail.subtitle) => {
      "subtitle": detail.subtitle,
      "heroImage": {
        "src": coalesce(detail.heroImage.asset->url, detail.heroImageUrl),
        "alt": coalesce(detail.heroImage.alt, title)
      },
      "avant": detail.avant,
      "apres": detail.apres,
      "stats": detail.stats,
      "testimonial": select(defined(detail.testimonial.quote) => {
        "quote": detail.testimonial.quote,
        "author": detail.testimonial.author,
        "authorImage": coalesce(detail.testimonial.authorImage.asset->url, detail.testimonial.authorImageUrl),
        "linkedinUrl": detail.testimonial.linkedinUrl
      })
    })
  }
`)

export const RESSOURCE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "ressource" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    content,
    "publishedAt": publishedAt
  }
`)

export const RESSOURCE_SLUGS_QUERY = defineQuery(`
  *[_type == "ressource"] {
    "slug": slug.current
  }
`)

export const ALL_EVENTS_QUERY = defineQuery(`
  *[_type == "evenement"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    status,
    accessMode,
    "isPast": status == "past",
    date,
    dateEnd,
    location,
    country,
    description,
    longDescription,
    format,
    targetAudience,
    publishedAt,
    "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
    "href": "/evenements/" + slug.current,
    details,
    programme,
    pillars
  }
`)

export const EVENT_SLUGS_QUERY = defineQuery(`
  *[_type == "evenement"] {
    "slug": slug.current
  }
`)

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "evenement" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    category,
    status,
    accessMode,
    "isPast": status == "past",
    date,
    dateEnd,
    location,
    country,
    description,
    longDescription,
    format,
    targetAudience,
    publishedAt,
    "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
    "href": "/evenements/" + slug.current,
    conceptPanel,
    details,
    programme,
    pillars,
    "photos": photos[] { "src": asset->url, alt }
  }
`)

export const ALL_PARTNERS_QUERY = defineQuery(`
  *[_type == "operatingPartner"] | order(name asc) {
    "slug": slug.current,
    name,
    title,
    shortDescription,
    "imageUrl": coalesce(photo.asset->url, imageUrl),
    websiteUrl,
    linkedinUrl,
    instagramUrl,
    youtubeUrl,
    expertiseTags
  }
`)

export const PARTNER_SLUGS_QUERY = defineQuery(`
  *[_type == "operatingPartner"] {
    "slug": slug.current
  }
`)

export const PARTNER_BY_SLUG_QUERY = defineQuery(`
  *[_type == "operatingPartner" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    title,
    shortDescription,
    "imageUrl": coalesce(photo.asset->url, imageUrl),
    websiteUrl,
    linkedinUrl,
    instagramUrl,
    youtubeUrl,
    expertiseTags
  }
`)
