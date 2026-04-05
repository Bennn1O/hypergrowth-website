import { defineField, defineType, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const evenement = defineType({
  name: 'evenement',
  title: 'Événement',
  type: 'document',
  icon: CalendarIcon,
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
    defineField({ name: 'category', type: 'string', title: 'Catégorie' }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Statut',
      options: {
        list: [
          { title: 'Ouvert', value: 'open' },
          { title: 'Candidature', value: 'candidature' },
          { title: 'Membres uniquement', value: 'members' },
          { title: 'Passé', value: 'past' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'accessMode', type: 'string', title: "Mode d'accès (ex: Sur inscription)" }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Date de publication' }),
    defineField({ name: 'date', type: 'datetime', title: 'Date de début' }),
    defineField({ name: 'dateEnd', type: 'datetime', title: 'Date de fin' }),
    defineField({ name: 'location', type: 'string', title: 'Ville' }),
    defineField({ name: 'country', type: 'string', title: 'Pays' }),
    defineField({ name: 'format', type: 'string', title: 'Format' }),
    defineField({ name: 'targetAudience', type: 'string', title: 'Public cible' }),
    defineField({ name: 'description', type: 'text', title: 'Description courte', rows: 3 }),
    defineField({ name: 'longDescription', type: 'text', title: 'Description longue', rows: 6 }),
    defineField({ name: 'heroImageUrl', type: 'string', title: 'URL image hero (legacy /public)' }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Image hero',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'conceptPanel',
      type: 'object',
      title: 'Panneau concept',
      fields: [
        defineField({ name: 'badge', type: 'string', title: 'Badge' }),
        defineField({ name: 'title', type: 'string', title: 'Titre' }),
        defineField({ name: 'body', type: 'array', title: 'Paragraphes', of: [{ type: 'text' }] }),
      ],
    }),
    defineField({
      name: 'details',
      type: 'array',
      title: 'Détails (date, horaires, prix…)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Valeur' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'programme',
      type: 'array',
      title: 'Programme',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'time', type: 'string', title: 'Heure' }),
            defineField({ name: 'title', type: 'string', title: 'Titre' }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'pillars',
      type: 'array',
      title: 'Piliers',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Titre' }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'photos',
      type: 'array',
      title: 'Photos',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'heroImage' },
  },
})
