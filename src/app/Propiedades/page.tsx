'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import FilterGroup from "../../components/FilterButtons/filtergroup";
import './properties-styles.css';
import { useState } from "react";

export default function Properties() {
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
            <div className="layout-propiedades">
                <div className="container-filter-properties">
                    {/* Input para valor máximo */}
                    <div className="filtro-contenedor">
                        <div className="flex-col">
                            <label htmlFor="maxValueInput" className="filter-section-title">Valor máximo</label>
                            <input
                                id="maxValueInput"
                                type="number"
                                className="input-valor-maximo"
                                placeholder="Escribe el valor máximo"
                                value={maxValue}
                                onChange={handleMaxValueChange}
                            />
                        </div>
                    </div>

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

                <div className="container-listado-propiedades">
                    <p>Futuro listado de propiedades:</p>
                    <p>Valor máximo seleccionado: {maxValue}</p>
                </div>
            </div>
        </div>
    );
}