let activeOverlay = null;
let keyListener = null;

export function renderSpecimenDetail(specimen) {
  closeSpecimenDetail();

  if (!specimen) return;

  const genus = specimen.scientificName ? specimen.scientificName.split(' ')[0] : 'N/A';
  const species = specimen.scientificName ? specimen.scientificName.split(' ')[1] : 'N/A';

  const overlay = document.createElement('div');
  overlay.className = 'specimen-detail-overlay';

  overlay.innerHTML = `
    <div class="specimen-detail-modal">
      <button class="close-button" title="Cerrar">×</button>
      
      <div class="detail-content">
        <div class="detail-image-section">
          <div class="image-wrapper">
             <img src="svgs/bug.svg" alt="${specimen.commonName}" class="detail-image-placeholder" />
          </div>
          <div class="primary-info">
              <h1>${specimen.commonName}</h1>
              <h2 class="scientific-name-large"><i>${specimen.scientificName}</i></h2>
          </div>
        </div>

        <div class="detail-data-section">
          <div class="data-group">
              <h3>Taxonomía</h3>
              <div class="data-grid">
                  <div class="data-item">
                      <label>Reino</label>
                      <span>Animalia</span>
                  </div>
                  <div class="data-item">
                      <label>Filo</label>
                      <span>Arthropoda</span>
                  </div>
                  <div class="data-item">
                      <label>Clase</label>
                      <span>Insecta</span>
                  </div>
                   <div class="data-item">
                      <label>Orden</label>
                      <span>${specimen.order}</span>
                  </div>
                  <div class="data-item">
                      <label>Familia</label>
                      <span>${specimen.family}</span>
                  </div>
                  <div class="data-item">
                      <label>Género</label>
                      <span>${genus}</span>
                  </div>
                  <div class="data-item">
                      <label>Especie</label>
                      <span>${species}</span>
                  </div>
              </div>
          </div>

          <div class="data-group">
              <h3>Datos de Colecta</h3>
              <div class="data-grid">
                  <div class="data-item">
                      <label>Fecha de Colecta</label>
                      <span>${specimen.date}</span>
                  </div>
                  <div class="data-item">
                      <label>País</label>
                      <span>México</span>
                  </div>
                  <div class="data-item">
                      <label>Estado</label>
                      <span>${specimen.state}</span>
                  </div>
                  <div class="data-item">
                      <label>Localidad</label>
                      <span>-- Datos no disponibles --</span>
                  </div>
                  <div class="data-item">
                      <label>Colector</label>
                      <span>${specimen.collector}</span>
                  </div>
                  <div class="data-item">
                      <label>Método de Colecta</label>
                      <span>Manual / Red</span>
                  </div>
              </div>
          </div>

          <div class="data-group">
              <h3>Morfología y Medidas</h3>
              <div class="data-grid">
                  <div class="data-item">
                      <label>Longitud Total</label>
                      <span>-- mm</span>
                  </div>
                  <div class="data-item">
                      <label>Envergadura Alar</label>
                      <span>-- mm</span>
                  </div>
                  <div class="data-item">
                      <label>Colores Principales</label>
                      <span>--</span>
                  </div>
                  <div class="data-item">
                      <label>Estadío</label>
                      <span>Adulto</span>
                  </div>
                  <div class="data-item">
                      <label>Sexo</label>
                      <span>Indeterminado</span>
                  </div>
              </div>
          </div>

          <div class="data-group">
              <h3>Notas Ecológicas</h3>
              <p class="notes-text">
                  Aqui va una descripcion bien durisima del especimen y de sy habitat.
              </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = overlay.querySelector('.specimen-detail-modal');
  const closeBtn = overlay.querySelector('.close-button');

  overlay.addEventListener('click', closeSpecimenDetail);
  closeBtn.addEventListener('click', closeSpecimenDetail);
  modal.addEventListener('click', e => e.stopPropagation());

  keyListener = (e) => {
    if (e.key === 'Escape') {
      closeSpecimenDetail();
    }
  };
  document.addEventListener('keydown', keyListener);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  activeOverlay = overlay;
}

export function closeSpecimenDetail() {
  if (activeOverlay) {
    activeOverlay.remove();
    activeOverlay = null;
  }
  if (keyListener) {
    document.removeEventListener('keydown', keyListener);
    keyListener = null;
  }
  document.body.style.overflow = 'unset';
}
