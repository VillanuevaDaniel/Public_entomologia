import { useState } from 'react';
import './Gallery.css';
import { specimens } from '../data/specimens';

function Gallery() {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');


  const families = [...new Set(specimens.map(s => s.family))].sort();

  const filteredSpecimens = specimens.filter(specimen => {
    const commonSafe = specimen.commonName || '';
    const scientificSafe = specimen.scientificName || '';
    
    const matchesCommon = !commonName || commonSafe.toLowerCase().includes(commonName.toLowerCase());
    const matchesScientific = !scientificName || scientificSafe.toLowerCase().includes(scientificName.toLowerCase());
    const matchesFamily = !familyFilter || specimen.family === familyFilter;
    
    return matchesCommon && matchesScientific && matchesFamily; 
  });

  return (
    <section id="gallery" className="gallery-page">
      <div className="gallery-section">
        <div className="block-header modern-header">
          <h3>GALERÍA DE ESPECÍMENES</h3>
          <h2>COLECCIÓN FOTOGRÁFICA</h2>
          <p className="section-description">
            Explora visualmente nuestra colección de especímenes.
          </p>
        </div>
        
        <div className="gallery-controls">
          <input 
            type="text" 
            id="commonNameInput" 
            className="brutal-input" 
            placeholder="NOMBRE COMÚN..."
            value={commonName}
            onChange={(e) => setCommonName(e.target.value)}
          />
          <input 
            type="text" 
            id="scientificNameInput" 
            className="brutal-input" 
            placeholder="NOMBRE CIENTÍFICO..."
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
          />
          <select 
            id="familyFilter" 
            className="brutal-select"
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
          >
            <option value="">TODAS LAS FAMILIAS</option>
            {families.map(family => (
              <option key={family} value={family}>{family.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <section className="gallery-grid">
          {filteredSpecimens.map(specimen => (
            <div key={specimen.id} className="gallery-item" data-order={specimen.order}>
              <span>{specimen.commonName}</span>
              <div className="specimen-info">{specimen.order.toUpperCase()}</div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}

export default Gallery;
