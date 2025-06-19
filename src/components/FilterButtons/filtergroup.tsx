"use client";

import React, { useState } from 'react';
import FiltroToggle from './filterbuttons';

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

  return (
    <div
      className={`filtro-contenedor ${direction === 'column' ? 'flex-col' : 'flex-row'}`}
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
  );
};

export default FilterGroup;


