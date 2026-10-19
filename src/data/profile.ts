/**
 * ГЛАВНЫЙ ФАЙЛ С ВАШИМИ ДАННЫМИ.
 * Всё ниже — примеры-заглушки. Замените их на свои значения.
 * Необязательные поля можно удалить или оставить пустыми — блок просто не покажется.
 */

export interface SocialLink {
  /** Подпись ссылки */
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  /** Профессия / должность */
  role: string;
  /** Короткое позиционирование для Hero (1–2 предложения) */
  tagline: string;
  /** Описание для блока «Обо мне». Абзацы — отдельные строки массива. */
  about: string[];
  /** Специализация — короткие пункты в блоке «Обо мне» */
  specialization: string[];
  /** Путь к аватару относительно src/assets/images/ (например, 'avatar.jpg'). Если файла нет, покажутся инициалы. */
  avatar?: string;
  avatarAlt?: string;
  location?: string;
  /** Например: «Открыт к предложениям» */
  availability?: string;
  email: string;
  socials: SocialLink[];
  /** Ссылка на резюме (файл в public/ или внешний URL). Необязательно. */
  resume?: { label: string; url: string };
  /** Язык страницы (атрибут lang) */
  lang: string;
  /** Описание сайта для поисковиков и соцсетей */
  seoDescription: string;
  /** Картинка для превью в соцсетях, 1200×630, PNG/JPG в public/images/. Необязательно: для главной страницы. */
  ogImage?: string;
}

export const profile: Profile = {
  name: 'Дмитрий Никитин',
  role: 'Level-Designer и Game Designer',
  tagline: 
    '',
  about: [
    'Я геймдизайнер, которому нравится разбираться в том, как устроены игры, почему одни решения работают, а другие нет, и как сделать игровой опыт интереснее.',
    'Я не ограничиваюсь документами и концептами. Могу спроектировать механику, собрать её в Unity, создать окружение, настроить визуальную составляющую и довести идею до играбельного прототипа.',
  ],
  specialization: ['Game Design', 'Level-Design', '3D-Art'],
  location: 'Чебоксары, Россия',
  availability: 'Удалённо, гибрид, релокация',
  email: 'exetild@gmail.com',
  socials: [{ label: 'Telegram', url: 'https://t.me/Ankhes' }],
  lang: 'ru',
  seoDescription:
    '',
  // ogImage: '/images/og.png',   // файл в public/images/; у проектов превью делается из обложки автоматически
};
