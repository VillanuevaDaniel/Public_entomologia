import { useState } from 'react';
import { specimens } from '../data/specimens';
import './Library.css';
import bugIcon from '../svgs/bug.svg';
import FichaTecnica from '../components/FichaTecnica';

function Library() {
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
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
    <div className="library-container">
      <header className="library-header modern-header">
        <h3>RECURSOS DIGITALES</h3>
        <h2>FICHAS TÉCNICAS</h2>
        <p className="section-description">Catálogo de especímenes recolectados para investigación y estudio. Explore las fichas técnicas para conocer más sobre ellos.</p>
      </header>

      <div className="gallery-controls">
        <input 
          type="text" 
          id="commonNameInputLib" 
          className="brutal-input" 
          placeholder="NOMBRE COMÚN..."
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
        />
        <input 
          type="text" 
          id="scientificNameInputLib" 
          className="brutal-input" 
          placeholder="NOMBRE CIENTÍFICO..."
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        />
        <select 
          id="familyFilterLib" 
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

      <div className="cards-grid">
        {filteredSpecimens.map((specimen) => (
          <div 
            key={specimen.id} 
            className="insect-card" 
            onClick={() => setSelectedSpecimen(specimen)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && setSelectedSpecimen(specimen)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-image-container">
                <div className="image-placeholder">
                    <img src={bugIcon} alt={specimen.commonName} className="placeholder-icon" />
                </div>
            </div>

            <div className="card-body">
              <h2 className="common-name">{specimen.commonName}</h2>
              <h3 className="scientific-name"><i>{specimen.scientificName}</i></h3>
              
              <div className="card-details">
                <div className="detail-row">
                  <span className="label">Orden:</span>
                  <span className="value">{specimen.order}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Familia:</span>
                  <span className="value">{specimen.family}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Estado:</span>
                  <span className="value">{specimen.state}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Fecha:</span>
                  <span className="value">{specimen.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FichaTecnica
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
      />
    </div>
  );
}

export default Library;
