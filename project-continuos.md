# Contexto de Continuidad — fco-orellana-pd

> Archivo de estado para retomar trabajo entre sesiones. No es documentación — es contexto operativo.

---

## Estado actual del proyecto

**Repo:** `fcohubto/fco-orellana-pd` · GitHub Pages estático  
**Último commit:** `514647d` — audit fixes: 11 design & content issues resolved (2026-06-13)  
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

## PRÓXIMO PASO — sin deuda conocida

Auditoría de diseño completada (2026-06-12/13). Los 11 problemas detectados están corregidos en commit `514647d`.

**Pendientes menores conocidos:**
- [ ] **CV PDF** — `media/cv-francisco-orellana.pdf` no existe (enlace muerto en index)
- [ ] **olivacraft.html** — versión legacy; decidir si se elimina o se actualiza al sistema actual

---

## Fixes aplicados — auditoría 2026-06-12/13 (commit 514647d)

| # | Severidad | Fix | Archivos |
|---|---|---|---|
| 1 | CRÍTICO | Métrica FleteApp unificada → "1h → 5min" en todo | index.html |
| 2 | CRÍTICO | `#059669` y `rgba(5,150,105,...)` → tokens `--c-success*` | base.css, fletes/restaurante/ecosistemas.css |
| 3 | CRÍTICO | `28px`/`1.75rem` hardcodeados → `var(--text-icon: 1.75rem)` | base.css, caso/estimate/fletes/oliva/index.css |
| 4 | MEDIO | `.hypo-item--card` centralizado en caso.css; duplicados eliminados | caso.css, fletes/estimate.css, fletes/estimate.html |
| 5 | MEDIO | `gap/padding px` hardcodeados en caso.css → `--sp-*` | caso.css |
| 6 | MEDIO | Coexistencia `.metric-card`/`.stat-card` documentada en CLAUDE.md | CLAUDE.md |
| 7 | MEDIO | `.stage-tag` consistente para ETAPA 01 y 04 en restaurante | restaurante.html |
| 8 | MEDIO | `<h3>Objetivos</h3>` → `<h2>` para eliminar salto h3→h2 | restaurante.html |
| 9 | MENOR | Light mode: `.pos-screen` preservado oscuro explícitamente | restaurante.css |
| 10 | MENOR | NPS hero restaurante: "NPS 9" → "NPS 4→9" | restaurante.html |
| 11 | MENOR | `<title>` index.html → "Francisco Orellana — fcoux.pd" | index.html |

---

## Arquitectura CSS

```
base.css → caso.css → [caso].css
```

- **`base.css`** — tokens globales, reset, navbar, btn, tag, footer, stat-row, case-nav
- **`caso.css`** — capa compartida: progress bar, hero, metric-card, hypo-item, impact-dashboard, chapter-reveal
- **`[caso].css`** — solo lo genuinamente único por caso

---

## Tokens clave (últimos agregados)

```css
--text-icon: 1.75rem;          /* iconos y números display grandes */
--c-success:        #059669;
--c-success-bg:     rgba(5, 150, 105, 0.12);
--c-success-border: rgba(5, 150, 105, 0.20);
```

---

## Componentes canónicos

### `.metric-card` (outline, en caso.css)
```css
background: transparent;
border: 1px solid var(--c-border-mid);
border-top: 2px solid var(--c-cyan);
padding: var(--sp-8);
```
⚠️ `ecosistemas.css` sobreescribe con neumorfismo — override intencional (documentado en CLAUDE.md).

### `.hypo-item` (left-border, en caso.css)
```css
padding: 24px 0 24px 24px;
background: transparent;
border-left: 2px solid var(--c-border-mid);
```
**Modifier `.hypo-item--card`** (en caso.css): versión rellena con surface + border full + border-radius.  
Usar en fletes.html y estimate.html (ya aplicado). Restaurante usa `.section-wrapper .hypo-item` con override propio.

### `.impact-label` + `.impact-dashboard-grid`
Siempre: `.impact-label` + `h4` + `p`. Nunca `.eyebrow`, nunca `strong`.

### Convención de labels de capítulo
`.stage-tag` para "ETAPA XX: ..." en todos los casos (restaurante normalizado en commit 514647d).  
`.eyebrow` para sub-labels dentro del capítulo (Ficha de Campo, Constraint visual, etc.).

### Patrones visuales por caso

| Caso | Componentes propios |
|---|---|
| restaurante | `.pos-constraint` / `.pos-terminal` — mockup terminal Verifone 675 (intencionalmente oscuro) |
| ecosistemas | `.stat-card` (neumorfismo frost) / `.metric-card` (override neumórfico) |
| fletes | `.catalog-grid`, `.phone-mockup`, `.stack-tag`, `.phase-tracker` |
| estimate | `.pricing-system`, `.hh-table`, `.ai-validation`, `.wizard-flow` |
| oliva | `.arch-stack`, `.prompt-depth`, `.docs-grid` |

---

## Historial de commits clave

| Commit | Cambio |
|---|---|
| `514647d` | audit fixes: 11 issues — tokens, hypo-item, spacing, restaurante hierarchy |
| `a5d2c4e` | secciones visuales restaurante + ecosistemas |
| `9a75377` | secciones visuales estimate + fletes + audit CSS mobile |
| `1671df5` | OLIVA OS: arch-stack, prompt-depth, docs-grid |
| `11141a6` | Stat-row + metric-card outline estandarizado |

---

## Cómo retomar

1. Leer `project-continuos.md` (este archivo) — NO el memory de OLIVA OS
2. Leer `CLAUDE.md` para tokens, arquitectura y reglas
3. El Live Server de VS Code sirve los HTML directamente (sin build)
4. Skills en `C:\Users\orell\OneDrive\Olivacraft\Claude Skills\`
