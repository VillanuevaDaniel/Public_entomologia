import { useEffect } from 'react';
import './FichaTecnica.css';
import bugIcon from '../svgs/bug.svg';

function FichaTecnica({ specimen, onClose }) {
  useEffect(() => {
    if (specimen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [specimen]);

  if (!specimen) return null;

  const val = (value) => value || '—';
  const year = specimen.date ? specimen.date.split('/').pop() : '—';

  return (
    <div className="ft-overlay" onClick={onClose}>
      <div className="ft-modal" onClick={e => e.stopPropagation()}>
        <button className="ft-close" onClick={onClose} title="Cerrar">×</button>

        <div className="ft-scroll">
          {/* Header */}
          <header className="ft-header">
            <h1 className="ft-title">FICHA TÉCNICA</h1>
            <p className="ft-subtitle">Colección Entomológica</p>
            <div className="ft-header-row">
              <div className="ft-field">
                <span className="ft-label">Colector</span>
                <span className="ft-value">{val(specimen.collector)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Año de Catalogación</span>
                <span className="ft-value">{val(specimen.anoCatalogacion)}</span>
              </div>
            </div>
          </header>

          {/* Nombre e Imagen */}
          <section className="ft-section ft-hero-section">
            <div className="ft-hero-info">
              <h2 className="ft-common-name">{specimen.commonName}</h2>
              <p className="ft-scientific-name"><i>{specimen.scientificName}</i></p>
              <div className="ft-taxonomy-pills">
                <span className="ft-pill ft-pill-order">{specimen.order}</span>
                <span className="ft-pill ft-pill-family">{specimen.family}</span>
                {specimen.tribu && <span className="ft-pill ft-pill-tribu">{specimen.tribu}</span>}
              </div>
            </div>
            <div className="ft-hero-image">
              <img src={bugIcon} alt={specimen.commonName} className="ft-bug-icon" />
            </div>
          </section>

          {/* Datos de Identificación */}
          <section className="ft-section">
            <h3 className="ft-section-title">Datos de Identificación</h3>
            <div className="ft-grid ft-grid-2">
              <div className="ft-field">
                <span className="ft-label">Nombre Común</span>
                <span className="ft-value">{val(specimen.commonName)}</span>
              </div>
              {/* <div className="ft-field">
                <span className="ft-label">No. Individuo</span>
                <span className="ft-value">{val(specimen.noIndividuo)}</span>
              </div> */}
              <div className="ft-field">
                <span className="ft-label">Colección</span>
                <span className="ft-value">{val(specimen.coleccion)}</span>
              </div>
              {/* <div className="ft-field">
                <span className="ft-label">Tipos</span>
                <span className="ft-value">{val(specimen.tipos)}</span>
              </div> */}
            </div>
          </section>

          {/* Datos de Colecta */}
          <section className="ft-section">
            <h3 className="ft-section-title">Datos de Colecta</h3>
            <div className="ft-grid ft-grid-3">
              <div className="ft-field">
                <span className="ft-label">Año</span>
                <span className="ft-value">{year}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">País</span>
                <span className="ft-value">{val(specimen.pais)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Estado</span>
                <span className="ft-value">{val(specimen.state)}</span>
              </div>
            </div>
            <div className="ft-grid ft-grid-2">
              <div className="ft-field">
                <span className="ft-label">Localidad</span>
                <span className="ft-value">{val(specimen.localidad)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Fecha de Colecta</span>
                <span className="ft-value">{val(specimen.date)}</span>
              </div>
            </div>
            <div className="ft-grid ft-grid-2">
              <div className="ft-field">
                <span className="ft-label">Altitud</span>
                <span className="ft-value">{specimen.altitud ? `${specimen.altitud} m` : '—'}</span>
              </div>
              {/* <div className="ft-field">
                <span className="ft-label">Colector</span>
                <span className="ft-value">{val(specimen.collector)}</span>
              </div> */}
            </div>
          </section>

          {/* Ubicación Geográfica */}
          <section className="ft-section">
            <h3 className="ft-section-title">Ubicación Geográfica</h3>
            <div className="ft-grid ft-grid-2">
              <div className="ft-field">
                <span className="ft-label">Latitud N</span>
                <span className="ft-value">{specimen.latitudN ? `${specimen.latitudN}°` : '—'}</span>
              </div>
              {/* <div className="ft-field">
                <span className="ft-label">Latitud S</span>
                <span className="ft-value">{specimen.latitudS ? `${specimen.latitudS}°` : '—'}</span>
              </div> */}
            </div>
          </section>

          {/* Datos Biológicos */}
          <section className="ft-section">
            <h3 className="ft-section-title">Datos Biológicos</h3>
            <div className="ft-grid ft-grid-2">
              <div className="ft-field">
                <span className="ft-label">Tribu</span>
                <span className="ft-value">{val(specimen.tribu)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Planta Hospedera</span>
                <span className="ft-value ft-italic">{val(specimen.plantaHospedera)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Familia / Hospedera</span>
                <span className="ft-value">{val(specimen.familiaHospedera)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Organismo Huésped / Presa</span>
                <span className="ft-value ft-italic">{val(specimen.organismoHuesped)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Familia / Huésped / Presa</span>
                <span className="ft-value">{val(specimen.familiaHuesped)}</span>
              </div>
            </div>
          </section>

          {/* Catalogación y Registro */}
          <section className="ft-section">
            <h3 className="ft-section-title">Catalogación</h3>
            <div className="ft-grid ft-grid-2">
              <div className="ft-field">
                <span className="ft-label">Determinador</span>
                <span className="ft-value">{val(specimen.determinador)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Año de Catalogación</span>
                <span className="ft-value">{val(specimen.anoCatalogacion)}</span>
              </div>
              {/* <div className="ft-field">
                <span className="ft-label">Préstamos</span>
                <span className="ft-value">{val(specimen.prestamos)}</span>
              </div>
              <div className="ft-field">
                <span className="ft-label">Envío</span>
                <span className="ft-value">{val(specimen.envio)}</span>
              </div> */}
            </div>
            <div className="ft-grid ft-grid-1">
              <div className="ft-field">
                <span className="ft-label">Cita Bibliográfica</span>
                <span className="ft-value">{val(specimen.citaBibliografica)}</span>
              </div>
            </div>
          </section>

          {/* Datos Ecológicos / Taxonómicos */}
          <section className="ft-section">
            <h3 className="ft-section-title">Datos Ecológicos / Taxonómicos</h3>
            <div className="ft-notes">
              {specimen.datosEcologicos || 'Sin datos ecológicos registrados.'}
            </div>
          </section>

          {/* Fotografía */}
          <section className="ft-section">
            <h3 className="ft-section-title">Fotografía</h3>
            <div className="ft-photo-area">
              <img src={bugIcon} alt={specimen.commonName} className="ft-photo-placeholder" />
              <p className="ft-photo-caption">Fotografía no disponible</p>
            </div>
          </section>

          {/* Footer */}
          <footer className="ft-footer">
            <span className="ft-footer-collection">{val(specimen.coleccion)}</span>
            <span className="ft-footer-id">{specimen.id}</span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default FichaTecnica;
