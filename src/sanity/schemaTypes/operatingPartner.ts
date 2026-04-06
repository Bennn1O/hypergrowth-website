import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const operatingPartner = defineType({
  name: 'operatingPartners',
  title: 'Operating Partners',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nom',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Titre / Rôle' }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Description courte',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'imageUrl', type: 'string', title: 'URL photo (legacy /public)' }),
    defineField({ name: 'websiteUrl', type: 'url', title: 'Site web' }),
    defineField({ name: 'linkedinUrl', type: 'url', title: 'LinkedIn' }),
    defineField({ name: 'instagramUrl', type: 'url', title: 'Instagram' }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'YouTube' }),
    defineField({
      name: 'expertiseTags',
      type: 'array',
      title: "Tags d'expertise",
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
