'use client';

import React, { useState } from 'react';
import FiltroToggle from './FilterButtons';
import styles from './FilterButtons.module.css';

interface Props {
  title: string;
  filters: string[];
}

const FilterGroup: React.FC<Props> = ({ title, filters }) => {
  const [activos, setActivos] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false); // Estado para mobile

  const toggleFiltro = (label: string) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <div className={styles['filter-group-wrapper']}>
      {/* Botón burger para mobile */}
      <button className={styles['burger-button']} onClick={() => setShowFilters((prev) => !prev)}>
        ☰ Filtrar
      </button>
      
      {/* Título para desktop */}
      <h3 className={styles['filter-group-title']}>{title}</h3>
      
      {/* Container de filtros con lógica show/hide */}
      <div className={`${styles['filter-container']} ${showFilters ? styles['show'] : ''}`}>
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
