# Documento de Requerimientos: Migración a Stack Vanilla

## Sistema Público de Entomología - Migración React → HTML/CSS/JS Vanilla

---

## 1. Resumen Ejecutivo

Migrar la aplicación web "Sistema Público de Entomología" de su stack actual (React 19 + Vite + react-router-dom) a un stack completamente vanilla (HTML + CSS + JavaScript puro), conservando al 100% la funcionalidad existente y la estética visual.

---

## 2. Stack Actual (Origen)

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | React | 19.2.0 |
| Routing | react-router-dom | 7.13.0 |
| Build Tool | Vite | 7.3.1 |
| Transpiler | @vitejs/plugin-react-swc | 4.2.2 |
| Linting | ESLint | 9.39.1 |
| Idioma | JavaScript (JSX) | ES2020 |
| CSS | Vanilla CSS (co-located) | — |
| State | React Context API | — |
| Datos | hardcoded (specimens.js) | — |

## 3. Stack Objetivo (Destino)

| Capa | Tecnología |
|------|-----------|
| Estructura | HTML semántico |
| Estilos | CSS vanilla (mismos archivos CSS existentes) |
| Comportamiento | JavaScript vanilla (ES Modules) |
| Routing | Hash-based routing (custom) |
| State | Módulo JS singleton + localStorage |
| Datos | JSON estático o JS module |
| Build | Ninguno (serv estático directo) |
| Server | Cualquier servidor estático (nginx, Apache, file://) |

---

## 4. Estructura Actual del Proyecto

```
src/
├── main.jsx                          # Entry point React
├── App.jsx                           # Root + Router + Layout
├── App.css                           # CSS legacy (no utilizado)
├── index.css                         # Estilos globales + variables CSS
├── assets/
│   └── react.svg                     # Logo React (no utilizado)
├── context/
│   └── ThemeContext.jsx              # Provider de tema dark/light
├── data/
│   └── specimens.js                  # Array de 20 especímenes hardcoded
├── components/
│   ├── Sidebar.jsx                   # Navegación lateral fija
│   ├── Sidebar.css                   # Estilos del sidebar
│   ├── SpecimenDetail.jsx            # Modal de detalle de espécimen
│   └── SpecimenDetail.css            # Estilos del modal
├── pages/
│   ├── Hero.jsx                      # Página de inicio
│   ├── Hero.css                      # Estilos del hero
│   ├── Gallery.jsx                   # Galería de especímenes
│   ├── Gallery.css                   # Estilos de la galería
│   ├── Library.jsx                   # Fichas técnicas
│   └── Library.css                   # Estilos de fichas técnicas
└── svgs/                             # Iconos Lucide (SVG standalone)
    ├── bug.svg
    ├── database.svg
    ├── house.svg
    ├── id-card.svg
    ├── images.svg
    ├── library.svg
    ├── moon.svg
    └── sun.svg
```

---

## 5. Estructura Objetivo (Propuesta)

```
vanilla/
├── index.html                        # Entry point HTML (SPA con hash routing)
├── css/
│   ├── index.css                     # Estilos globales (migrado de src/index.css)
│   ├── sidebar.css                   # Estilos del sidebar (migrado)
│   ├── hero.css                      # Estilos del hero (migrado)
│   ├── gallery.css                   # Estilos de la galería (migrado)
│   ├── library.css                   # Estilos de fichas técnicas (migrado)
│   └── specimen-detail.css           # Estilos del modal (migrado)
├── js/
│   ├── app.js                        # Router + inicialización de la app
│   ├── theme.js                      # Gestión de tema dark/light
│   ├── data.js                       # Datos de especímenes (exportados)
│   ├── pages/
│   │   ├── hero.js                   # Renderizado de la página Hero
│   │   ├── gallery.js                # Renderizado de la página Gallery
│   │   └── library.js                # Renderizado de la página Library
│   └── components/
│       ├── sidebar.js                # Componente Sidebar
│       └── specimen-detail.js        # Componente Modal de detalle
├── svgs/                             # Iconos SVG (copiar tal cual)
│   ├── bug.svg
│   ├── house.svg
│   ├── images.svg
│   ├── library.svg
│   ├── moon.svg
│   └── sun.svg
└── assets/
    └── favicon.svg                   # Favicon (actual vite.svg)
```

---

## 6. Requerimientos Funcionales por Módulo

### 6.1. Router (Hash-Based)

**Actual:** `BrowserRouter` con rutas `/`, `/gallery`, `/library`

**Objetivo:** Router custom basado en hash (`#/`, `#/gallery`, `#/library`)

**Requerimientos:**
- [ ] Implementar HashRouter que escuche el evento `hashchange`
- [ ] Ruta por defecto `#/` → renderiza Hero
- [ ] Ruta `#/gallery` → renderiza Gallery
- [ ] Ruta `#/library` → renderiza Library
- [ ] Scroll to top automático al cambiar de ruta
- [ ] Navegación desde Sidebar actualiza hash y contenido
- [ ] Navegación desde botones internos (CTA del Hero) actualiza hash
- [ ] La página debe funcionar al recargar en cualquier ruta
- [ ] `NavLink` activo se determina comparando hash actual con href

### 6.2. Theme Context (Dark/Light Mode)

**Actual:** `ThemeContext` con React Context + `useState` + `useEffect` + `localStorage`

**Objetivo:** Módulo JS singleton con estado reactive

**Requerimientos:**
- [ ] Estado `isDark` persistido en `localStorage` (key: `'theme'`)
- [ ] Al cargar, leer `localStorage` y aplicar clase `.dark-mode` en `<html>`
- [ ] Función `toggleTheme()` que alterne el estado
- [ ] Al hacer toggle, agregar/quitar clase `.dark-mode` en `document.documentElement`
- [ ] Guardar preferencia en `localStorage`
- [ ] Exportar función `useTheme()` equivalent que retorne `{ isDark, toggleTheme }`
- [ ] El sidebar debe consumir el tema para mostrar icono sol/luna correcto
- [ ] Los tooltips del sidebar deben adaptarse al tema

### 6.3. Datos (specimens.js → data.js)

**Actual:** Array exportado como `export const specimens = [...]`

**Objetivo:** Módulo JS que exporte el mismo array

**Requerimientos:**
- [ ] Mantener exactamente la misma estructura de datos (20 registros)
- [ ] Mantener los campos: `id`, `commonName`, `scientificName`, `family`, `order`, `state`, `status`, `date`, `collector`
- [ ] Exportar como `window.specimens` o como ES module
- [ ] Los registros 11-20 son duplicados de 1-10 (mantener tal cual)
- [ ] Los status son: `PUBLIC_RELEASE`, `CAPTURED`, `VALIDATED`

### 6.4. Sidebar Component

**Actual:** `Sidebar.jsx` con `NavLink` de react-router-dom + `useTheme()`

**Objetivo:** Función JS que genere el HTML del sidebar

**Requerimientos:**
- [ ] Sidebar fijo a la izquierda, 80px width (60px en móvil)
- [ ] 3 links de navegación: Inicio (house), Galería (images), Fichas Técnicas (library)
- [ ] Cada link tiene `data-tooltip` con texto: "Inicio", "Galería", "Fichas Técnicas"
- [ ] Botón de tema (sol/luna) en la parte inferior
- [ ] El link activo se marca con clase `.active` (comparando hash actual)
- [ ] Tooltips con animación `tooltipTimedSidebar` (2s, aparece 10%, desaparece 85%)
- [ ] Tooltips del botón tema aparecen arriba (no abajo)
- [ ] Iconos SVG renderizados como `<img>` con filtros CSS
- [ ] Transiciones de color en hover y estado activo
- [ ] Responsive: 80px desktop, 60px ≤1000px

### 6.5. Hero Page

**Actual:** `Hero.jsx` con carousel infinito de especímenes + CTA

**Objetivo:** Función JS que renderice la página Hero

**Requerimientos:**
- [ ] Título "ENTOMOLOGÍA" grande (3.7rem desktop, 2rem móvil)
- [ ] Subtítulo: "Descubre la diversidad de insectos de México."
- [ ] Carousel infinito con 4x los especímenes (80 items = 20 × 4)
- [ ] Cada item muestra nombre común y orden (ej: "Escarabajo Rinoceronte" / "COLEOPTERA")
- [ ] Animación CSS `@keyframes scroll` (60s lineal infinito)
- [ ] Carousel se pausa en hover
- [ ] Gradiente mask en bordes del carousel
- [ ] Botón CTA "Explorar Fichas Técnicas" → navega a `#/library`
- [ ] Responsive: padding y font-size cambian en ≤768px y ≤600px

### 6.6. Gallery Page

**Actual:** `Gallery.jsx` con filtros + grid de especímenes

**Objetivo:** Función JS que renderice la página Gallery con filtros reactivos

**Requerimientos:**
- [ ] Header: "GALERÍA DE ESPECÍMENES" / "COLECCIÓN FOTOGRÁFICA"
- [ ] 3 controles de filtro: nombre común (input), nombre científico (input), familia (select)
- [ ] Select de familias generado dinámicamente con `Set` + sort
- [ ] Filtrado case-insensitive con `toLowerCase().includes()`
- [ ] Grid 4 columnas desktop, 3 ≤1000px, 2 ≤768px, 1 ≤600px
- [ ] Cada item muestra nombre común y orden
- [ ] Hover: translateY(-2px) + sombra + borde accent
- [ ] Los filtros deben ser reactivos (actualizar grid al escribir)
- [ ] IDs de inputs: `commonNameInput`, `scientificNameInput`, `familyFilter`

### 6.7. Library Page

**Actual:** `Library.jsx` con filtros + grid de tarjetas + modal de detalle

**Objetivo:** Función JS que renderice la página Library

**Requerimientos:**
- [ ] Header: "RECURSOS DIGITALES" / "FICHAS TÉCNICAS"
- [ ] Mismos 3 controles de filtro que Gallery (pero con IDs: `commonNameInputLib`, `scientificNameInputLib`, `familyFilterLib`)
- [ ] Grid de tarjetas con `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- [ ] Cada tarjeta muestra: imagen placeholder (bug.svg), nombre común, nombre científico (cursiva), orden, familia, estado, fecha
- [ ] Tarjetas clickeables → abren modal SpecimenDetail
- [ ] Soporte键盘: `Enter` abre el modal (role="button", tabIndex=0)
- [ ] Hover: translateY(-5px) + sombra + fondo cambio

### 6.8. SpecimenDetail Modal

**Actual:** `SpecimenDetail.jsx` con overlay, backdrop blur, animaciones

**Objetivo:** Función JS que genere el modal dinámicamente

**Requerimientos:**
- [ ] Overlay fijo con `backdrop-filter: blur(8px)` y fondo rgba(0,0,0,0.75)
- [ ] Click en overlay cierra el modal (no en contenido)
- [ ] Botón cerrar (×) en esquina superior derecha
- [ ] Animación fadeIn (0.3s) + slideUp (0.5s cubic-bezier)
- [ ] Layout: 40% imagen izquierda + 60% datos derecha
- [ ] Sección imagen: bug.svg como placeholder + nombre común + nombre científico
- [ ] Datos del espécimen renderizados dinámicamente:
  - Taxonomía: Reino (Animalia), Filo (Arthropoda), Clase (Insecta), Orden, Familia, Género (split ' ')[0], Especie (split ' ')[1]
  - Datos de colecta: Fecha, País (México), Estado, Localidad (--), Colector, Método (Manual / Red)
  - Morfología: Longitud (-- mm), Envergadura (-- mm), Colores (--), Estadío (Adulto), Sexo (Indeterminado)
  - Notas ecológicas: Texto placeholder
- [ ] Bloquear scroll del body mientras modal abierto (`overflow: hidden`)
- [ ] Restaurar scroll al cerrar
- [ ] Responsive ≤900px: layout vertical (imagen arriba, datos abajo)
- [ ] Modal height: 85vh desktop, 95vh móvil

### 6.9. CSS (Estilos)

**Actual:** 6 archivos CSS co-located (~1600 líneas totales)

**Objetivo:** Migrar todos los CSS sin modificar

**Requerimientos:**
- [ ] Copiar `index.css` tal cual (variables CSS, reset, scrollbar, brutal-input, dark-mode base)
- [ ] Copiar `Sidebar.css` tal cual
- [ ] Copiar `SpecimenDetail.css` tal cual
- [ ] Copiar `Hero.css` tal cual
- [ ] Copiar `Gallery.css` tal cual (incluyendo estilos modal no utilizados)
- [ ] Copiar `Library.css` tal cual
- [ ] **NO** incluir `App.css` (es legacy de template Vite, no se usa)
- [ ] Mantener todas las variables CSS: `--accent-color`, `--accent-color-light`, `--accent-color-hover`, `--accent-color-dark-bg`, `--mint-color`
- [ ] Mantener todas las media queries en breakpoints: 1000px, 900px, 768px, 600px
- [ ] Mantener todas las animaciones: `scroll`, `fadeIn`, `slideUp`, `tooltipTimedSidebar`
- [ ] Mantener Google Fonts: Inter (300,400,500,600) + Cormorant Garamond (400,600,italic)
- [ ] Mantener todas las reglas `.dark-mode` en cada archivo

### 6.10. Iconos SVG

**Actual:** 8 archivos SVG en `src/svgs/`, importados como módulos

**Objetivo:** Copiar SVGs y referenciarlos como `<img src="svgs/xxx.svg">`

**Requerimientos:**
- [ ] Copiar los 6 SVGs utilizados: `bug.svg`, `house.svg`, `images.svg`, `library.svg`, `moon.svg`, `sun.svg`
- [ ] No copiar `database.svg` e `id-card.svg` (no están en uso)
- [ ] Los SVGs se referencian con rutas relativas desde HTML/JS

---

## 7. Requerimientos No Funcionales

### 7.1. Compatibilidad
- [ ] Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
- [ ] No requiere transpilación ni build step
- [ ] Funciona con `file://` protocol (opening index.html directly)
- [ ] Funciona con cualquier servidor estático

### 7.2. Performance
- [ ] Sin dependencias externas (0 librerías)
- [ ] Carga instantánea (solo HTML + CSS + JS + SVGs)
- [ ] Sin requests HTTP innecesarios
- [ ] CSS y JS pueden minificarse opcionalmente

### 7.3. Mantenibilidad
- [ ] Código JavaScript modular (ES Modules o IIFE)
- [ ] Separación clara: datos / lógica / renderizado
- [ ] Nomenclatura consistente con el proyecto actual
- [ ] Sin comentarios innecesarios

### 7.4. Accesibilidad
- [ ] Mantener `lang="es"` en `<html>`
- [ ] Mantener `<meta charset="UTF-8">`
- [ ] Mantener `<meta name="viewport">`
- [ ] Mantener roles ARIA existentes (role="button" en tarjetas)
- [ ] Mantener soporte de teclado (Enter para abrir modal)

---

## 8. Mapeo de Componentes React → Funciones Vanilla

| React Component | Función Vanilla | Archivo |
|----------------|----------------|---------|
| `<App />` | `initApp()` | `js/app.js` |
| `<ThemeProvider>` | `theme.js` (módulo) | `js/theme.js` |
| `<BrowserRouter>` | `HashRouter` | `js/app.js` |
| `<Routes>` + `<Route>` | `router.navigate()` | `js/app.js` |
| `<Sidebar />` | `renderSidebar()` | `js/components/sidebar.js` |
| `<SpecimenDetail />` | `renderSpecimenDetail()` | `js/components/specimen-detail.js` |
| `<Hero />` | `renderHero()` | `js/pages/hero.js` |
| `<Gallery />` | `renderGallery()` | `js/pages/gallery.js` |
| `<Library />` | `renderLibrary()` | `js/pages/library.js` |
| `<ScrollToTop>` | `window.scrollTo(0,0)` en router | `js/app.js` |
| `useTheme()` | `getTheme()` / `toggleTheme()` | `js/theme.js` |
| `useState` (local) | Variables + re-render manual | Cada módulo |
| `useEffect` | Event listeners / DOM mutations | Cada módulo |
| `NavLink` (active class) | Comparación de hash + clase `.active` | `js/components/sidebar.js` |

---

## 9. Estrategia de Migración

### Fase 1: Preparación
1. Crear estructura de directorios objetivo
2. Copiar archivos CSS sin modificar
3. Copiar archivos SVG
4. Crear `data.js` con los mismos datos

### Fase 2: Core
1. Implementar `theme.js` (gestión de tema)
2. Implementar HashRouter en `app.js`
3. Crear `index.html` con estructura base

### Fase 3: Componentes
1. Implementar `sidebar.js`
2. Implementar `hero.js` (con carousel)
3. Implementar `gallery.js` (con filtros reactivos)
4. Implementar `library.js` (con filtros + apertura de modal)
5. Implementar `specimen-detail.js` (modal)

### Fase 4: Integración
1. Conectar router con renderizado de páginas
2. Conectar sidebar con router
3. Conectar theme con sidebar
4. Probar navegación completa
5. Probar dark mode completo

### Fase 5: Verificación
1. Comparar visualmente cada página con el original
2. Probar responsive en todos los breakpoints
3. Probar accesibilidad (teclado, lectores de pantalla)
4. Probar en múltiples navegadores
5. Verificar que no hay errores en consola

---

## 10. Dependencias Externas (Migradas)

| Actual (npm) | Vanilla (HTML/CSS/JS) |
|---|---|
| `react` | Ninguna (DOM nativo) |
| `react-dom` | Ninguna (innerHTML / DOM API) |
| `react-router-dom` | HashRouter custom (~50 líneas) |
| `vite` | Ninguna (servidor estático) |
| `@vitejs/plugin-react-swc` | Ninguna |
| Google Fonts (Inter, Cormorant Garamond) | CDN link en `<head>` (mantener) |

---

## 11. Riesgos y Consideraciones

| Riesgo | Mitigación |
|--------|-----------|
| React re-renderizado eficiente vs DOM manual | Usar `innerHTML` para pages completas, DOM API para updates parciales (filtros) |
| Estado reactivo sin framework | Implementar patrón observer simple o re-render manual |
| Manejo de eventos sin JSX | Delegación de eventos o `addEventListener` directo |
| Carousel infinito | Mantener CSS animation (no depende de React) |
| Tooltips CSS | Son puro CSS, no cambian |
| Modal scroll lock | Mismo patrón: `document.body.style.overflow` |

---

## 12. Criterios de Aceptación

- [ ] La app funciona al abrir `index.html` directamente
- [ ] Las 3 rutas funcionan correctamente (`#/`, `#/gallery`, `#/library`)
- [ ] El dark mode funciona y persiste en localStorage
- [ ] Los filtros de Gallery y Library funcionan en tiempo real
- [ ] El carousel del Hero se anima infinitamente
- [ ] El modal de SpecimenDetail abre y cierra correctamente
- [ ] El sidebar muestra el link activo según la ruta
- [ ] Los tooltips aparecen al hacer hover
- [ ] El responsive funciona en todos los breakpoints
- [ ] No hay errores en la consola del navegador
- [ ] La estética es idéntica al original (comparación visual)
- [ ] Sin dependencias npm (0 node_modules)

---

## 13. Archivos a Excluir (No Migrar)

| Archivo | Razón |
|---------|-------|
| `src/App.css` | Legacy de template Vite, no se usa |
| `src/assets/react.svg` | Logo de React, no se usa |
| `src/svgs/database.svg` | No importado en ningún componente |
| `src/svgs/id-card.svg` | No importado en ningún componente |
| `eslint.config.js` | Configuración de linting, no aplica |
| `vite.config.js` | Configuración de build, no aplica |
| `package.json` | No se necesitan dependencias npm |
| `node_modules/` | No se necesita |
| `dist/` | Build de Vite, no aplica |

---

*Documento generado el 2026-08-19 para la migración del Sistema Público de Entomología.*
