/**
 * Добавляет base-путь к абсолютным ссылкам и картинкам внутри Markdown:
 * ![](/images/a.png) → /REPO/images/a.png
 * Внешние ссылки, якоря и mailto не затрагиваются.
 */
export default function rehypeBasePath({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  const fix = (value) =>
    typeof value === 'string' && prefix && value.startsWith('/') && !value.startsWith('//') && !value.startsWith(prefix + '/')
      ? prefix + value
      : value;

  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.properties) {
        if (node.tagName === 'img') node.properties.src = fix(node.properties.src);
        if (node.tagName === 'a') node.properties.href = fix(node.properties.href);
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
