import React from 'react';
import { Link } from 'react-router-dom';
import logoPlaceholder from '../../assets/Logo.jpeg';
import './Empresas.css';

const sampleCompanies = [
  {
    id: 'c1',
    name: 'Constructora Alpha',
    short: 'Soluciones residenciales sostenibles',
    images: [
      'https://images.unsplash.com/photo-1505691723518-36a36b4f1b68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493787039807-1f8e2f0d1a0f?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'c2',
    name: 'Diseño Beta',
    short: 'Arquitectura e interiorismo de vanguardia',
    images: [
      'https://images.unsplash.com/photo-1490806843531-1d0d36f7f1b9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'c3',
    name: 'Proyectos Gamma',
    short: 'Gestión integral de proyectos',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export default function Empresas() {
  return (
    <div className="empresas-container">
      <header className="empresas-header">
        <h1>Empresas</h1>
        <p>Explora empresas y sus proyectos</p>
      </header>

      <div className="empresas-grid">
        {sampleCompanies.map((c) => (
          <Link to={`/Empresas/${c.id}`} className="company-card" key={c.id}>
            <img src={c.images[0]} alt={c.name} className="company-image" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src=logoPlaceholder }} loading="lazy" />
            <div className="company-body">
              <h3>{c.name}</h3>
              <p>{c.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
