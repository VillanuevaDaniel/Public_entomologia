# Sistema Público de Entomología

Aplicación web para explorar y consultar la colección de especímenes entomológicos y sus fichas técnicas.

Esta versión está construida enteramente en **HTML, CSS y JavaScript Vanilla (ES6+)**, sin frameworks ni dependencias externas. Se diseñó enfocada en la ligereza, carga instantánea y una paleta visual basada en **Nord**.

---

## 🍃 Lo más destacado

- **Sin frameworks:** Hecho a mano con JS nativo. Carga al instante sin procesos de build ni paquetes pesados.
- **Tema Nord adaptable:**
  - **Modo Claro (Cálido/Botánico):** Fondo suave tono marfil (`#F4F6F0`) con acentos verde sabio (`#A3BE8C`), pensado para simular papelería de laboratorio o museo.
  - **Modo Oscuro:** Paleta Nord pura (`#2E3440`).
  - Cambia en un clic y recuerda tu preferencia automáticamente.
- **Navegación fluida (SPA):** Cambios de sección por hash (`#/`, `#/gallery`, `#/library`) sin recargar la página.
- **Muestra interactiva:** Carrusel continuo en la portada y tarjetas de especímenes con sombras suaves.
- **Fichas y búsqueda:** Búsqueda rápida por orden taxonómico y un modal para revisar los detalles completos de cada insecto.

---

## 📁 Estructura del proyecto

```text
Vanilla/
├── index.html                # Punto de entrada principal
├── assets/                   # Favicon e imágenes base
├── svgs/                     # Iconos vectoriales
├── css/                      # Hojas de estilo modulares
│   ├── index.css             # Estilos globales y variables de color
│   ├── sidebar.css           # Navegación y selector de tema
│   ├── hero.css              # Portada y carrusel
│   ├── gallery.css           # Galería interactiva
│   ├── library.css           # Catálogo de fichas técnicas
│   └── specimen-detail.css   # Modal de detalle de espécimen
└── js/                       # Lógica en JS Vanilla (Módulos ES)
    ├── app.js                # Enrutador cliente y arranque
    ├── data.js               # Información de los especímenes
    ├── theme.js              # Manejo del tema claro/oscuro
    ├── components/           # Componentes reutilizables (sidebar, modal)
    └── pages/                # Vistas principales (hero, gallery, library)
```

---

## 🚀 Cómo probarlo localmente

No hace falta instalar nada con `npm` ni configurar entornos complejos:

1. **Directo en el navegador:**  
   Basta con abrir el archivo `Vanilla/index.html` en Chrome, Firefox, Edge o Safari.

2. **Con un servidor local de Python (opcional):**  
   Si prefieres servirlo mediante un servidor local, abre la terminal en la raíz y ejecuta:

   ```bash
   python -m http.server 8000
   ```
   Luego ingresa a `http://localhost:8000/Vanilla/` en tu navegador.

---

## 🛠️ Tecnologías utilizadas

- **HTML5:** Marcado semántico.
- **CSS3:** Flexbox, CSS Grid y variables nativas (`:root`).
- **JavaScript ES6+:** Módulos JS nativos (`import`/`export`) y manipulación directa del DOM.
