import { specimens } from '../data.js';

export function renderGallery(container) {
  const families = [...new Set(specimens.map(s => s.family))].sort();

  const familyOptionsHTML = families.map(family => 
    `<option value="${family}">${family.toUpperCase()}</option>`
  ).join('');

  container.innerHTML = `
    <section id="gallery" class="gallery-page">
      <div class="gallery-section">
        <div class="block-header modern-header">
          <h3>GALERÍA DE ESPECÍMENES</h3>
          <h2>COLECCIÓN FOTOGRÁFICA</h2>
          <p class="section-description">
            Explora visualmente nuestra colección de especímenes.
          </p>
        </div>
        
        <div class="gallery-controls">
          <input 
            type="text" 
            id="commonNameInput" 
            class="brutal-input" 
            placeholder="NOMBRE COMÚN..."
          />
          <input 
            type="text" 
            id="scientificNameInput" 
            class="brutal-input" 
            placeholder="NOMBRE CIENTÍFICO..."
          />
          <select 
            id="familyFilter" 
            class="brutal-select"
          >
            <option value="">TODAS LAS FAMILIAS</option>
            ${familyOptionsHTML}
          </select>
        </div>

        <section class="gallery-grid" id="gallery-grid-container">
        </section>
      </div>
    </section>
  `;

  const commonNameInput = container.querySelector('#commonNameInput');
  const scientificNameInput = container.querySelector('#scientificNameInput');
  const familySelect = container.querySelector('#familyFilter');
  const gridContainer = container.querySelector('#gallery-grid-container');

  function updateGrid() {
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

    gridContainer.innerHTML = filtered.map(specimen => `
      <div class="gallery-item" data-order="${specimen.order}">
        <span>${specimen.commonName}</span>
        <div class="specimen-info">${specimen.order.toUpperCase()}</div>
      </div>
    `).join('');
  }

  commonNameInput.addEventListener('input', updateGrid);
  scientificNameInput.addEventListener('input', updateGrid);
  familySelect.addEventListener('change', updateGrid);

  // Render inicial
  updateGrid();
}
