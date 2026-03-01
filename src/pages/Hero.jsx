import { Link } from 'react-router-dom';
import { specimens } from '../data/specimens';
import './Hero.css';

function Hero() {

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>ENTOMOLOGÍA</h1>
        <p className="hero-description">
          Descubre la diversidad de insectos de México.
        </p>
        <div className="hero-carousel-container">
          <div className="hero-carousel-track">
            {[...specimens, ...specimens, ...specimens, ...specimens].map((specimen, index) => (
              <div key={`${specimen.id}-${index}`} className="hero-carousel-item" data-order={specimen.order}>
                <div className="carousel-item-content">
                  <span className="specimen-name">{specimen.commonName}</span>
                  <span className="specimen-order">{specimen.order.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-actions">
          <Link to="/library" className="btn-primary">Explorar Fichas Técnicas</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
