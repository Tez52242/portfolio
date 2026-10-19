// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import rehypeBasePath from './plugins/rehype-base-path.mjs';

/**
 * Адрес и подпапка сайта на GitHub Pages.
 *
 * Обычно НИЧЕГО менять не нужно: в GitHub Actions значения берутся
 * автоматически из имени аккаунта и репозитория.
 *
 *   репозиторий  USERNAME/portfolio     → https://USERNAME.github.io/portfolio/
 *   репозиторий  USERNAME/USERNAME.github.io → https://USERNAME.github.io/
 *
 * Свой домен: задайте SITE_URL (в workflow или здесь) и BASE_PATH='/'.
 */
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo && repo.toLowerCase() === `${owner}.github.io`.toLowerCase();

const site =
  process.env.SITE_URL ??
  (owner ? `https://${owner.toLowerCase()}.github.io` : 'http://localhost:4321');

const base = process.env.BASE_PATH ?? (repo && !isUserSite ? `/${repo}` : '/');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  // Стили встраиваются в HTML: нет отдельного блокирующего запроса CSS (файл маленький)
  build: { inlineStylesheets: 'always' },
  // Страница проекта подгружается заранее, когда вы наводите курсор на ссылку
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap()],
  markdown: {
    // Добавляет base к ссылкам и картинкам вида /images/... внутри Markdown
    processor: unified({ rehypePlugins: [[rehypeBasePath, { base }]] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
