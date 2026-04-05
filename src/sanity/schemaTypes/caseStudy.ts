import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

const sectionFields = [
  defineField({ name: 'badge', type: 'string', title: 'Badge' }),
  defineField({ name: 'title', type: 'string', title: 'Titre' }),
  defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
]

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Cas client',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nom du client',
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
    defineField({ name: 'description', type: 'text', title: 'Description courte (card)', rows: 3 }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image principale',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'imageObjectClass', type: 'string', title: 'CSS object-fit class' }),
    defineField({ name: 'imageBgClass', type: 'string', title: 'CSS background class' }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Statistiques (card)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Valeur' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
        },
      ],
    }),
    defineField({ name: 'imageUrl', type: 'string', title: 'URL image (legacy /public)' }),
    defineField({ name: 'attribution', type: 'string', title: 'Attribution (nom · rôle)' }),
    defineField({ name: 'linkedinName', type: 'string', title: 'Nom LinkedIn' }),
    defineField({ name: 'linkedinUrl', type: 'url', title: 'URL LinkedIn' }),
    defineField({ name: 'companyUrl', type: 'url', title: 'URL société' }),
    defineField({
      name: 'detail',
      type: 'object',
      title: 'Contenu de la page détail',
      fields: [
        defineField({ name: 'subtitle', type: 'string', title: 'Sous-titre (question)' }),
        defineField({ name: 'heroImageUrl', type: 'string', title: 'URL image hero (legacy /public)' }),
        defineField({
          name: 'heroImage',
          type: 'image',
          title: 'Image hero',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
        }),
        defineField({
          name: 'avant',
          type: 'object',
          title: 'Avant HyperGrowth',
          fields: [
            defineField({ name: 'desires', type: 'object', title: 'Désirs du client', fields: sectionFields }),
            defineField({ name: 'problems', type: 'object', title: 'Problèmes', fields: sectionFields }),
          ],
        }),
        defineField({
          name: 'apres',
          type: 'object',
          title: 'Avec HyperGrowth',
          fields: [
            defineField({ name: 'solutions', type: 'object', title: 'Solutions', fields: sectionFields }),
            defineField({ name: 'results', type: 'object', title: 'Résultats', fields: sectionFields }),
          ],
        }),
        defineField({
          name: 'stats',
          type: 'array',
          title: 'Statistiques (page)',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'value', type: 'string', title: 'Valeur' }),
                defineField({ name: 'label', type: 'string', title: 'Label (long)' }),
              ],
            },
          ],
        }),
        defineField({
          name: 'testimonial',
          type: 'object',
          title: 'Témoignage',
          fields: [
            defineField({ name: 'quote', type: 'text', title: 'Citation', rows: 4 }),
            defineField({ name: 'author', type: 'string', title: 'Auteur' }),
            defineField({ name: 'authorImageUrl', type: 'string', title: 'URL photo auteur (legacy /public)' }),
            defineField({
              name: 'authorImage',
              type: 'image',
              title: 'Photo auteur',
              options: { hotspot: true },
            }),
            defineField({ name: 'linkedinUrl', type: 'url', title: 'LinkedIn auteur' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
