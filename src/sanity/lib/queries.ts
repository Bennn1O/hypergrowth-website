import { defineQuery } from 'next-sanity'

export const CASE_STUDIES_LIST_QUERY = defineQuery(`
  *[_type == "caseStudies"] | order(_createdAt asc) {
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
  *[_type == "caseStudies"] | order(_createdAt asc) {
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
  *[_type == "caseStudies"] | order(_createdAt asc) {
    "slug": slug.current
  }
`)

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "caseStudies" && slug.current == $slug][0] {
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
  *[_type == "ressources" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "alt": alt,
        "caption": caption
      }
    },
    "coverImage": { "src": coverImage.asset->url, "alt": coverImage.alt },
    "publishedAt": publishedAt
  }
`)

export const ALL_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "temoignages"] | order(_createdAt asc) {
    "id": _id,
    author,
    role,
    company,
    companyUrl,
    linkedinUrl,
    "photo": coalesce(photo.asset->url, photoUrl),
    quote,
    featured
  }
`)

export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "temoignages" && featured == true] | order(_createdAt asc) {
    "id": _id,
    author,
    role,
    company,
    companyUrl,
    linkedinUrl,
    "photo": coalesce(photo.asset->url, photoUrl),
    quote
  }
`)

export const RESSOURCE_SLUGS_QUERY = defineQuery(`
  *[_type == "ressources"] {
    "slug": slug.current
  }
`)

export const ALL_EVENTS_QUERY = defineQuery(`
  *[_type == "evenements"] | order(date desc) {
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
  *[_type == "evenements"] {
    "slug": slug.current
  }
`)

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "evenements" && slug.current == $slug][0] {
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
  *[_type == "operatingPartners"] | order(name asc) {
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
  *[_type == "operatingPartners"] {
    "slug": slug.current
  }
`)

export const PARTNER_BY_SLUG_QUERY = defineQuery(`
  *[_type == "operatingPartners" && slug.current == $slug][0] {
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
