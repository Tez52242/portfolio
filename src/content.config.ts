import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Путь к картинке относительно src/assets/images/, например projects/my-app/cover.png */
const imagePath = z.string();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(220, 'Краткое описание — не длиннее 220 символов'),
    /** Дата проекта (необязательно); влияет на сортировку при одинаковом order и показывает год. */
    date: z.coerce.date().optional(),
    /** Меньше число — выше в списке. */
    order: z.number().default(100),
    /** Показывать на главной странице. */
    featured: z.boolean().default(false),
    /** true — проект скрыт на опубликованном сайте. */
    draft: z.boolean().default(false),
    cover: imagePath.optional(),
    coverAlt: z.string().optional(),
    gallery: z
      .array(z.object({ src: imagePath, alt: z.string(), caption: z.string().optional() }))
      .default([]),
    technologies: z.array(z.string()).default([]),
    role: z.string().optional(),
    status: z.string().optional(),
    links: z
      .object({ demo: z.url().optional(), itchio: z.url().optional(), steam: z.url().optional(), repo: z.url().optional() })
      .default({}),
    /** Описание задачи (абзацы разделяйте пустой строкой). */
    problem: z.string().optional(),
    /** Описание вашего решения. */
    solution: z.string().optional(),
  }),
});

export const collections = { projects };
