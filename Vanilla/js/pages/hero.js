import { specimens } from '../data.js';

export function renderHero(container) {
  const repeatedSpecimens = [...specimens, ...specimens, ...specimens, ...specimens];

  const carouselItemsHTML = repeatedSpecimens.map((specimen) => `
    <div class="hero-carousel-item" data-order="${specimen.order}">
      <div class="carousel-item-content">
        <span class="specimen-name">${specimen.commonName}</span>
        <span class="specimen-order">${specimen.order.toUpperCase()}</span>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <section class="hero-section">
      <div class="hero-content">
        <h1>ENTOMOLOGÍA</h1>
        <p class="hero-description">
          Descubre la diversidad de insectos de México.
        </p>
        <div class="hero-carousel-container">
          <div class="hero-carousel-track">
            ${carouselItemsHTML}
          </div>
        </div>
        
        <div class="hero-actions">
          <a href="#/library" class="btn-primary">Explorar Fichas Técnicas</a>
        </div>
      </div>
    </section>
  `;
}
