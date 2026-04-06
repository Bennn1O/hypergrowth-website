import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const ressource = defineType({
  name: 'ressources',
  title: 'Ressources / Articles',
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
      name: 'coverImage',
      type: 'image',
      title: 'Image de couverture',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Contenu',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                  defineField({ name: 'blank', type: 'boolean', title: 'Ouvrir dans un nouvel onglet', initialValue: true }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Légende' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
})
