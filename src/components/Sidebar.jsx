import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import homeIcon from '../svgs/house.svg';
import galleryIcon from '../svgs/images.svg';
import bugIcon from '../svgs/bug.svg';
import libraryIcon from '../svgs/library.svg';
import sunIcon from '../svgs/sun.svg';
import moonIcon from '../svgs/moon.svg';
import './Sidebar.css';

function Sidebar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="left-sidebar">
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" className="nav-link" data-tooltip="Inicio">
            <img src={homeIcon} alt="Home" className="home-icon" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/gallery" className="nav-link" data-tooltip="Galería">
            <img src={galleryIcon} alt="Gallery" className="gallery-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/library" className="nav-link" data-tooltip="Fichas Técnicas">
            <img src={libraryIcon} alt="Library" className="library-icon" />
          </NavLink>
        </li>
      </ul>
      
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        data-tooltip={isDark ? 'Modo claro' : 'Modo oscuro'}
      >
        <img 
          src={isDark ? sunIcon : moonIcon} 
          alt={isDark ? 'Sol' : 'Luna'} 
          className="theme-icon"
        />
      </button>
    </nav>
  );
}

export default Sidebar;
