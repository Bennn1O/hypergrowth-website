import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Projects live in src/content/projects/<locale>/<slug>.md.
 * `translationKey` links the FR and EN versions of the same project.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      translationKey: z.string(),
      title: z.string(),
      tags: z.array(z.string()).max(3),
      order: z.number().int(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tone: z.enum(['blush', 'pink', 'purple', 'ink']).default('purple'),
      placeholder: z.boolean().default(false),
    }),
});

export const collections = { projects };
