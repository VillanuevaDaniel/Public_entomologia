# Plan de Implementación: Migración React → Vanilla HTML/CSS/JS

## Sistema Público de Entomología

---

## Fase 0: Preparación del Entorno

**Objetivo:** Crear la estructura de directorios y archivos base.

| Paso | Acción | Archivos |
|------|--------|----------|
| 0.1 | Crear directorio raíz `vanilla/` | — |
| 0.2 | Crear subdirectorios: `css/`, `js/`, `js/pages/`, `js/components/`, `svgs/`, `assets/` | — |
| 0.3 | Copiar los 6 CSS tal cual desde `src/` | `css/index.css`, `css/sidebar.css`, `css/hero.css`, `css/gallery.css`, `css/library.css`, `css/specimen-detail.css` |
| 0.4 | Copiar los 6 SVGs utilziados | `svgs/bug.svg`, `svgs/house.svg`, `svgs/images.svg`, `svgs/library.svg`, `svgs/moon.svg`, `svgs/sun.svg` |
| 0.5 | Copiar favicon | `assets/favicon.svg` (renombrar de `vite.svg`) |
| 0.6 | Crear `index.html` con estructura base (Google Fonts link, meta tags, `<div id="app">`, scripts type="module") | `index.html` |

---

## Fase 1: Datos y Tema (Sin DOM)

**Objetivo:** Crear los módulos puros de datos y estado sin tocar el DOM.

### Paso 1.1: `js/data.js`
- Copiar el array `specimens` desde `src/data/specimens.js`
- Exportar como `export const specimens = [...]`
- Mantener los 20 registros exactos (duplicados incluidos)
- Mantener estructura: `{ id, commonName, scientificName, family, order, state, status, date, collector }`

### Paso 1.2: `js/theme.js`
- Variable privada `let isDark`
- Función `initTheme()`: lee `localStorage.getItem('theme')`, si es `'dark'` agrega `.dark-mode` a `document.documentElement`
- Función `toggleTheme()`: alterna `isDark`, agrega/quita `.dark-mode`, guarda en `localStorage`
- Función `getTheme()`: retorna `{ isDark, toggleTheme }`
- Auto-ejecutar `initTheme()` al importar el módulo

---

## Fase 2: Router Hash-Based

**Objetivo:** Implementar navegación SPA sin React Router.

### Paso 2.1: `js/app.js` — Router
- Definir rutas: `{ '/': renderHero, '/gallery': renderGallery, '/library': renderLibrary }`
- Función `navigateTo(path)`: cambia `window.location.hash`, llama al render de la página correspondiente
- Escuchar evento `hashchange` en `window`
- Función `getCurrentRoute()`: lee `window.location.hash`, extrae la ruta (default `'/'`)
- Función `initRouter()`: determina ruta actual, renderiza página, scroll to top
- Al cambiar ruta: `window.scrollTo(0, 0)`, llamar a la función de render de la página

### Paso 2.2: `js/app.js` — Layout base
- Función `initApp()`:
  1. Renderizar sidebar en `#sidebar-container`
  2. Llamar `initRouter()`
  3. Crear `#page-container` donde se renderizarán las páginas

---

## Fase 3: Sidebar

**Objetivo:** Componente de navegación lateral con tema y tooltips.

### Paso 3.1: `js/components/sidebar.js`
- Función `renderSidebar(container)`: genera el HTML del sidebar
  - `<nav class="left-sidebar">` con `<ul class="sidebar-nav">`
  - 3 `<li>` con `<a>` (no `NavLink`): href="#/" , href="#/gallery", href="#/library"
  - Cada link con `data-tooltip`, clase `.nav-link`, icono `<img>`
  - Botón de tema con clase `.theme-toggle`, icono sol/luna condicional
- Función `updateActiveLink()`: lee hash actual, agrega `.active` al link correspondiente, quita de los demás
- Event listener en botón tema: llama `toggleTheme()`, actualiza icono sol/luna, actualiza `data-tooltip`
- Llamar `updateActiveLink()` después de cada cambio de ruta

### Paso 3.2: Tooltips
- Los tooltips son CSS puro (`[data-tooltip]::after`), no requieren JS
- Solo asegurar que `data-tooltip` tenga el valor correcto

---

## Fase 4: Página Hero

**Objetivo:** Landing page con carousel infinito y CTA.

### Paso 4.1: `js/pages/hero.js`
- Función `renderHero(container)`:
  1. Generar HTML con `<section class="hero-section">`
  2. Título `<h1>ENTOMOLOGÍA</h1>`
  3. Subtítulo con clase `.hero-description`
  4. Carousel container con track que contiene 4 copias de los 20 specimens (80 items)
  5. Cada item: `<div class="hero-carousel-item">` con nombre y orden
  6. Botón CTA con clase `.btn-primary`, href="#/library"
- El carousel funciona 100% con CSS (`@keyframes scroll`), no necesita JS
- El botón CTA navega con hash (href="#/library")

---

## Fase 5: Página Gallery

**Objetivo:** Galería con filtros reactivos en tiempo real.

### Paso 5.1: `js/pages/gallery.js`
- Función `renderGallery(container)`:
  1. Generar HTML con header `.modern-header`
  2. Generar 3 controles de filtro (2 inputs + 1 select)
  3. Select poblado dinámicamente: `[...new Set(specimens.map(s => s.family))].sort()`
  4. Generar grid `.gallery-grid` con items filtrados
  5. Cada item: `<div class="gallery-item">` con nombre y orden

### Paso 5.2: Filtrado reactivo
- Agregar `input` event listeners a los 3 controles
- Al cambiar cualquier filtro:
  1. Leer valores de los 3 campos
  2. Filtrar array `specimens` con `toLowerCase().includes()`
  3. Regenerar el innerHTML del grid con los resultados filtrados
- NO re-renderizar toda la página, solo el grid

---

## Fase 6: Página Library + Modal

**Objetivo:** Fichas técnicas clickeables con modal de detalle.

### Paso 6.1: `js/pages/library.js`
- Función `renderLibrary(container)`:
  1. Generar HTML con header `.modern-header`
  2. Generar controles de filtro (mismos que Gallery pero con IDs diferentes)
  3. Generar grid `.cards-grid` con tarjetas filtradas
  4. Cada tarjeta: `<div class="insect-card">` con imagen placeholder, datos, etc.

### Paso 6.2: Filtrado reactivo (mismo patrón que Gallery)

### Paso 6.3: `js/components/specimen-detail.js`
- Función `renderSpecimenDetail(specimen)`:
  1. Crear overlay `<div class="specimen-detail-overlay">`
  2. Crear modal `<div class="specimen-detail-modal">`
  3. Poblar con datos del espécimen (taxonomía, colecta, morfología, notas)
  4. Agregar al `document.body`
  5. Bloquear scroll: `document.body.style.overflow = 'hidden'`
- Función `closeSpecimenDetail()`:
  1. Remover overlay del DOM
  2. Restaurar scroll: `document.body.style.overflow = 'unset'`
- Event listeners:
  - Click en overlay → cerrar
  - Click en botón × → cerrar
  - Click en modal contenido → no cerrar (stopPropagation)

### Paso 6.4: Conexión Library → Modal
- En `renderLibrary`, agregar click listener a cada `.insect-card`
- Al hacer click: llamar `renderSpecimenDetail(specimen)`
- Soporte键盘: keydown Enter en tarjeta → abrir modal

---

## Fase 7: Integración y Polish

**Objetivo:** Conectar todos los módulos y verificar comportamiento.

### Paso 7.1: Conectar todo en `app.js`
```js
import { renderSidebar } from './components/sidebar.js';
import { initRouter } from './app.js';

function init() {
  renderSidebar(document.getElementById('sidebar'));
  initRouter();
}
document.addEventListener('DOMContentLoaded', init);
```

### Paso 7.2: Verificar
- Navegación funciona entre las 3 rutas
- Sidebar muestra link activo según hash
- Dark mode persiste al recargar
- Carousel se anima infinitamente
- Filtros actualizan grid en tiempo real
- Modal abre/cierra correctamente
- Scroll to top al cambiar de ruta
- Responsive en todos los breakpoints
- Sin errores en consola

---

## Orden de Ejecución y Tiempos Estimados

```
Fase 0 (Preparación)     ← 15 min
  ↓
Fase 1 (Datos + Tema)    ← 20 min
  ↓
Fase 2 (Router)          ← 30 min
  ↓
Fase 3 (Sidebar)         ← 20 min
  ↓
Fase 4 (Hero)            ← 15 min
  ↓
Fase 5 (Gallery)         ← 25 min
  ↓
Fase 6 (Library+Modal)   ← 40 min
  ↓
Fase 7 (Integración)     ← 30 min
  ─────────────────────────────
  Total estimado: ~3 horas
```

---

## Archivos Finales (21 archivos)

```
vanilla/
├── index.html
├── css/
│   ├── index.css
│   ├── sidebar.css
│   ├── hero.css
│   ├── gallery.css
│   ├── library.css
│   └── specimen-detail.css
├── js/
│   ├── app.js
│   ├── theme.js
│   ├── data.js
│   ├── pages/
│   │   ├── hero.js
│   │   ├── gallery.js
│   │   └── library.js
│   └── components/
│       ├── sidebar.js
│       └── specimen-detail.js
└── svgs/
    ├── bug.svg
    ├── house.svg
    ├── images.svg
    ├── library.svg
    ├── moon.svg
    └── sun.svg
```
