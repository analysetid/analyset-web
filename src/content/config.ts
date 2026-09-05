import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Analyset'),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
