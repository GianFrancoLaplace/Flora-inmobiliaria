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
  const [showFilters, setShowFilters] = useState(false);

  const toggleFiltro = (label: string) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <div className={styles.filterGroupWrapper}>
      <button className={styles.burgerButton} onClick={() => setShowFilters((prev) => !prev)}>
        ☰ Filtrar
      </button>

      <h3 className={styles.filterGroupTitle}>{title}</h3>

      <div className={`${styles.filterContainer} ${showFilters ? styles.show : ''}`}>
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
