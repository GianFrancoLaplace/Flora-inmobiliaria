'use client';

import React, { useState } from 'react';
import './filterbuttons.css'; // Importamos los estilos personalizados

const filtros = ['Departamentos', 'Lotes', 'Campos', 'Casas', 'Locales'];

export default function FilterButtons() {
  const [filtrosActivos, setFiltrosActivos] = useState<string[]>([]);

  const toggleFiltro = (tipo: string) => {
    setFiltrosActivos((prev) =>
      prev.includes(tipo)
        ? prev.filter((f) => f !== tipo)
        : [...prev, tipo]
    );
  };

  return (
    <div className="filtro-contenedor">
      {filtros.map((tipo) => (
        <div
          key={tipo}
          className="filtro-boton"
          onClick={() => toggleFiltro(tipo)}
        >
          <span>{tipo}</span>
          <div className={`toggle ${filtrosActivos.includes(tipo) ? 'activo' : ''}`}>
            <div className="toggle-circulo" />
          </div>
        </div>
      ))}
    </div>
  );
}
