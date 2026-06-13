# CLAUDE.md — Reglas del ecosistema Olivacraft / fcoux

## Stack y entorno

- **Tecnología**: HTML estático + CSS vanilla + JS mínimo. Sin build system, sin npm, sin bundler.
- **Deploy**: GitHub Pages (estático). Sin servidor, sin SSR.
- **No hay**: React, Vue, Angular, Sass, Tailwind, PostCSS, ni ningún framework JS/CSS.
- **JS scope**: Solo pequeños scripts inline — theme toggle (localStorage + `data-theme`), hamburger menu, IntersectionObserver para scroll reveal. Nada más.

---

## Proyectos activos

| Directorio | Descripción | Acento |
|---|---|---|
| `fco-orellana-pd/` | Portafolio Francisco Orellana PD · Dark/Light mode | Cyan `#3EC6D4` |
| `olivacraft2.0/` | Sitio Olivacraft estudio boutique | Cyan `#3EC6D4` |
| `olivacraftos/` | Hub OS con documentos de cliente | Varía por producto |
| `fletes-app/` | PWA cotizador de fletes · neumorfismo dark | Naranja `#f26419` |

---

## Sistema de tokens CSS (olivacraft2.0 / fco-orellana-pd)

Todos los valores van en CSS Custom Properties en `:root`. **Nunca valores hardcoded** fuera de los tokens.

### Colores

```css
/* Fondos */
--c-night:      #09090B;   /* bg base */
--c-frost:      #0E0E11;   /* elevación leve */
--c-surface:    #141417;   /* cards, inputs */

/* Acento */
--c-cyan:       #3EC6D4;
--c-cyan-dark:  #2ba8b4;   /* hover */

/* Texto sobre oscuro */
--c-ink:        rgba(255,255,255,0.90);
--c-ink-soft:   rgba(255,255,255,0.60);
--c-ink-muted:  rgba(255,255,255,0.38);
--c-ink-faint:  rgba(255,255,255,0.22);

/* Bordes */
--c-border:     rgba(255,255,255,0.07);
--c-border-mid: rgba(255,255,255,0.13);
```

### Light mode

Sobreescritura via selector `html[data-theme="light"]`. Cambia fondos (blanco cálido editorial `#F8F6F2`) y tinta (oscura). El cyan se reemplaza por `#1788A0` (contraste suficiente sobre blanco). El toggle persiste en `localStorage`.

### Tipografía

```css
--font:         'Plus Jakarta Sans', system-ui, sans-serif;  /* cuerpo */
--font-display: 'Fraunces', Georgia, serif;                  /* h1, números grandes, featured */
```

**Escala** (usar siempre estas variables, no valores ad-hoc):

```
--text-2xs:  0.68rem  (~11px) — solo A4/PDF, nunca en pantalla
--text-xs:   0.72rem  (~12px) — solo A4/PDF o labels de apoyo impresos
--text-sm:   0.875rem  (14px) — mínimo absoluto en UI de pantalla
--text-base: 1rem      (16px)
--text-md:   1.1rem
--text-lg:   1.15rem
--text-xl:   1.2rem
--text-h2:   clamp(1.5rem, 3vw, 2.25rem)
--text-h1:   clamp(2.75rem, 7vw, 5rem)
```

**Pesos**: `--fw-light: 300` / `--fw-regular: 400` / `--fw-medium: 500` / `--fw-semibold: 600` / `--fw-bold: 700` / `--fw-black: 800`

**Line-height**: `--lh-none` / `--lh-tight:1.05` / `--lh-snug:1.15` / `--lh-normal:1.35` / `--lh-relaxed:1.65` / `--lh-body:1.75`

**Letter-spacing**: `--ls-tight:-0.04em` / `--ls-normal:-0.02em` / `--ls-wide:0.06em` / `--ls-label:0.14em`

### Espaciado (base 4px)

```
--sp-1: 0.25rem  (4px)     --sp-8:  2rem   (32px)
--sp-2: 0.5rem   (8px)     --sp-10: 2.5rem (40px)
--sp-3: 0.75rem  (12px)    --sp-12: 3rem   (48px)
--sp-4: 1rem     (16px)    --sp-14: 3.5rem (56px)
--sp-5: 1.25rem  (20px)    --sp-16: 4rem   (64px)
--sp-6: 1.5rem   (24px)    --sp-20: 5rem   (80px)
                            --sp-24: 6rem   (96px)
                            --sp-28: 7rem   (112px)
                            --sp-32: 8rem   (128px)
```

### Radios, transiciones, sombras

```css
--radius-xs:   4px;     --ease:      0.15s ease;
--radius-sm:   8px;     --ease-base: 0.2s ease;
--radius:      12px;
--radius-full: 9999px;

--shadow-btn:          0 4px 20px rgba(62, 198, 212, 0.25);
--shadow-card:         0 1px 2px … / 0 4px 12px … / 0 12px 32px …;
--shadow-card-premium: con inset top highlight;
--shadow-focus:        0 0 0 3px rgba(62, 198, 212, 0.18);
```

### Layout

```css
--max-w:  1100px;
--nav-h:  64px;
```

---

## Arquitectura CSS

```
css/
  base.css          ← tokens + reset + componentes compartidos (navbar, btn, tag, footer, scroll-reveal)
  index.css         ← estilos específicos de home
  caso.css          ← caso de estudio (olivacraft2.0)
  [página].css      ← estilos específicos de cada vista
```

**Regla**: cada `[página].html` linkea `base.css` primero, luego su CSS específico. Los tokens de `base.css` están disponibles globalmente. Los archivos CSS de página no repiten tokens.

Los tokens de alias (`--accent`, `--bg`, `--surface`, etc.) en `oliva.css` y similares son puentes que mapean los tokens base a nombres semánticos locales — usarlos solo dentro de ese archivo.

**Dos sistemas de tarjeta de métricas** — coexisten intencionalmente:
- `.metric-card` en `caso.css`: outline transparente + borde superior cyan. Default en fletes, estimate, oliva, restaurante (hero).
- `.metric-card` en `ecosistemas.css`: **override neumórfico** para ese caso. Si editas ecosistemas, las metric-cards usan esta versión, no la de caso.css.
- `.stat-card` en `ecosistemas.css` y `restaurante.css`: variante neumórfica con `::before` decorativo. No mezclar con `.metric-card`.

---

## Componentes compartidos (`base.css`)

| Componente | Clases clave |
|---|---|
| Layout | `.container` — max-width 1100px, padding inline `--sp-6` |
| Navbar | `.navbar`, `.nav-content`, `.logo`, `.desktop-nav` |
| Menú móvil | `.menu-toggle`, `.mobile-menu`, `.is-open` |
| Botones | `.btn.btn-primary` (cyan fill + slide), `.btn.btn-outline` (ghost) |
| Tags | `.tag.tag-primary` (cyan border), `.tag.tag-secondary` (muted) |
| Footer | `footer` — border-top + texto centrado muted |
| Theme toggle | `.theme-toggle`, `.icon-sun`, `.icon-moon` |
| Breadcrumb | `.breadcrumb-nav`, `.breadcrumb-list` |
| Scroll reveal | `[data-animate]` → `.visible` (IntersectionObserver) |

---

## Sistema de iconos

- **Formato**: SVG inline siempre. Sin icon font (Font Awesome, etc.), sin sprite external.
- **Estilo**: Lucide-compatible — stroke, `stroke-width="2"`, `stroke-linecap="round"`.
- **Tamaño típico**: 18–24px, `viewBox="0 0 24 24"`, `aria-hidden="true"` en decorativos.
- **Naming**: no hay sistema de naming — los SVGs van directamente en el HTML.
- **PWA icons**: `icon-192.png` y `icon-512.png` en `/icons/` (solo para el manifest).

---

## Gestión de assets

- **Imágenes**: preferir `.webp` (mejor compresión). `.png` solo para iconos PWA o cuando haya transparencia necesaria.
- **Rutas**: relativas (`assets/`, `media/`). Sin CDN de imágenes externo.
- **No hay lazy loading automático**: usar `loading="lazy"` en `<img>` debajo del fold.
- **Aspect ratio**: declarar `width` y `height` en el elemento para evitar CLS.

---

## Responsive

Breakpoints usados en el sistema:

| Breakpoint | Valor | Uso |
|---|---|---|
| Tablet | `max-width: 900px` | Colapso de grid de project cards |
| Mobile | `max-width: 768px` | Hamburger, stack vertical, padding reducido |
| Small | `max-width: 480px` | H1 más pequeño |

---

## Animaciones

```css
/* En base.css — patrón estándar */
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
}
[data-animate].visible { opacity: 1; transform: none; }
```

JS activa `.visible` via `IntersectionObserver`. Siempre incluir `prefers-reduced-motion: reduce` que deshabilita todas las animaciones.

---

## Accesibilidad (baseline AA)

- `:focus-visible` con `outline: 2px solid var(--c-cyan)` — nunca eliminar sin reemplazo.
- Roles ARIA en navbar: `aria-label`, `aria-expanded`, `aria-current="page"`.
- Imágenes decorativas: `aria-hidden="true"`. Íconos decorativos también.
- Contraste mínimo en light mode: cyan cambia a `#1788A0` para cumplir 3:1 sobre blanco.

---

## Anti-patrones prohibidos

Los siguientes patrones están explícitamente prohibidos en todos los entregables del ecosistema Olivacraft:

1. **KPI icon badges / pills** — no usar iconos decorativos dentro de pastillas coloreadas para métricas.
2. **Sistema de 4 colores** — paleta máximo 2 colores funcionales + escala de grises/tinta.
3. **Sidebar tinted active** — no usar fondo de color en el ítem activo de navegación lateral.
4. **Texto menor a 14px en pantalla** — `--text-xs` y `--text-2xs` son exclusivos de contextos A4/PDF.
5. **Valores hardcoded fuera de tokens** — si necesitas un valor nuevo, agrégalo como token.

---

## Workflow por proyecto

- **Un archivo por tarea** — no leer archivos no relacionados con la tarea.
- **Commit atómico** — un commit por cambio lógico, mensaje descriptivo.
- **Push a `origin master`** siempre al terminar.
- **No crear archivos `.md` de documentación** a menos que el usuario lo pida explícitamente.

---

## Figma / MCP integration

Para integrar diseños de Figma a este codebase:

- Los tokens de Figma deben mapearse a las Custom Properties existentes (`--c-cyan`, `--sp-*`, etc.).
- No crear nuevas variables si ya existe un token equivalente.
- Componentes de Figma → HTML semántico con clases BEM-lite (`.component`, `.component__element`, `.component--modifier`).
- Fuentes: `Plus Jakarta Sans` y `Fraunces` ya están cargadas via Google Fonts en todos los proyectos del ecosistema. No agregar nuevas fuentes sin consenso.
- Assets exportados de Figma: exportar en `.webp` cuando sea posible, `@2x` para retina.
- El sistema de colores de Figma debe usar exactamente los mismos hex que los tokens (ver tabla de colores arriba).
