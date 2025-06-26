"use client";

import React, { useState } from 'react';
import FiltroToggle from './FilterButtons';

interface Props {
  title: string;
  filters: string[];
  direction?: 'row' | 'column';
}

const FilterGroup: React.FC<Props> = ({ title, filters, direction = 'row' }) => {
  const [activos, setActivos] = useState<string[]>([]);

  const toggleFiltro = (label: string) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const displayFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <div className={`filter-group-wrapper`}>
      {/* Botón hamburguesa (solo visible en mobile) */}
      <button className="burger-button" onClick={displayFilters}>
        ☰ Filtrar
      </button>

      <div
        className={`filter-container ${direction === 'column' ? 'flex-col' : 'flex-row'} ${showFilters ? 'show' : ''}`}
        style={{ marginBottom: '1rem' }}
      >
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>

        {filters.map((item) => (
          <FiltroToggle
            key={item}
            label={item}
            isActive={activos.includes(item)}
            onToggle={() => toggleFiltro(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;