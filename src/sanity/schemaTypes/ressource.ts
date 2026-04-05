import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const ressource = defineType({
  name: 'ressource',
  title: 'Ressource / Article',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Date de publication',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Extrait',
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'content',
      type: 'text',
      title: 'Contenu',
      rows: 30,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
})
