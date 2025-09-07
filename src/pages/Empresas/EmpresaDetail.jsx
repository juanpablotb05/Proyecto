import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Empresas.css';

const sampleCompanies = [
  {
    id: 'c1',
    name: 'Constructora Alpha',
    short: 'Soluciones residenciales sostenibles',
    description: 'Constructora Alpha se especializa en viviendas eco-friendly con enfoque en eficiencia energética y materiales locales.',
    images: [
      'https://images.unsplash.com/photo-1565182999561-75a3f2a7a3c6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=01d3b5d1f2a4b6f6b8f2d9e3f4b6c7d8',
      'https://images.unsplash.com/photo-1505842465776-3d1f1b3c6d7e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b7e2f5c6a8b9c0d1e2f3a4b5c6d7e8f',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d'
    ]
  },
  {
    id: 'c2',
    name: 'Diseño Beta',
    short: 'Arquitectura e interiorismo de vanguardia',
    description: 'Diseño Beta crea espacios únicos mezclando funcionalidad y estética contemporánea.',
    images: [
      'https://images.unsplash.com/photo-1505691723518-36a36b4f1b68?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd1234ef567890abcd1234ef567890',
      'https://images.unsplash.com/photo-1475855581690-80accde3ae0a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1234abcd5678ef901234abcd5678ef90'
    ]
  },
  {
    id: 'c3',
    name: 'Proyectos Gamma',
    short: 'Gestión integral de proyectos',
    description: 'Proyectos Gamma acompaña la obra desde la concepción hasta la entrega, optimizando tiempos y costos.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f4e5d6c7b8a9c0d1e2f3a4b5c6d7e8f',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=99887766554433221100aabbccddeeff'
    ]
  }
];

export default function EmpresaDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const company = sampleCompanies.find(c => c.id === id);
  const [index, setIndex] = useState(0);

  if(!company) return (
    <div className="empresas-container">
      <p>Empresa no encontrada. <Link to="/Empresas">Volver</Link></p>
    </div>
  );

  const prev = () => setIndex(i => (i -1 + company.images.length) % company.images.length);
  const next = () => setIndex(i => (i +1) % company.images.length);

  return (
    <div className="empresa-detail">
      <div className="detail-top">
        <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
        <div className="carousel">
          <button className="chev left" onClick={prev}>‹</button>
          <img src={company.images[index]} alt={`${company.name} ${index+1}`} />
          <button className="chev right" onClick={next}>›</button>
        </div>
      </div>

      <div className="detail-bottom">
        <h2>{company.name}</h2>
        <p className="company-short">{company.short}</p>
        <p className="company-desc">{company.description}</p>
        <div className="image-info">Imagen {index + 1} de {company.images.length}</div>
      </div>
    </div>
  );
}
