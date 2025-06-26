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

  const toggleFiltro = (label: string) => {
    setActivos((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <div className={styles['filter-group-wrapper']}>
      <h3 className={styles['filter-group-title']}>{title}</h3>
      <div className={styles['filter-container']}>
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
