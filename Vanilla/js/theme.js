let isDark = localStorage.getItem('theme') === 'dark';

export function initTheme() {
  if (isDark) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
}

export function toggleTheme() {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
  return isDark;
}

export function getIsDark() {
  return isDark;
}

// Auto-inicializar al cargar la librería
initTheme();
