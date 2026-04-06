import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const temoignage = defineType({
  name: 'temoignages',
  title: 'Témoignages',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'author',
      type: 'string',
      title: 'Nom',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Rôle / Titre',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Entreprise',
    }),
    defineField({
      name: 'companyUrl',
      type: 'url',
      title: 'URL entreprise',
    }),
    defineField({
      name: 'linkedinUrl',
      type: 'url',
      title: 'LinkedIn',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'photoUrl',
      type: 'string',
      title: 'URL photo (legacy /public)',
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Citation',
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Mettre en avant (homepage)',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'company', media: 'photo' },
  },
})
