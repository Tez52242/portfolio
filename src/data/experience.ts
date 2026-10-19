/**
 * Опыт работы и образование. Раздел необязательный:
 * если оба массива пустые, он автоматически скрывается.
 */
export interface TimelineEntry {
  /** Компания или учебное заведение */
  organization: string;
  /** Должность или специальность */
  title: string;
  /** Период в свободной форме, например «2022 — н. в.» (необязательно) */
  period?: string;
  description?: string;
}

export const experience: TimelineEntry[] = [
  {
    organization: 'Pantomime Studio',
    title: 'Game Designer',
    period: 'Август 2026 — настоящее время',
    description:
      'Инди-студия, команда из 6 человек, удалённо. Геймдизайн и документация, левел-дизайн в Unity, 3D-арт и оптимизация ассетов, планирование спринтов и контроль сроков, участие в подборе и адаптации сотрудников.',
  },
];

export const education: TimelineEntry[] = [
  {
    organization: 'Основное общее образование',
    title: '9 классов',
  },
];

export const subeducation: TimelineEntry[] = [
  {
    organization: 'Skillbox',
    title: 'Environment Artist',
    description:
      'Освоил создания игрового окружения: моделирование 3D-ассетов, текстурирование, настройка материалов и подготовка объектов для использования в игровых движках.',
  },
];