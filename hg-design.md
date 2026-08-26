# Design System — Hypergrowth

> Source : `hg.json` + `Mapped Values/` + `Mapped Colors/` + `Mode 1.tokens.json`
> Toutes les valeurs sont résolues. Dernier fichier lu : 30 juin 2026.

---

## Identité visuelle — lecture globale

**Accent principal :** Purple/500 `#803FAB` — violet moyen, chaud, distinctif.
**Fond dark :** `#180A22` — violet quasi-noir, signature du produit. Dark mode = mode primaire.
**Information :** Blue/500 `#5D4DF4` — violet-indigo, rôle info uniquement (pas accent).
**Police :** Archivo — grotesque versatile, forte à grand corps, headings + body.
**Système d'alias :** Accent → Purple, Information → Blue, Success → Green, Warnings → Orange, Error → Red, Neutral → Grey.

---

## Typographie — Responsive

Police : **Archivo** pour tous les headings et le body. Boutons : Archivo aussi.

### Headings — Desktop (≥1280px)

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Display | 48 | 3rem | 48px (100%) | -3px |
| H1 | 80 | 5rem | 88px (110%) | -3px |
| H2 | 64 | 4rem | 73.6px (115%) | -3px |
| H3 | 48 | 3rem | 55.2px (115%) | -3px |
| H4 | 40 | 2.5rem | 46px (115%) | -2px |
| H5 | 32 | 2rem | 36.8px (115%) | -1.5px |
| H6 | 24 | 1.5rem | 32.4px (135%) | -0.75px |

### Headings — Tablet (768–1279px)

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Display | 40 | 2.5rem | 46px (115%) | -2px |
| H1 | 64 | 4rem | 70px (109%) | -3px |
| H2 | 52 | 3.25rem | 58px (112%) | -2.5px |
| H3 | 40 | 2.5rem | 46px (115%) | -2px |
| H4 | 34 | 2.125rem | 40px (118%) | -1.5px |
| H5 | 28 | 1.75rem | 34px (121%) | -1px |
| H6 | 22 | 1.375rem | 28px (127%) | -0.5px |

### Headings — Mobile (<768px)

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Display | 30 | 1.875rem | 36px (120%) | -1.5px |
| H1 | 44 | 2.75rem | 48px (109%) | -2px |
| H2 | 36 | 2.25rem | 42px (117%) | -2px |
| H3 | 30 | 1.875rem | 36px (120%) | -1.5px |
| H4 | 26 | 1.625rem | 32px (123%) | -1px |
| H5 | 22 | 1.375rem | 28px (127%) | -0.5px |
| H6 | 18 | 1.125rem | 24px (133%) | -0.25px |

### Body — Desktop

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Body XL | 24 | 1.5rem | 32.4px (135%) | -0.5px |
| Body L | 20 | 1.25rem | 28px (140%) | -0.5px |
| Body M | 16 | 1rem | 22.4px (140%) | -0.5px |
| Body S | 14 | 0.875rem | 19.6px (140%) | -0.5px |
| Body XS | 12 | 0.75rem | 18px (150%) | -0.5px |

### Body — Tablet

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Body XL | 22 | 1.375rem | 32px (145%) | -0.25px |
| Body L | 20 | 1.25rem | 28px (140%) | -0.5px |
| Body M | 16 | 1rem | 22.4px (140%) | -0.5px |
| Body S | 14 | 0.875rem | 19.6px (140%) | -0.5px |
| Body XS | 12 | 0.75rem | 18px (150%) | -0.5px |

### Body — Mobile

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Body XL | 20 | 1.25rem | 28px (140%) | -0.5px |
| Body L | 18 | 1.125rem | 26px (150%) | -0.25px |
| Body M | 16 | 1rem | 22.4px (140%) | -0.25px |
| Body S | 14 | 0.875rem | 19.6px (140%) | -0.25px |
| Body XS | 12 | 0.75rem | 18px (150%) | -0.25px |

### Boutons (identique sur tous les breakpoints)

| Token | px | rem | Line-height | Letter-spacing |
|-------|----|-----|-------------|----------------|
| Button Regular | 16 | 1rem | 22.4px (140%) | 0 |
| Button Small | 14 | 0.875rem | 19.6px (140%) | 0 |

> Règle : letter-spacing à `0` sur les boutons — pas de tracking artificiel sur du texte court interactif.

---

## Couleurs — Palette primitive

### Foundation

| Token | Hex | Usage |
|-------|-----|-------|
| Foundation/lightest | `#FFFFFF` | Fond light mode, texte heading/300 dark |
| Foundation/darkest | `#180A22` | Fond dark mode, texte heading/300 light |

### Neutral (alias : Grey)

| Token | Hex |
|-------|-----|
| Neutral/100 | `#F5F5F5` |
| Neutral/200 | `#E5E5E5` |
| Neutral/300 | `#D4D4D4` |
| Neutral/400 | `#A3A3A3` |
| Neutral/500 | `#737373` |
| Neutral/600 | `#525252` |
| Neutral/700 | `#404040` |
| Neutral/800 | `#262626` |

### Accent (alias : Purple)

> Couleur d'action principale — boutons, liens, borders actives, surfaces interactives.

| Token | Hex |
|-------|-----|
| Accent/100 | `#FFE2FA` |
| Accent/200 | `#FFC2F4` |
| Accent/300 | `#F285F0` |
| Accent/400 | `#BB64CF` |
| **Accent/500** | **`#803FAB`** — action par défaut |
| Accent/600 | `#6C2E94` — hover |
| Accent/700 | `#4A1F6C` |
| Accent/800 | `#3D155C` |

### Information (alias : Blue/Indigo)

| Token | Hex |
|-------|-----|
| Information/100 | `#DFDBFD` |
| Information/200 | `#BEB8FB` |
| Information/300 | `#9E94F8` |
| Information/400 | `#7E71F6` |
| **Information/500** | **`#5D4DF4`** |
| Information/600 | `#4B3EC3` |
| Information/700 | `#382E92` |
| Information/800 | `#251F62` |

### Success (alias : Green)

| Token | Hex |
|-------|-----|
| Success/100 | `#EAFEDC` |
| Success/200 | `#D5FDBA` |
| Success/300 | `#BFFB97` |
| Success/400 | `#AAFA75` |
| **Success/500** | **`#95F952`** — icône success dark |
| **Success/600** | **`#77C742`** — texte success |
| Success/700 | `#599531` |
| Success/800 | `#3C6421` |

### Warnings (alias : Orange)

| Token | Hex |
|-------|-----|
| Warnings/100 | `#FFE6CC` |
| Warnings/200 | `#FFCC99` |
| Warnings/300 | `#FFB266` |
| Warnings/400 | `#FF9933` |
| **Warnings/500** | **`#FF8000`** |
| Warnings/600 | `#CC6600` |
| Warnings/700 | `#994D00` |
| Warnings/800 | `#66560E` |

### Error (alias : Red)

| Token | Hex |
|-------|-----|
| Error/100 | `#FFD5DF` |
| Error/200 | `#FFABBF` |
| Error/300 | `#FF819E` |
| **Error/500** | **`#FF577E`** |
| Error/600 | `#FF2D5E` |
| Error/700 | `#CC244B` |
| Error/800 | `#991B38` |

---

## Couleurs sémantiques — résolues

### Dark Theme

#### Surface

| Token | Hex | Alias source |
|-------|-----|--------------|
| Surface/page background | `#180A22` | Foundation/darkest |
| Surface/Default | `#803FAB` | Accent/500 |
| Surface/action | `#BB64CF` | Accent/400 |
| Surface/action-hovered | `#6C2E94` | Accent/600 |
| Surface/Disabled | `#525252` | Neutral/600 |
| Surface/success | `#EAFEDC` | Success/100 |
| Surface/error | `#FFD5DF` | Error/100 |
| Surface/warning | `#FFE6CC` | Warnings/100 |
| Surface/information | `#DFDBFD` | Information/100 |

#### Text

| Token | Hex | Usage |
|-------|-----|-------|
| Text/Headings/100 | `#A3A3A3` | Tertiary heading |
| Text/Headings/200 | `#E5E5E5` | Secondary heading |
| Text/Headings/300 | `#FFFFFF` | Primary heading |
| Text/Body/100 | `#A3A3A3` | Body tertiary |
| Text/Body/200 | `#E5E5E5` | Body secondary |
| Text/Body/300 | `#FFFFFF` | Body primary |
| Text/Disabled | `#A3A3A3` | Neutral/400 |
| Text/action | `#FFC2F4` | Accent/200 — liens sur fond dark |
| Text/action-hovered | `#F285F0` | Accent/300 |
| Text/on-action | `#803FAB` | Accent/500 — texte sur surface action |
| Text/on-action-hovered | `#6C2E94` | Accent/600 |
| Text/success | `#77C742` | Success/600 |
| Text/error | `#FF577E` | Error/500 |
| Text/warning | `#FF8000` | Warnings/500 |
| Text/information | `#5D4DF4` | Information/500 |

#### Icon (Dark)

| Token | Hex |
|-------|-----|
| Icon/Default | `#FFFFFF` |
| Icon/Disabled | `#D4D4D4` |
| Icon/action | `#803FAB` |
| Icon/action-hovered | `#6C2E94` |
| Icon/on-action | `#FFFFFF` |
| Icon/on-action-hovered | `#FFE2FA` |
| Icon/success | `#95F952` |
| Icon/error | `#FF577E` |
| Icon/warning | `#FF8000` |
| Icon/information | `#5D4DF4` |

#### Borders (Dark)

| Token | Hex |
|-------|-----|
| Borders/Default | `#262626` |
| Borders/Disabled | `#525252` |
| Borders/action | `#803FAB` |
| Borders/action-hovered | `#6C2E94` |
| Borders/Focus | `#FFFFFF` |
| Borders/success | `#BFFB97` |
| Borders/error | `#FF819E` |
| Borders/warning | `#FFB266` |
| Borders/information | `#9E94F8` |

---

### Light Theme

#### Surface

| Token | Hex | Alias source |
|-------|-----|--------------|
| Surface/page background | `#FFFFFF` | Foundation/lightest |
| Surface/Default | `#803FAB` | Accent/500 |
| Surface/action | `#BB64CF` | Accent/400 |
| Surface/action-hovered | `#6C2E94` | Accent/600 |
| Surface/Disabled | `#E5E5E5` | Neutral/200 |
| Surface/success | `#EAFEDC` | Success/100 |
| Surface/error | `#FFD5DF` | Error/100 |
| Surface/warning | `#FFE6CC` | Warnings/100 |
| Surface/information | `#DFDBFD` | Information/100 |

#### Text (Light)

| Token | Hex | Usage |
|-------|-----|-------|
| Text/Headings/100 | `#A3A3A3` | Tertiary heading |
| Text/Headings/200 | `#525252` | Secondary heading |
| Text/Headings/300 | `#180A22` | Primary heading |
| Text/Body/100 | `#D4D4D4` | Body tertiary |
| Text/Body/200 | `#525252` | Body secondary |
| Text/Body/300 | `#180A22` | Body primary |
| Text/Disabled | `#A3A3A3` | |
| Text/action | `#F285F0` | Accent/300 — liens light mode |
| Text/action-hovered | `#803FAB` | Accent/500 |
| Text/on-action | `#803FAB` | Accent/500 |
| Text/on-action-hovered | `#6C2E94` | Accent/600 |
| Text/success | `#77C742` | |
| Text/error | `#FF577E` | |
| Text/warning | `#FF8000` | |
| Text/information | `#5D4DF4` | |

#### Icon (Light)

| Token | Hex |
|-------|-----|
| Icon/Default | `#180A22` |
| Icon/Disabled | `#D4D4D4` |
| Icon/action | `#803FAB` |
| Icon/action-hovered | `#6C2E94` |
| Icon/on-action | `#FFFFFF` |
| Icon/on-action-hovered | `#FFE2FA` |

#### Borders (Light)

| Token | Hex |
|-------|-----|
| Borders/Default | `#F5F5F5` |
| Borders/Disabled | `#D4D4D4` |
| Borders/action | `#803FAB` |
| Borders/action-hovered | `#6C2E94` |
| Borders/Focus | `#000000` |
| Borders/success | `#BFFB97` |
| Borders/error | `#FF7D7D` |
| Borders/warning | `#FFB266` |
| Borders/information | `#9E94F8` |

---

## Espacement (Technical/Spacing)

Identique sur Desktop, Tablet et Mobile.

| Token | Valeur | Usage |
|-------|--------|-------|
| XS | 6px | Micro-gaps, padding pills |
| S | 12px | Padding compact (badges, tags) |
| M | 16px | Padding standard |
| L | 24px | Gap entre composants |
| XL | 32px | Section interne |
| XXL | 50px | Sections majeures |
| 3XL | 100px | Grandes séparations |
| Padding 4XL | 150px | Padding de page (hero, sections) |

---

## Border Radius (Corners)

| Token | Valeur | Usage |
|-------|--------|-------|
| Corners S | 2px | Badges, chips compacts |
| Corners M | 6px | Boutons, inputs, tags |
| Corners L | 12px | Cards, modales |
| Corners XL | 16px | Panneaux larges, drawers |
| Corners Max | 99px | Pills, avatars, boutons pill |

---

## Strokes

| Token | Valeur | Usage |
|-------|--------|-------|
| Stroke XS | 0.25px | Séparateurs ultra-fins |
| Stroke S | 0.5px | Dividers |
| Stroke M | 1px | Bordures standard |
| Stroke L | 2px | Focus rings, emphasis |
| Stroke XL | 6px | Accents graphiques |

---

## Élévation (depuis hg.json)

### Light Mode

| Niveau | CSS `box-shadow` |
|--------|-----------------|
| 1 | `0 1px 3px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.30)` |
| 2 | `0 2px 6px 2px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.30)` |
| 3 | `0 1px 3px rgba(0,0,0,0.30), 0 4px 8px 3px rgba(0,0,0,0.15)` |
| 4 | `0 2px 3px rgba(0,0,0,0.30), 0 6px 10px 4px rgba(0,0,0,0.15)` |
| 5 | `0 4px 4px rgba(0,0,0,0.30), 0 8px 12px 6px rgba(0,0,0,0.15)` |

### Dark Mode

| Niveau | CSS `box-shadow` |
|--------|-----------------|
| 1 | `0 1px 2px rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15)` |
| 2 | `0 1px 2px rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15)` |
| 3 | `0 1px 3px rgba(0,0,0,0.30), 0 4px 8px 3px rgba(0,0,0,0.15)` |
| 4 | `0 2px 3px rgba(0,0,0,0.30), 0 6px 10px 4px rgba(0,0,0,0.15)` |
| 5 | `0 4px 4px rgba(0,0,0,0.30), 0 8px 12px 6px rgba(0,0,0,0.15)` |

### Inner Shadows

| Token | CSS |
|-------|-----|
| inner-shadow/xs | `inset 0 0 0 1px rgba(0,0,0,0.05)` |
| inner-shadow/sm | `inset 0 1px 3px 1px rgba(0,0,0,0.13)` |
| inner-shadow/md | `inset 0 3px 6px 1px rgba(0,0,0,0.20)` |

---

## Blur

| Token | Valeur | Usage |
|-------|--------|-------|
| blur/xs | 4px | Navbar sticky |
| blur/sm | 8.7px | Panel flottant |
| blur/md | 13.3px | Modale backdrop |
| blur/lg | 18px | Overlay fort |

---

## Breakpoints

| Token | Valeur |
|-------|--------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## Cheatsheet — tokens clés à mémoriser

| Besoin | Token | Valeur |
|--------|-------|--------|
| Fond page dark | Surface/page background | `#180A22` |
| Fond page light | Surface/page background | `#FFFFFF` |
| Bouton / action | Accent/500 | `#803FAB` |
| Hover bouton | Accent/600 | `#6C2E94` |
| Texte principal dark | Text/Headings/300 | `#FFFFFF` |
| Texte principal light | Text/Headings/300 | `#180A22` |
| Texte secondaire dark | Text/Body/200 | `#E5E5E5` |
| Texte secondaire light | Text/Body/200 | `#525252` |
| Bordure dark | Borders/Default | `#262626` |
| Bordure light | Borders/Default | `#F5F5F5` |
| Focus dark | Borders/Focus | `#FFFFFF` |
| Focus light | Borders/Focus | `#000000` |
| Success (icône) | Success/500 | `#95F952` |
| Error | Error/500 | `#FF577E` |
| Warning | Warnings/500 | `#FF8000` |
| Information | Information/500 | `#5D4DF4` |
