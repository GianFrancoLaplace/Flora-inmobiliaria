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
            <div className={`${cactus.className}`}>
               <h1 className={` activePosts ${cactus.className}`}>Publicaciones activas</h1>
                <div></div>
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
                    <div className="container-content-right">
                        <Admns />
                    </div>
                </div>
            </div>
        </div>
    )
}