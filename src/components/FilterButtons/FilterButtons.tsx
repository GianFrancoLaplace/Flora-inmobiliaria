'use client';
import React from 'react';
import './FilterButtons.css';

interface Props {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const FiltroToggle: React.FC<Props> = ({ label, isActive, onToggle }) => {
  return (
    <div>
      <button className="filter-button" onClick={onToggle}>
        {label}
        <span className={`toggle ${isActive ? 'active' : ''}`}>
          <span className="toggle-circle"></span>
        </span>
      </button>
    </div>
  );
};


export default FiltroToggle;
