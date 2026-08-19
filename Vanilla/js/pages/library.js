import { specimens } from '../data.js';
import { renderSpecimenDetail } from '../components/specimen-detail.js';

export function renderLibrary(container) {
  const families = [...new Set(specimens.map(s => s.family))].sort();

  const familyOptionsHTML = families.map(family => 
    `<option value="${family}">${family.toUpperCase()}</option>`
  ).join('');

  container.innerHTML = `
    <div class="library-container">
      <header class="library-header modern-header">
        <h3>RECURSOS DIGITALES</h3>
        <h2>FICHAS TÉCNICAS</h2>
        <p class="section-description">Catálogo de especímenes recolectados para investigación y estudio. Explore las fichas técnicas para conocer más sobre ellos.</p>
      </header>

      <div class="gallery-controls">
        <input 
          type="text" 
          id="commonNameInputLib" 
          class="brutal-input" 
          placeholder="NOMBRE COMÚN..."
        />
        <input 
          type="text" 
          id="scientificNameInputLib" 
          class="brutal-input" 
          placeholder="NOMBRE CIENTÍFICO..."
        />
        <select 
          id="familyFilterLib" 
          class="brutal-select"
        >
          <option value="">TODAS LAS FAMILIAS</option>
          ${familyOptionsHTML}
        </select>
      </div>

      <div class="cards-grid" id="library-cards-container">
      </div>
    </div>
  `;

  const commonNameInput = container.querySelector('#commonNameInputLib');
  const scientificNameInput = container.querySelector('#scientificNameInputLib');
  const familySelect = container.querySelector('#familyFilterLib');
  const cardsContainer = container.querySelector('#library-cards-container');

  function updateLibraryCards() {
    const commonVal = commonNameInput.value.toLowerCase().trim();
    const scientificVal = scientificNameInput.value.toLowerCase().trim();
    const familyVal = familySelect.value;

    const filtered = specimens.filter(specimen => {
      const commonSafe = (specimen.commonName || '').toLowerCase();
      const scientificSafe = (specimen.scientificName || '').toLowerCase();

      const matchesCommon = !commonVal || commonSafe.includes(commonVal);
      const matchesScientific = !scientificVal || scientificSafe.includes(scientificVal);
      const matchesFamily = !familyVal || specimen.family === familyVal;

      return matchesCommon && matchesScientific && matchesFamily;
    });

    cardsContainer.innerHTML = filtered.map(specimen => `
      <div 
        class="insect-card" 
        data-id="${specimen.id}"
        role="button"
        tabindex="0"
        style="cursor: pointer"
      >
        <div class="card-image-container">
          <div class="image-placeholder">
            <img src="svgs/bug.svg" alt="${specimen.commonName}" class="placeholder-icon" />
          </div>
        </div>

        <div class="card-body">
          <h2 class="common-name">${specimen.commonName}</h2>
          <h3 class="scientific-name"><i>${specimen.scientificName}</i></h3>
          
          <div class="card-details">
            <div class="detail-row">
              <span class="label">Orden:</span>
              <span class="value">${specimen.order}</span>
            </div>
            <div class="detail-row">
              <span class="label">Familia:</span>
              <span class="value">${specimen.family}</span>
            </div>
            <div class="detail-row">
              <span class="label">Estado:</span>
              <span class="value">${specimen.state}</span>
            </div>
            <div class="detail-row">
              <span class="label">Fecha:</span>
              <span class="value">${specimen.date}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    const cards = cardsContainer.querySelectorAll('.insect-card');
    cards.forEach(card => {
      const specimenId = card.getAttribute('data-id');
      const targetSpecimen = specimens.find(s => s.id === specimenId);

      card.addEventListener('click', () => {
        renderSpecimenDetail(targetSpecimen);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          renderSpecimenDetail(targetSpecimen);
        }
      });
    });
  }

  commonNameInput.addEventListener('input', updateLibraryCards);
  scientificNameInput.addEventListener('input', updateLibraryCards);
  familySelect.addEventListener('change', updateLibraryCards);

  // Initial render
  updateLibraryCards();
}
