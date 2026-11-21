// Gör bilderna i Markdown-texterna responsiva.
// Astro skapar flera storlekar av varje bild (srcset). Här talar vi om hur bred
// bilden blir på skärmen (sizes), så att mobilen hämtar en liten fil och datorn en större.
// Första bilden på sidan laddas direkt, resten först när läsaren scrollar nära (lazy).
const vanlig = {
  widths: [400, 760, 1100, 1520],
  // Textspalten är högst 760px bred, annars hela skärmen minus marginaler.
  sizes: '(min-width: 830px) 760px, 92vw',
};
const kontakt = {
  widths: [400, 800, 1100, 1560],
  // Dator: bilden visas bredvid texten (högst 416px) men beskärs till stående format,
  // så det behövs en fil som är ungefär dubbelt så bred som rutan för att den ska bli skarp.
  // Mobil och surfplatta: hela bredden, beskuren till kvadrat (behöver ca 1,5 gånger bredden).
  sizes: '(min-width: 1200px) 780px, (min-width: 821px) 68vw, 138vw',
};

export default function rehypeBilder() {
  return (tree, file) => {
    const val = /kontakt\.md$/.test(file.path || file.history?.[0] || '') ? kontakt : vanlig;
    let forsta = true;
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'img' && node.properties) {
        const src = node.properties.src;
        if (typeof src === 'string' && !src.startsWith('/') && !/^https?:/.test(src)) {
          node.properties.widths = val.widths;
          node.properties.sizes = val.sizes;
          node.properties.loading = forsta ? 'eager' : 'lazy';
          node.properties.decoding = 'async';
          if (forsta) node.properties.fetchpriority = 'high';
          forsta = false;
        }
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
}
