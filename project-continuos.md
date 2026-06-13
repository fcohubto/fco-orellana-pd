# Contexto de Continuidad — fco-orellana-pd

> Archivo de estado para retomar trabajo entre sesiones. No es documentación — es contexto operativo.

---

## Estado actual del proyecto

**Repo:** `fcohubto/fco-orellana-pd` · GitHub Pages estático  
**Último commit:** `6639b69` — Reading progress bar + case-nav macro navigation (2026-06-12)  
**Stack:** HTML + CSS vanilla + JS mínimo. Sin build, sin npm, sin framework.

---

## Casos de estudio activos (orden canónico)

| # | Archivo | Caso | CSS propio |
|---|---|---|---|
| 1 | `html/restaurante.html` | División de cuentas en restaurantes (Multicaja) | `restaurante.css` |
| 2 | `html/ecosistemas.html` | Ecosistema de pagos fintech (3.240 pantallas) | `ecosistemas.css` |
| 3 | `html/fletes.html` | FleteApp — PWA cotizador transportistas | `fletes.css` |
| 4 | `html/estimate.html` | Wizard cotizador de proyectos Olivacraft | `estimate.css` |
| 5 | `html/oliva.html` | OLIVA OS — Framework de Ejecución con IA | `oliva.css` |
| — | `html/olivacraft.html` | Versión anterior de oliva, mantener mientras | — |

---

## Arquitectura CSS

```
base.css → caso.css → [caso].css
```

- **`base.css`** — tokens globales, reset, navbar, btn, tag, footer, stat-row, case-nav
- **`caso.css`** — capa compartida: progress bar, hero, metric-card, hypo-item, impact-dashboard, chapter-reveal
- **`[caso].css`** — solo lo genuinamente único por caso

---

## Sistemas implementados en esta sesión (2026-06-12)

### 1. Reading progress bar (`caso.css` + `main.js`)
Barra cyan de 3px sticky debajo del navbar. Llena de 0% a 100% con scroll. Sin capítulos — lectura continua.

```html
<!-- En cada caso de estudio -->
<div class="project-progress-nav" aria-hidden="true">
    <div class="progress-bar-fill" id="case-progress-fill"></div>
</div>
```

JS: IIFE con `scroll` listener → `scrollY / (scrollHeight - innerHeight) * 100`.  
El `hideObserver` existente la hace fade-out cuando el footer entra en vista.

### 2. Case-nav macro (`base.css` + HTML de cada caso)
Reemplaza el breadcrumb en los 5 casos canónicos. Responde: ¿en qué caso estoy? ¿cuántos hay?

```html
<nav class="breadcrumb-nav case-nav" aria-label="Navegación entre casos">
    <div class="container">
        <div class="case-nav-track">
            <a href="../html/[prev].html" class="case-nav-prev">
                [svg ←] <span class="case-nav-label">[Nombre anterior]</span>
            </a>
            <span class="case-nav-identity">Caso X de 5</span>
            <a href="../html/[next].html" class="case-nav-next">
                <span class="case-nav-label">[Nombre siguiente]</span> [svg →]
            </a>
        </div>
    </div>
</nav>
```

Mobile ≤640px: `.case-nav-label` se oculta, solo quedan flechas + contador.  
Primer caso (Restaurante): ghost izquierdo. Último caso (OLIVA OS): ghost derecho.

### 3. Chapter gate animation (`caso.css` + `main.js`)
Secciones `section[id^="cap"]` entran con `opacity 0 + translateY(32px)` y se revelan al hacer scroll.

JS: IIFE agrega `.chapter-reveal` vía JS y observa con IntersectionObserver. Una vez visible, no se re-anima.

### 4. OLIVA OS — reescritura (`html/oliva.html`)
Nuevo framing: "Framework de Ejecución con IA".
- Cap1: Arquitectura (3 capas: Skills / Oliva Framework / Olivacraft)
- Cap2: Modelos (Rápido 6 / Controlado 11 / Profundo 16 prompts)
- Cap3: Operativo (Olivacraft: 11 etapas, 9 documentos)
- Métricas: 3 capas / 3 modelos / 23 skills

---

## PRÓXIMO PASO (instrucción pendiente)

**Los nombres de capítulo en el progress nav.**

Estado actual: la barra de 3px es una lectura continua sin labels de capítulo.

Lo que el usuario quiere implementar: los nombres de los capítulos deben coexistir con la barra de progreso. Francisco dará la instrucción exacta al retomar la sesión.

**Contexto de la discusión:** la barra continua resuelve "¿cuánto queda?", pero no dice "¿en qué capítulo estoy?". La instrucción vendrá con la descripción exacta de cómo mezclar ambos sistemas sin que compitan visualmente.

---

## Pendientes conocidos

- [ ] **Chapter labels en progress nav** — instrucción pendiente de Francisco
- [ ] **Mobile review** — no validado en móvil post-sesión
- [ ] **FleteApp screenshots** — `fletes.html` sin capturas reales de la PWA
- [ ] **CV PDF** — `media/cv-francisco-orellana.pdf` no existe (enlace muerto en index)

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

---

## Historial de commits clave

| Commit | Cambio |
|---|---|
| `11141a6` | Stat-row + metric-card outline estandarizado |
| `49e8db0` | restaurante.css fixes post-auditoría |
| `b16bc29` | Chapter gate animation + OLIVA OS rewrite + mobile fix |
| `6639b69` | Reading progress bar + case-nav macro (← Caso X de 5 →) |

---

## Cómo retomar

1. Leer `project-continuos.md` (este archivo)
2. Leer `CLAUDE.md` para tokens, arquitectura y reglas
3. El Live Server de VS Code sirve los HTML directamente (sin build)
4. Skills en `C:\Users\orell\OneDrive\Olivacraft\Claude Skills\`
