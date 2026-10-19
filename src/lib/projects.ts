import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Опубликованные проекты: сначала по order, затем новые выше. Черновики видны только в `npm run dev`. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort(
    (a, b) => a.data.order - b.data.order || (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  );
}

/** Проекты для главной: избранные (если ни один не отмечен — все). */
export async function getHomeProjects(): Promise<{ shown: Project[]; total: number }> {
  const all = await getProjects();
  const featured = all.filter((p) => p.data.featured);
  return { shown: featured.length > 0 ? featured : all, total: all.length };
}
