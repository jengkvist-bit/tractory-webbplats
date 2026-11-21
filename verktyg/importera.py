"""Engångsskript: gör om exporten från Squarespace till innehållsfiler för Astro.
Körs så här: python3 verktyg/importera.py /mnt/project-files/tractory-export
"""
import sys, os, re, json
from PIL import Image
SRC = sys.argv[1].rstrip('/') + '/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/'
os.makedirs(ROOT+'public/bilder', exist_ok=True)
os.makedirs(ROOT+'src/content/blogg', exist_ok=True)
os.makedirs(ROOT+'src/content/sidor', exist_ok=True)
used = set()

def bild(fn):
    """Kopiera och förminska en bild till public/bilder, max 1600 px bred."""
    out = os.path.splitext(fn)[0] + ('.gif' if fn.endswith('.gif') else '.webp')
    if out not in used:
        used.add(out)
        im = Image.open(SRC+'bilder/'+fn)
        if fn.endswith('.gif'):
            open(ROOT+'public/bilder/'+out,'wb').write(open(SRC+'bilder/'+fn,'rb').read())
        else:
            if im.width > 1600:
                im = im.resize((1600, round(im.height*1600/im.width)))
            im.save(ROOT+'public/bilder/'+out, 'WEBP', quality=80)
    return '/bilder/'+out

def las(p):
    t = open(p).read()
    m = re.match(r'---\n(.*?)\n---\n\n?(.*)', t, re.S)
    meta = {}
    for line in m.group(1).splitlines():
        k, v = line.split(': ', 1); meta[k] = json.loads(v)
    return meta, m.group(2)

def fixa_bilder(body):
    return re.sub(r'\(\.\./bilder/([^)\s]+)\)', lambda m: '('+bild(m.group(1))+')', body)

def knappar(body):
    # En länk som står ensam på en rad blir en knapp
    def r(m):
        text, href = m.group(1).strip(), m.group(2)
        return f'<a class="knapp" href="{href}">{text}</a>'
    return re.sub(r'^\[([^\]]+)\]\(([^)]+)\)\s*$', r, body, flags=re.M)

def dragspel(body):
    # Squarespace-dragspel ("- #### Rubrik" + text) blir <details>
    def block(m):
        items = re.split(r'^- #### ', m.group(0), flags=re.M)[1:]
        out = ['<div class="dragspel">']
        for it in items:
            rubrik, _, text = it.partition('\n')
            text = re.sub(r'^  ', '', text, flags=re.M).strip()
            out.append(f'<details>\n<summary>{rubrik.strip()}</summary>\n\n{text}\n\n</details>')
        out.append('</div>')
        return '\n'.join(out) + '\n\n'
    return re.sub(r'(^- #### .*\n(?:(?!^- ####)(?:^  .*\n|^\s*\n))*)+', block, body, flags=re.M)

def fm(d):
    return '---\n' + ''.join(f'{k}: {json.dumps(v, ensure_ascii=False)}\n' for k, v in d.items() if v != '') + '---\n\n'

# Utdrag och listbilder från bloggens översiktssida
_, index = las(SRC+'sidor/blogg.md')
utdrag = {}
for m in re.finditer(r'\[!\[\]\(\.\./bilder/([^)]+)\)\]\(/blogg/([^)]+)\).*?\n# \[.*?\]\(.*?\)\n\n(.*?)\n\n\[Läs mer\]', index, re.S):
    utdrag[m.group(2)] = (m.group(1), m.group(3).strip())

for f in sorted(os.listdir(SRC+'blogg')):
    meta, body = las(SRC+'blogg/'+f)
    slug = f[:-3]
    lb, ut = utdrag.get(slug, ('', ''))
    d = {'titel': meta['rubrik'], 'datum': meta['datum'], 'beskrivning': meta['beskrivning'],
         'utdrag': ut, 'listbild': bild(lb) if lb else '',
         'delningsbild': bild(meta['delningsbild']) if meta.get('delningsbild') else ''}
    body = fixa_bilder(body)
    # Bildtexter: kort stycke direkt efter en bild som nämner fotograf/rättigheter blir kursiv bildtext
    def bt(m):
        txt = m.group(2).strip()
        if len(txt) < 400 and re.search(r'Foto|Rättigheter|Bild|Källa|Skärm|Unsplash|Wikimedia|CC BY', txt, re.I):
            return m.group(1) + '\n\n_' + txt + '_\n'
        return m.group(0)
    body = re.sub(r'(!\[[^\]]*\]\([^)]+\))\n\n([^\n]+)\n', bt, body)
    open(ROOT+f'src/content/blogg/{slug}.md','w').write(fm(d) + body.strip() + '\n')

for f in sorted(os.listdir(SRC+'sidor')):
    slug = f[:-3]
    if slug in ('blogg', 'home'): continue
    meta, body = las(SRC+'sidor/'+f)
    h1 = re.search(r'^# (.+)$', body, re.M)
    body = re.sub(r'^# .+\n+', '', body, count=1, flags=re.M)
    body = knappar(dragspel(fixa_bilder(body)))
    d = {'titel': h1.group(1).strip() if h1 else meta['titel'].split(' — ')[0],
         'sidtitel': meta['titel'], 'beskrivning': meta['beskrivning'],
         'delningsbild': bild(meta['delningsbild']) if meta.get('delningsbild') else ''}
    open(ROOT+f'src/content/sidor/{slug}.md','w').write(fm(d) + body.strip() + '\n')

bild('favicon.webp')
print(len(used), 'bilder,', len(os.listdir(ROOT+'src/content/blogg')), 'blogginlägg,', len(os.listdir(ROOT+'src/content/sidor')), 'sidor')
