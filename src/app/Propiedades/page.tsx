'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import FilterGroup from "../../components/FilterButtons/filtergroup";
import './properties-styles.css';
import { useState } from "react";
import '../ui/fonts';
import { cactus } from "../ui/fonts";
import styles from "@/app/page.module.css";
import PropertyGrid from "@/components/CardsImages/PropertyImagesGrid";


export default function Properties() {
    const [maxValue, setMaxValue] = useState("");

    const loadImages = [
        {
            id: 1, imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 2, imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 3, imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 4, imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 5, imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 6, imageUrl: '/images/casaEjemplo.png', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
    ];
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
                <ContactInformation/>
            </main>
            <br/>
            <div className="properties-layout">
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

                <div className={styles['properties-layout']}>
                    <main className={styles['properties-layout__main-content']}>
                        <PropertyGrid properties={loadImages}/>
                    </main>
                </div>
            </div>

        </div>
    );
}