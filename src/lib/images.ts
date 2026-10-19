import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';

/**
 * Изображения проектов и аватар лежат в src/assets/images/ — при сборке Astro сам
 * сжимает их, переводит в WebP и делает несколько размеров для разных экранов.
 * В файлах контента путь указывается относительно этой папки: projects/my-app/cover.png
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}',
);
const warned = new Set<string>();

/** Находит картинку в src/assets/images/. Если файла нет, пишет предупреждение в консоль и возвращает undefined. */
export async function loadImage(path: string | undefined): Promise<ImageMetadata | undefined> {
  if (!path) return undefined;
  const clean = path.replace(/^\/+/, '');
  const load = modules[`/src/assets/images/${clean}`];
  if (!load) {
    if (!warned.has(clean)) {
      warned.add(clean);
      console.warn(`[images] Файл не найден: src/assets/images/${clean} (проверьте путь в файле проекта или profile.ts)`);
    }
    return undefined;
  }
  return (await load()).default;
}

/** Проверяет, что файл из public/ существует (для картинок превью в соцсетях). */
export function publicFileExists(path: string | undefined): path is string {
  if (!path) return false;
  return existsSync(join(process.cwd(), 'public', path.replace(/^\//, '')));
}
