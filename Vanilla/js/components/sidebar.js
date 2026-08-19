import { toggleTheme, getIsDark } from '../theme.js';

export function renderSidebar(container) {
  const isDark = getIsDark();

  container.innerHTML = `
    <nav class="left-sidebar">
      <ul class="sidebar-nav">
        <li>
          <a href="#/" class="nav-link" data-tooltip="Inicio" data-path="#/">
            <img src="svgs/house.svg" alt="Home" class="home-icon" />
          </a>
        </li>
        <li>
          <a href="#/gallery" class="nav-link" data-tooltip="Galería" data-path="#/gallery">
            <img src="svgs/images.svg" alt="Gallery" class="gallery-icon" />
          </a>
        </li>
        <li>
          <a href="#/library" class="nav-link" data-tooltip="Fichas Técnicas" data-path="#/library">
            <img src="svgs/library.svg" alt="Library" class="library-icon" />
          </a>
        </li>
      </ul>
      
      <button 
        id="theme-toggle-btn"
        className="theme-toggle" 
        class="theme-toggle"
        data-tooltip="${isDark ? 'Modo claro' : 'Modo oscuro'}"
      >
        <img 
          id="theme-toggle-img"
          src="${isDark ? 'svgs/sun.svg' : 'svgs/moon.svg'}" 
          alt="${isDark ? 'Sol' : 'Luna'}" 
          class="theme-icon"
        />
      </button>
    </nav>
  `;

  const themeBtn = container.querySelector('#theme-toggle-btn');
  const themeImg = container.querySelector('#theme-toggle-img');

  themeBtn.addEventListener('click', () => {
    const newIsDark = toggleTheme();
    themeImg.src = newIsDark ? 'svgs/sun.svg' : 'svgs/moon.svg';
    themeImg.alt = newIsDark ? 'Sol' : 'Luna';
    themeBtn.setAttribute('data-tooltip', newIsDark ? 'Modo claro' : 'Modo oscuro');
  });

  updateActiveLink();
}

export function updateActiveLink() {
  const hash = window.location.hash || '#/';
  const links = document.querySelectorAll('.left-sidebar .nav-link');
  
  links.forEach(link => {
    const path = link.getAttribute('data-path');
    if (path === hash || (hash === '' && path === '#/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
