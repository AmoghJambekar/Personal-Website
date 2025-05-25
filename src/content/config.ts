import { defineCollection, z } from 'astro:content';

const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(), // This will convert string dates to Date objects
    description: z.string(),
    coverImage: z.string(),
    images: z.array(z.object({
      url: z.string(),
      caption: z.string().optional()
    }))
  })
});

export const collections = {
  photos
};