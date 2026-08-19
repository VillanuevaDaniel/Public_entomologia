import { renderSidebar, updateActiveLink } from './components/sidebar.js';
import { renderHero } from './pages/hero.js';
import { renderGallery } from './pages/gallery.js';
import { renderLibrary } from './pages/library.js';
import { closeSpecimenDetail } from './components/specimen-detail.js';

const routes = {
  '/': renderHero,
  '/gallery': renderGallery,
  '/library': renderLibrary
};

function getCurrentRoute() {
  const hash = window.location.hash || '#/';
  const cleanPath = hash.replace(/^#/, '');
  return routes[cleanPath] ? cleanPath : '/';
}

function handleRoute() {
  // Reset scroll position on route change
  window.scrollTo(0, 0);

  // Close any open modals
  closeSpecimenDetail();

  const route = getCurrentRoute();
  const renderPage = routes[route];
  const pageContainer = document.getElementById('page-container');

  if (renderPage && pageContainer) {
    renderPage(pageContainer);
  }

  updateActiveLink();
}

function initApp() {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    renderSidebar(sidebarContainer);
  }

  window.addEventListener('hashchange', handleRoute);

  // Default initial route handler
  handleRoute();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
