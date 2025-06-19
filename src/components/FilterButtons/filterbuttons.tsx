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
    <button className="filtro-boton" onClick={onToggle}>
      {label}
      <span className={`toggle ${isActive ? 'activo' : ''}`}>
        <span className="toggle-circulo"></span>
      </span>
    </button>
  );
};

export default FiltroToggle;
