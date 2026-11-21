// Gör samma sak som url.ts, men för länkar och bilder i Markdown-filerna.
export default function rehypeBas() {
  const base = (process.env.BASE || '/').replace(/\/$/, '');
  return (tree) => {
    if (!base) return;
    const walk = (node) => {
      if (node.type === 'element' && node.properties) {
        for (const attr of ['href', 'src']) {
          const v = node.properties[attr];
          if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//')) node.properties[attr] = base + v;
        }
      }
      // Rå HTML i Markdown (t.ex. knappar)
      if (node.type === 'raw' && typeof node.value === 'string') {
        node.value = node.value.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
}
