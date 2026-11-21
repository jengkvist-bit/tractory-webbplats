# Tractorys webbplats

Det här är koden till www.tractory.se. Sajten byggs med [Astro](https://astro.build), som gör vanliga webbsidor av enkla textfiler.

## Var ligger vad?

| Vill du ändra… | Öppna |
|---|---|
| Text på en tjänste-, om- eller kontaktsida | `src/content/sidor/<sidans-namn>.md` |
| Ett blogginlägg | `src/content/blogg/<inläggets-namn>.md` |
| Startsidan | `src/pages/index.astro` |
| Färger, typsnitt, avstånd | `src/styles/global.css` (variablerna överst) |
| Meny, sidhuvud och sidfot | `src/layouts/Bas.astro` |
| Bilder | `public/bilder/` |

Textfilerna är skrivna i *Markdown*: `## Rubrik` blir en rubrik, `[text](/adress)` blir en länk och `![](/bilder/namn.webp)` blir en bild.

## Nytt blogginlägg

Skapa en ny fil i `src/content/blogg/`, till exempel `mitt-inlagg.md`. Filnamnet blir adressen (`/blogg/mitt-inlagg`). Börja filen så här:

```
---
titel: "Rubriken på inlägget"
datum: "2026-11-21"
utdrag: "Ett par meningar som visas i bloggens lista."
listbild: "/bilder/min-bild.webp"
---

Här skriver du själva texten.
```

Enklast är att be Claude: "Lägg till ett blogginlägg med den här texten…"

## Köra sajten på din egen dator (frivilligt)

```
npm install
npm run dev
```

Öppna sedan http://localhost:4321.

## Bakgrund

Innehållet flyttades från Squarespace i november 2026 med `verktyg/importera.py`. Skriptet behövs inte längre för vardagliga ändringar.

## Cookies och webbanalys

Sajten sätter inga cookies och laddar inget från andra sajter (typsnittet Poppins ligger i sajten själv). Därför behövs ingen cookie-banner.

Besök räknas med [GoatCounter](https://www.goatcounter.com), som inte använder cookies och inte sparar personuppgifter. Statistiken finns på https://tractory.goatcounter.com. Inställningen ligger överst i `src/layouts/Bas.astro`, och besök räknas bara på www.tractory.se.
