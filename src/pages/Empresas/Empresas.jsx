import React from 'react';
import { Link } from 'react-router-dom';
import './Empresas.css';

const sampleCompanies = [
  {
    id: 'c1',
    name: 'Constructora Alpha',
    short: 'Soluciones residenciales sostenibles',
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
    images: [
      'https://images.unsplash.com/photo-1505691723518-36a36b4f1b68?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd1234ef567890abcd1234ef567890',
      'https://images.unsplash.com/photo-1475855581690-80accde3ae0a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1234abcd5678ef901234abcd5678ef90'
    ]
  },
  {
    id: 'c3',
    name: 'Proyectos Gamma',
    short: 'Gestión integral de proyectos',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f4e5d6c7b8a9c0d1e2f3a4b5c6d7e8f',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=99887766554433221100aabbccddeeff'
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
            <img src={c.images[0]} alt={c.name} className="company-image" onError={(e)=>{e.currentTarget.src='/src/assets/Logo.jpeg'}} />
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
