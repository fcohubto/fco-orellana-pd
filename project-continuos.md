# Contexto de Continuidad — fco-orellana-pd

> Archivo de estado para retomar trabajo entre sesiones. No es documentación — es contexto operativo.

---

## Estado actual del proyecto

**Repo:** `fcohubto/fco-orellana-pd` · GitHub Pages estático  
**Último commit:** `1671df5` — OLIVA OS: secciones visuales en los 3 capítulos (2026-06-12)  
**Stack:** HTML + CSS vanilla + JS mínimo. Sin build, sin npm, sin framework.

**UNSTAGED (pendiente de commit):**
- `html/estimate.html` — secciones visuales en los 4 capítulos
- `css/estimate.css` — pricing-system, hh-table, ai-validation + todos los fixes
- `html/fletes.html` — stat-row, catalog-grid, phone-mockup CSS (replace imagen rota)
- `css/fletes.css` — catalog-grid + fixes
- `css/caso.css` — fix `.chapter-step` font-size (0.72rem → var(--text-sm))
- `css/oliva.css` — fix font-sizes (0.68rem → var(--text-sm)) + breakpoint 480px

---

## Casos de estudio activos (orden canónico)

| # | Archivo | Caso | CSS propio | Secciones visuales |
|---|---|---|---|---|
| 1 | `html/restaurante.html` | División de cuentas (Multicaja) | `restaurante.css` | No (pendiente) |
| 2 | `html/ecosistemas.html` | Ecosistema de pagos fintech (3.240 pantallas) | `ecosistemas.css` | No (pendiente) |
| 3 | `html/fletes.html` | FleteApp — PWA cotizador transportistas | `fletes.css` | ✓ unstaged |
| 4 | `html/estimate.html` | Wizard cotizador de proyectos Olivacraft | `estimate.css` | ✓ unstaged |
| 5 | `html/oliva.html` | OLIVA OS — Framework de Ejecución con IA | `oliva.css` | ✓ commit 1671df5 |
| — | `html/olivacraft.html` | Versión anterior de oliva, mantener mientras | — | — |

---

## Arquitectura CSS

```
base.css → caso.css → [caso].css
```

- **`base.css`** — tokens globales, reset, navbar, btn, tag, footer, stat-row, case-nav
- **`caso.css`** — capa compartida: progress bar, hero, metric-card, hypo-item, impact-dashboard, chapter-reveal
- **`[caso].css`** — solo lo genuinamente único por caso

---

## Secciones visuales agregadas (sesión 2026-06-12)

### oliva.html — commit 1671df5
- **Cap 1:** `.arch-stack` — diagrama 3 capas (Skills → Framework → Olivacraft). Grid `52px 1fr auto`. Mobile 640px: 2 col.
- **Cap 2:** `.prompt-depth` — barras proporcionales R/C/P (6/11/16 prompts). Grid `140px 1fr 48px`. Mobile 640px: `110px`. Mobile 480px: `90px`.
- **Cap 3:** `.process-header` + `.docs-grid` — 9 documentos en grid 3→2→1 col (768px/480px).

### estimate.html — UNSTAGED
- **Cap 1:** stat-row — 4 métricas de research (8 propuestas / 2h45m / 40% variación / 3 formatos)
- **Cap 2:** `.pricing-system` — grid 5 col con tipo-cliente × complejidad = precio. Colapsa a 2-col (900px) → 1-col (640px).
- **Cap 3:** `.process-header` + `.hh-table` — tabla HH mercado vs HH OLIVA. 1fr 100px 100px 72px. En 640px: 64px. En 480px: oculta col HH Mercado, queda 1fr 52px 48px.
- **Cap 4:** `.ai-validation` — flujo de 3 pasos (Input → Validación Claude → Output). Left-border timeline, grid 40px 1fr.

### fletes.html — UNSTAGED
- **Cap 1:** stat-row — 3 métricas research (3 transportistas / 0 usaban digital / +1h por cotización)
- **Cap 2:** `.process-header` + `.catalog-grid` — 7 categorías con artículos y rangos m³. Grid 4→2→1 col (900px/480px).
- **Cap 3:** Imagen rota `../media/fletes-light.png` → reemplazada por `.phone-mockup` CSS-only. Usa componentes existentes en fletes.css (`.phone-mockup`, `.ph-*`). Muestra cotización completa con 6 categorías seleccionables.

---

## CSS Audit — fixes aplicados (2026-06-12)

### Violaciones de mínimo 14px (0.68rem → var(--text-sm))
| Archivo | Selector | Fix |
|---|---|---|
| `caso.css` | `.chapter-step` | `var(--text-xs)` → `var(--text-sm)` |
| `estimate.css` | `.wizard-output-header` | `var(--text-xs)` → `var(--text-sm)` |
| `oliva.css` | `.arch-connector`, `.depth-caption`, `.doc-cat` | `0.68rem` → `var(--text-sm)` |
| `estimate.css` | `.pricing-block-label`, `.hh-head span`, `.hh-cat .hh-service`, `.aiv-connector` | `0.68rem` → `var(--text-sm)` |
| `fletes.css` | `.catalog-range` | `0.68rem` → `var(--text-sm)` |

### Breakpoints faltantes en componentes nuevos
| Archivo | Componente | Fix |
|---|---|---|
| `oliva.css` | `.depth-row` | Agregado `@media (max-width: 480px)` → `90px 1fr 32px` |
| `estimate.css` | `.pricing-system` | Agregado `@media (max-width: 640px)` → `grid-template-columns: 1fr` |
| `estimate.css` | `.hh-row` | Agregado `@media (max-width: 480px)` → `1fr 52px 48px` + `display: none` en `.hh-market` |

### Nota — phone mockup (fletes.css)
Los textos dentro de `.phone-mockup` (`.ph-label`, `.ph-row-label/value`, `.ph-cat`, `.ph-btn`) usan `var(--text-2xs)` y `0.7rem`. Son CSS ornamentales que representan una pantalla de teléfono — contexto de ilustración, no UI navegable. Se mantienen como están.

---

## PRÓXIMO PASO

1. **Commit todo el unstaged** (estimate + fletes + CSS fixes) como un commit atómico
2. **Validar mobile** en Chrome DevTools (breakpoints 480px, 640px, 900px para los casos nuevos)
3. **restaurante.html y ecosistemas.html** — secciones visuales pendientes (mismo patrón que los otros 3)
4. **CV PDF** — `media/cv-francisco-orellana.pdf` no existe (enlace muerto en index)

---

## Sistemas base implementados (sesiones anteriores)

### Reading progress bar (`caso.css` + `main.js`)
Barra cyan 3px sticky debajo del navbar. IIFE con scroll listener.

### Case-nav macro (`base.css` + HTML de cada caso)
`← Caso X de 5 →`. Mobile ≤640px: solo flechas + contador.

### Chapter gate animation (`caso.css` + `main.js`)
`section[id^="cap"]` con opacity 0 → visible al scroll. IntersectionObserver.

---

## Componentes canónicos

### `.metric-card` (outline, en caso.css)
```css
background: transparent;
border: 1px solid var(--c-border-mid);
border-top: 2px solid var(--c-cyan);
```

### `.hypo-item` (left-border, en caso.css)
```css
padding: 24px 0 24px 24px;
background: transparent;
border-left: 2px solid var(--c-border-mid);
```

### `.impact-label` + `.impact-dashboard-grid`
Siempre: `.impact-label` + `h4` + `p`. Nunca `.eyebrow`, nunca `strong`.

### Secciones visuales — patrones nuevos (sesión 2026-06-12)
- `.arch-stack` / `.ai-validation` — left-border 2px timeline. Grid num + body + stat.
- `.prompt-depth` — barra proporcional: grid `label 1fr count`. `.depth-fill` absoluto sobre `.depth-bar`.
- `.pricing-system` — grid multi-col con operadores visuales (`×` / `=`).
- `.hh-table` — tabla de datos densa, colapsa a 3 columnas en 480px ocultando columna central.
- `.catalog-grid` / `.docs-grid` — grids que colapsan 4→2→1 o 3→2→1.

---

## Historial de commits clave

| Commit | Cambio |
|---|---|
| `1671df5` | OLIVA OS: arch-stack, prompt-depth, docs-grid |
| `11141a6` | Stat-row + metric-card outline estandarizado |
| `49e8db0` | restaurante.css fixes post-auditoría |
| `b16bc29` | Chapter gate animation + OLIVA OS rewrite + mobile fix |
| `6639b69` | Reading progress bar + case-nav macro (← Caso X de 5 →) |

---

## Cómo retomar

1. Leer `project-continuos.md` (este archivo) — NO el memory de OLIVA OS
2. Leer `CLAUDE.md` para tokens, arquitectura y reglas
3. El Live Server de VS Code sirve los HTML directamente (sin build)
4. Skills en `C:\Users\orell\OneDrive\Olivacraft\Claude Skills\`
