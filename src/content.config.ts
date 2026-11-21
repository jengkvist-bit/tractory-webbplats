import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blogginlägg: en .md-fil per inlägg i src/content/blogg
const blogg = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blogg' }),
  schema: ({ image }) => z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    beskrivning: z.string().optional(),
    utdrag: z.string().optional(),
    listbild: image().optional(),
    delningsbild: z.string().optional(),
  }),
});

// Vanliga sidor: tjänster, om, kontakt och metodsidorna
const sidor = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sidor' }),
  schema: z.object({
    titel: z.string(),
    sidtitel: z.string().optional(),
    beskrivning: z.string().optional(),
    delningsbild: z.string().optional(),
  }),
});

export const collections = { blogg, sidor };
