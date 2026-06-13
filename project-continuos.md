# Contexto de Continuidad — fco-orellana-pd

> Archivo de estado para retomar trabajo entre sesiones. No es documentación — es contexto operativo.

---

## Estado actual del proyecto

**Repo:** `fcohubto/fco-orellana-pd` · GitHub Pages estático  
**Último commit:** `e614bfc` — Estandarización de impact cards (2026-06-12)  
**Stack:** HTML + CSS vanilla + JS mínimo. Sin build, sin npm, sin framework.

---

## Casos de estudio activos

| Archivo | Caso | CSS propio |
|---|---|---|
| `html/restaurante.html` | División de cuentas en restaurantes (Multicaja) | `restaurante.css` |
| `html/ecosistemas.html` | Ecosistema de pagos fintech (3.240 pantallas) | `ecosistemas.css` |
| `html/fletes.html` | FleteApp — PWA cotizador transportistas | `fletes.css` |
| `html/estimate.html` | Wizard cotizador de proyectos Olivacraft | `estimate.css` |
| `html/oliva.html` | OLIVA OS — Framework operativo de estudio | `oliva.css` |
| `html/olivacraft.html` | (Versión anterior de oliva.html, comparte restaurante.css) | — |

---

## Componentes estandarizados en base.css

### `.stat-row` / `.stat-item` (sección Resultado)
```html
<div class="stat-row mt-60">
    <div class="stat-item">
        <span class="stat-value">3</span>
        <span class="stat-label">Transportistas activos en validación</span>
    </div>
</div>
```
Todos los casos tienen esta estructura en su sección de resultado final.

### `.impact-label` + `.impact-dashboard-grid` (cards de resultado)
```html
<div class="impact-dashboard-grid">
    <div class="main-impact-column">
        <div class="metric-card">
            <span class="impact-label">Validado en terreno</span>
            <h4>Título del resultado</h4>
            <p>Descripción del impacto.</p>
        </div>
    </div>
    <div class="secondary-impact-column">
        <div class="metric-card roadmap-card">
            <span class="impact-label">Próximo paso</span>
            <h4>Título</h4>
            <p>Descripción.</p>
        </div>
    </div>
</div>
```
**Regla:** siempre `.impact-label` + `h4` + `p`. Nunca `.eyebrow`, nunca `.status-badge`, nunca `strong`.

### `.metrics-grid` (header de cada caso — permanece como está)
```html
<div class="metrics-grid mt-60">
    <div class="metric-card">
        <span class="metric-value">3.240</span>
        <h3 class="metric-label">Pantallas</h3>
        <p class="metric-description">Contexto de la métrica.</p>
    </div>
</div>
```
Estilo: borde top cyan, sin fondo. Definido en cada CSS de página (no en base).

---

## Anti-patrones prohibidos (recordatorio)

1. `.status-badge` con modificadores de color (success, validated, vision) — eliminado
2. `.impact-highlight` como clase — eliminado
3. `strong` dentro de `.metric-card` en sección de resultados — reemplazar por `h4`
4. Texto menor a 14px en pantalla (`--text-xs`, `--text-2xs` son solo para A4/PDF)
5. Valores hardcoded fuera de tokens CSS

---

## Pendientes conocidos

- [ ] **Mobile review** — no validado en móvil post-estandarización de impact cards
- [ ] **FleteApp screenshots** — caso `fletes.html` sin capturas reales de la PWA
- [ ] **OLIVA OS visual** — `oliva.html` sin imágenes de evidencia del sistema
- [ ] **CV PDF** — `media/cv-francisco-orellana.pdf` no existe (enlace muerto en index)
- [ ] **olivacraft.html** — revisar si mantener o deprecar (contenido duplica oliva.html)
- [ ] **index.css** — tiene cambios no commiteados del usuario (color eyebrow, max-width, stat-label size)

---

## Historial de commits clave

| Commit | Cambio |
|---|---|
| `11141a6` | Stat-row + metric-card outline + eyebrow labels en sección Resultado |
| `e614bfc` | Estandarización global de impact cards → `.impact-label` + `h4` en los 5 casos |

---

## Cómo retomar

1. Abrir el repo en `C:\Users\orell\fco-orellana-pd`
2. Leer `CLAUDE.md` para tokens, arquitectura y reglas de workflow
3. Leer este archivo para el estado operativo actual
4. El Live Server de VS Code sirve los HTML directamente (sin build)
