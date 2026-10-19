/**
 * Навыки по категориям.
 * Добавить категорию = добавить объект в массив. Порядок массива = порядок на сайте.
 */
export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: 'Геймдизайн',
    items: ['Разработка механик', 'GDD и документация', 'Балансировка', 'Прототипирование', 'Google Docs и Sheets'],
  },
  {
    category: 'Левел-дизайн и движки',
    items: ['Unity: левел-дизайн, прототипирование, VFX', 'Unreal Engine: левел-дизайн, прототипирование'],
  },
  {
    category: '3D и визуал',
    items: ['Blender', 'Figma', 'Krita', 'Substance Painter', 'Substance Designer', 'Gaea'],
  },
  { category: 'Технические', items: ['Git', 'Steamworks', 'C#', 'Blueprints'] },
  {
    category: 'Организация работы',
    items: ['Планирование спринтов', 'Kanban', 'YouGile', 'Miro', 'Discord'],
  },
  { category: 'Языки', items: ['Русский — родной', 'Английский — B1'] },
];
