import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string(),
    draft: z.boolean().optional().default(false)
  })
});

const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    coverImage: z.string(),
    description: z.string(),
    images: z.array(z.object({
      url: z.string(),
      caption: z.string()
    }))
  })
});

export const collections = {
  blog,
  photos
};