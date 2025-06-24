'use client';
import Admns from '@/components/Administracion/Administracion'
import ContactInformation from '@/components/features/ContactInformation/ContactInformation'
import FilterGroup from '@/components/FilterButtons/filtergroup'
import { useState } from 'react';
import '../Propiedades/properties-styles.css'
import '../ui/fonts'
import { cactus } from '../ui/fonts';
import './Styles.css';


export default function FichaPropiedad() {
    const [maxValue, setMaxValue] = useState("");

    // Opciones de filtros
    const filtrosTipoTransaccion = ["Quiero comprar", "Quiero alquilar"];
    const filtrosTipoPropiedad = [
        "Casas",
        "Departamentos",
        "Locales",
        "Lotes",
        "Campos",
    ];


    // Handler para input
    function handleMaxValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMaxValue(e.target.value);
    }

   return (
  <div>
    <main>
      <ContactInformation />
    </main>
    <br />
    <div className="properties-layout">
      {/* Filtros a la izquierda */}
      <div className="container-filter-properties">
        {/* Input para valor máximo */}
        <div className="filter-container">
          <div className="flex-col">
            <label
              htmlFor="maxValueInput"
              className={`filter-section-title ${cactus.className} antialiased`}
            >
              Valor máximo
            </label>
            <input
              id="maxValueInput"
              type="number"
              className="max-value-input"
              placeholder="Escribe el valor máximo"
              value={maxValue}
              onChange={handleMaxValueChange}
            />
          </div>
        </div>

        <div className="filters-column">
          <FilterGroup
            title="Filtrar por operación"
            filters={filtrosTipoTransaccion}
            direction="column"
          />

          <FilterGroup
            title="Filtrar por inmueble"
            filters={filtrosTipoPropiedad}
            direction="column"
          />
        </div>
      </div>

      {/* Cards y botones a la derecha */}
      <div className="container-content-right">
        <Admns />
      </div>
    </div>
  </div>
);
}