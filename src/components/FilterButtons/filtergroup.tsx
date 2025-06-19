"use client";

import React, { useState } from 'react';
import FiltroToggle from './filterbuttons';

interface Props {
  direction?: 'row' | 'column'; // por defecto horizontal
}

const items = ['Departamentos', 'Lotes', 'Campos', 'Casas', 'Locales'];

const FilterGroup: React.FC<Props> = ({ direction = 'row' }) => {
  const [activos, setActivos] = useState<string[]>(['Departamentos', 'Lotes']);

  const toggleFiltro = (label: string) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <div
      className={`filtro-contenedor ${direction === 'column' ? 'flex-col' : 'flex-row'}`}
    >
      {items.map((item) => (
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

