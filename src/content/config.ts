import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    excerpt: z.string().optional(),
    tags: z.array(z.string())
  })
});

const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(), // This will convert string dates to Date objects
    description: z.string(),
    coverImage: z.string(),
    images: z.array(
      z.union([
        z.string(),
        z.object({
          url: z.string(),
          caption: z.string().optional(),
          alt: z.string().optional(),
          protection: z.enum(['public', 'party-pics']).default('public')
        })
      ])
    )
  })
});

export const collections = {
  blog,
  photos
};