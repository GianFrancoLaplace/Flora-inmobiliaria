'use client';
import React from 'react';
import './filterbuttons.css'; 

interface Props {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const FiltroToggle: React.FC<Props> = ({ label, isActive, onToggle }) => {
  return (
  <button className="filter-button" onClick={onToggle}>
    {label}
    <span className={`toggle ${isActive ? 'active' : ''}`}>
      <span className="toggle-circle"></span>
    </span>
  </button>
);
};

export default FiltroToggle;
