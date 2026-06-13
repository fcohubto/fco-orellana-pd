# Contexto de Continuidad — fco-orellana-pd

> Archivo de estado para retomar trabajo entre sesiones. No es documentación — es contexto operativo.

---

## Estado actual del proyecto

**Repo:** `fcohubto/fco-orellana-pd` · GitHub Pages estático  
**Último commit:** `a5d2c4e` — secciones visuales en restaurante + ecosistemas (2026-06-12)  
**Stack:** HTML + CSS vanilla + JS mínimo. Sin build, sin npm, sin framework.

---

## Casos de estudio activos (orden canónico)

| # | Archivo | Caso | CSS propio | Secciones visuales |
|---|---|---|---|---|
| 1 | `html/restaurante.html` | División de cuentas (Multicaja) | `restaurante.css` | ✓ commit a5d2c4e |
| 2 | `html/ecosistemas.html` | Ecosistema de pagos fintech (3.240 pantallas) | `ecosistemas.css` | ✓ commit a5d2c4e |
| 3 | `html/fletes.html` | FleteApp — PWA cotizador transportistas | `fletes.css` | ✓ commit 9a75377 |
| 4 | `html/estimate.html` | Wizard cotizador de proyectos Olivacraft | `estimate.css` | ✓ commit 9a75377 |
| 5 | `html/oliva.html` | OLIVA OS — Framework de Ejecución con IA | `oliva.css` | ✓ commit 1671df5 |
| — | `html/olivacraft.html` | Versión anterior de oliva, mantener mientras | — | — |

---

## PRÓXIMO PASO — Auditoría de diseño y contenido

Auditoría completa realizada en sesión 2026-06-12. Se identificaron **11 problemas** ordenados por severidad. Corregir en este orden:

### CRÍTICOS (3) — atacar primero

**#1 · Métricas FleteApp contradictorias** · `index.html` + `html/fletes.html`
- `index.html` dice `"1h → 5min"` en el card
- `fletes.html` dice `"presupuesto compartible en cinco minutos"` (subtítulo)
- `fletes.html` dice `"De 3 horas a 12 minutos"` (sección discovery)
- Decisión: elegir UNA métrica y unificarla en los 3 lugares

**#2 · Color `#059669` hardcodeado fuera de paleta** · `css/fletes.css`
- `.phase--done .phase-dot { background: #059669 }` — verde no declarado en tokens de `base.css`
- Fix: o agregar token `--c-success: #059669` en `base.css` y referenciar, o reemplazar con accent

**#3 · Font-size `28px` sin token** · `css/fletes.css`, `css/estimate.css`, `css/oliva.css`
- `.card-icon { font-size: 28px }` en los 3 archivos
- `estimate.css`: `.wo-line-accent { font-size: 1.75rem }` fuera de escala de tokens
- Fix: crear token `--text-icon: 1.75rem` en `base.css` o usar `--text-xl` si existe; reemplazar en los 3

### MEDIOS (5)

**#4 · `.hypo-item` redefinido en cada CSS de caso** · `css/fletes.css`, `css/estimate.css`, `css/restaurante.css`
- El componente se duplica con `padding: 32px`, `background: var(--surface)`, `border: 1px solid var(--line)` en cada archivo
- Fix: centralizar en `caso.css` y eliminar duplicados en los 3 archivos de caso

**#5 · Espaciado hardcodeado sin `--sp-*` en caso.css** · `css/caso.css`
- `gap: 40px`, `padding: 60px 0`, `gap: 32px`, `gap: 24px`, `padding: 32px`
- Fix: reemplazar todos con tokens `--sp-10`, `--sp-16`, `--sp-8`, `--sp-6`, `--sp-8` respectivamente

**#6 · `.metric-card` vs `.stat-card` — mismo patrón, dos sistemas** · `css/ecosistemas.css`
- `ecosistemas.css` sobreescribe `.metric-card` con neumorfismo; los demás casos usan `.stat-card`
- Es un override intencional en ecosistemas, pero conviene documentarlo en CLAUDE.md

**#7 · `.eyebrow` vs `.stage-tag` sin criterio** · `html/restaurante.html`
- Cap 1 usa `.eyebrow`, Cap 2 cambia a `.stage-tag`, Cap 3 y 4 vuelven a `.stage-tag`
- Los demás casos usan `.eyebrow` de forma consistente
- Fix: normalizar restaurante a un solo patrón (`.stage-tag` es el estándar de los capítulos)

**#8 · Salto de jerarquía `h3 → h2` en restaurante** · `html/restaurante.html`
- Sección "Métricas del proyecto" usa `<h3>`, siguiente sección sube a `<h2>`
- Fix: revisar la jerarquía de headings y corregir el h2 que debería ser h3

### MENORES (3)

**#9 · Light mode faltante en componentes nuevos** · `css/oliva.css`, `css/estimate.css`, `css/fletes.css`
- `.arch-stack`, `.pricing-system`, `.hh-table`, `.catalog-grid`, `.pos-constraint` usan `var(--line-separator)`, `var(--surface-2)` que cambian en light mode pero no se validaron
- Fix: probar en light mode en DevTools y agregar overrides si hay problemas de contraste

**#10 · NPS sin baseline de mejora en hero de restaurante** · `html/restaurante.html`
- Metric-card dice `"NPS 9"` pero no menciona el baseline (NPS 4)
- `index.html` sí lo muestra como `"NPS 4→9"` — inconsistencia narrativa
- Fix: cambiar a `"NPS 4→9"` o agregar `"Desde NPS 4"` en metric-description

**#11 · `<title>` con formatos distintos** · `index.html`
- `index.html`: `"Francisco Orellana | Product Designer"`
- Casos: `"[Proyecto] | fcoux.pd"`
- Fix: decidir un formato y unificarlo (sugerido: `"Francisco Orellana — fcoux.pd"` en index)

---

## Arquitectura CSS

```
base.css → caso.css → [caso].css
```

- **`base.css`** — tokens globales, reset, navbar, btn, tag, footer, stat-row, case-nav
- **`caso.css`** — capa compartida: progress bar, hero, metric-card, hypo-item, impact-dashboard, chapter-reveal
- **`[caso].css`** — solo lo genuinamente único por caso

---

## Secciones visuales por caso (estado final)

### restaurante.html — commit a5d2c4e
- **Cap 1:** stat-row research (5 entrevistas / 5 comercios / 4 perfiles / 15 min bottleneck)
- **Cap 3:** `.pos-constraint` + `.pos-terminal` — mockup CSS Verifone 675: 6 líneas, 21 chars, fondo negro

### ecosistemas.html — commit a5d2c4e
- **Cap 1:** stat-row auditoría (400K+ terminales / 2M+ ops/día / 70%+ mercado / 24+ flujos)
- **Cap 4:** stat-row entrega (144 flujos / 3.240 pantallas / 11 etapas / 12 meses)

### estimate.html — commit 9a75377
- **Cap 1:** stat-row research (8 propuestas / 2h45m / 40% variación / 3 formatos)
- **Cap 2:** `.pricing-system` — grid 5 col tipo-cliente × complejidad → precio
- **Cap 3:** `.hh-table` — HH mercado vs HH OLIVA. Colapsa a 3 col en 480px
- **Cap 4:** `.ai-validation` — timeline 3 pasos

### fletes.html — commit 9a75377
- **Cap 1:** stat-row research (3 transportistas / 0 digital / +1h por cotización)
- **Cap 2:** `.catalog-grid` — 7 categorías, grid 4→2→1 col
- **Cap 3:** `.phone-mockup` CSS-only (reemplaza imagen rota)

### oliva.html — commit 1671df5
- **Cap 1:** `.arch-stack` — 3 capas, timeline left-border
- **Cap 2:** `.prompt-depth` — barras proporcionales R/C/P
- **Cap 3:** `.docs-grid` — 9 documentos, grid 3→2→1 col

---

## CSS Audit — fixes aplicados (commit 9a75377)

Violaciones de mínimo 14px corregidas: `.chapter-step`, `.wizard-output-header`, `.arch-connector`, `.depth-caption`, `.doc-cat`, `.pricing-block-label`, `.hh-head span`, `.hh-cat .hh-service`, `.aiv-connector`, `.catalog-range` → todos a `var(--text-sm)`.

Breakpoints agregados: `.depth-row` 480px, `.pricing-system` 640px→1col, `.hh-row` 480px oculta `.hh-market`.

---

## Componentes canónicos

### `.metric-card` (outline, en caso.css)
```css
background: transparent;
border: 1px solid var(--c-border-mid);
border-top: 2px solid var(--c-cyan);
```
⚠️ `ecosistemas.css` sobreescribe con neumorfismo — override intencional de ese caso.

### `.hypo-item` (left-border, en caso.css)
```css
padding: 24px 0 24px 24px;
background: transparent;
border-left: 2px solid var(--c-border-mid);
```
⚠️ `fletes.css`, `estimate.css`, `restaurante.css` lo redefinen con padding: 32px y border full — pendiente de centralizar (#4).

### `.impact-label` + `.impact-dashboard-grid`
Siempre: `.impact-label` + `h4` + `p`. Nunca `.eyebrow`, nunca `strong`.

### Patrones visuales nuevos (sesiones 2026-06-12)
- `.arch-stack` / `.ai-validation` — left-border 2px timeline. Grid num + body + stat.
- `.prompt-depth` — barra proporcional: grid `label 1fr count`. `.depth-fill` absoluto sobre `.depth-bar`.
- `.pricing-system` — grid multi-col con operadores visuales (`×` / `=`).
- `.hh-table` — tabla densa, colapsa a 3 col en 480px ocultando columna central.
- `.catalog-grid` / `.docs-grid` — grids 4→2→1 o 3→2→1.
- `.pos-terminal` / `.pos-screen` / `.pos-line` — mockup terminal monocromático en restaurante.

---

## Historial de commits clave

| Commit | Cambio |
|---|---|
| `a5d2c4e` | secciones visuales restaurante + ecosistemas |
| `9a75377` | secciones visuales estimate + fletes + audit CSS mobile |
| `1671df5` | OLIVA OS: arch-stack, prompt-depth, docs-grid |
| `11141a6` | Stat-row + metric-card outline estandarizado |
| `49e8db0` | restaurante.css fixes post-auditoría |

---

## Pendientes conocidos

- [ ] **11 fixes de auditoría** — listados arriba, ordenados por severidad
- [ ] **Light mode** — validar componentes nuevos en DevTools
- [ ] **CV PDF** — `media/cv-francisco-orellana.pdf` no existe (enlace muerto en index)

---

## Cómo retomar

1. Leer `project-continuos.md` (este archivo) — NO el memory de OLIVA OS
2. Leer `CLAUDE.md` para tokens, arquitectura y reglas
3. El Live Server de VS Code sirve los HTML directamente (sin build)
4. Skills en `C:\Users\orell\OneDrive\Olivacraft\Claude Skills\`
