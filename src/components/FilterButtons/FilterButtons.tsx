'use client';
import React from 'react';
import styles from './FilterButtons.module.css';

interface Props {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const FiltroToggle: React.FC<Props> = ({ label, isActive, onToggle }) => {
  return (
    <button className={styles.filterButton} onClick={onToggle}>
      {label}
      <span className={`${styles.toggle} ${isActive ? styles.active : ''}`}>
        <span className={styles.toggleCircle}></span>
      </span>
    </button>
  );
};

export default FiltroToggle;
