import React, { useEffect } from 'react';
import './SpecimenDetail.css';
import bugIcon from '../svgs/bug.svg';

function SpecimenDetail({ specimen, onClose }) {
  useEffect(() => {
    if (specimen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [specimen]);

  if (!specimen) return null;

  return (
    <div className="specimen-detail-overlay" onClick={onClose}>
      <div className="specimen-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} title="Cerrar">×</button>
        
        <div className="detail-content">
          <div className="detail-image-section">
            <div className="image-wrapper">
               <img src={bugIcon} alt={specimen.commonName} className="detail-image-placeholder" />
            </div>
            <div className="primary-info">
                <h1>{specimen.commonName}</h1>
                <h2 className="scientific-name-large"><i>{specimen.scientificName}</i></h2>
            </div>
          </div>

          <div className="detail-data-section">
            <div className="data-group">
                <h3>Taxonomía</h3>
                <div className="data-grid">
                    <div className="data-item">
                        <label>Reino</label>
                        <span>Animalia</span>
                    </div>
                    <div className="data-item">
                        <label>Filo</label>
                        <span>Arthropoda</span>
                    </div>
                    <div className="data-item">
                        <label>Clase</label>
                        <span>Insecta</span>
                    </div>
                     <div className="data-item">
                        <label>Orden</label>
                        <span>{specimen.order}</span>
                    </div>
                    <div className="data-item">
                        <label>Familia</label>
                        <span>{specimen.family}</span>
                    </div>
                    <div className="data-item">
                        <label>Género</label>
                        <span>{specimen.scientificName ? specimen.scientificName.split(' ')[0] : 'N/A'}</span>
                    </div>
                    <div className="data-item">
                        <label>Especie</label>
                        <span>{specimen.scientificName ? specimen.scientificName.split(' ')[1] : 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div className="data-group">
                <h3>Datos de Colecta</h3>
                <div className="data-grid">
                    <div className="data-item">
                        <label>Fecha de Colecta</label>
                        <span>{specimen.date}</span>
                    </div>
                    <div className="data-item">
                        <label>País</label>
                        <span>México</span>
                    </div>
                    <div className="data-item">
                        <label>Estado</label>
                        <span>{specimen.state}</span>
                    </div>
                    <div className="data-item">
                        <label>Localidad</label>
                        <span>-- Datos no disponibles --</span>
                    </div>
                    <div className="data-item">
                        <label>Colector</label>
                        <span>{specimen.collector}</span>
                    </div>
                    <div className="data-item">
                        <label>Método de Colecta</label>
                        <span>Manual / Red</span>
                    </div>
                </div>
            </div>

            <div className="data-group">
                <h3>Morfología y Medidas</h3>
                <div className="data-grid">
                    <div className="data-item">
                        <label>Longitud Total</label>
                        <span>-- mm</span>
                    </div>
                    <div className="data-item">
                        <label>Envergadura Alar</label>
                        <span>-- mm</span>
                    </div>
                    <div className="data-item">
                        <label>Colores Principales</label>
                        <span>--</span>
                    </div>
                    <div className="data-item">
                        <label>Estadío</label>
                        <span>Adulto</span>
                    </div>
                    <div className="data-item">
                        <label>Sexo</label>
                        <span>Indeterminado</span>
                    </div>
                </div>
            </div>

            <div className="data-group">
                <h3>Notas Ecológicas</h3>
                <p className="notes-text">
                    Aqui va una descripcion bien durisima del especimen y de sy habitat.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecimenDetail;
