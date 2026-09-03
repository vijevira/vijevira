import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/projects/` directory.
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // Keeps an entry pinned first on /projects regardless of pubDate.
    pinned: z.boolean().optional(),
    // For evergreen pages where the original pubDate isn't meaningful —
    // shows only "Updated <date>" instead of pubDate + last-updated.
    hidePubDate: z.boolean().optional(),
  }),
});

export const collections = { projects };
