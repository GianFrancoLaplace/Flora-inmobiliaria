'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import FilterGroup from "../../components/FilterButtons/FilterGroup";
import './properties-styles.css';
import { useState } from "react";
import '../ui/fonts';
import { cactus } from "../ui/fonts";
import styles from "@/app/page.module.css";
import PropertyGrid from "@/components/SmallCards/SmallCardsGrid";


export default function Properties() {
    const [maxValue, setMaxValue] = useState("");

    const loadImages = [
        {
            id: 1, imageUrl: '/backgrounds/fichaBackground.jpg', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 2, imageUrl: '/backgrounds/fichaBackground.jpg', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 3, imageUrl: '/backgrounds/fichaBackground.jpg', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 4, imageUrl: '/backgrounds/fichaBackground.jpg', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 5, imageUrl: '/backgrounds/fichaBackground.jpg', price: 340000, rentOrSale: 'VENTA',
            address: 'San Martin 567', city: 'Tandil', state: 'disponible',
            features: { rooms: 7, bedrooms: 3, bathrooms: 2 },
        },
        {
            id: 6, imageUrl: '/backgrounds/fichaBackground.jpg', price: 340000, rentOrSale: 'VENTA',
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
        <div className={"conteinerPropiedades"}>
            <main>
                <ContactInformation />
            </main>
            <br />
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
                            <div className="input-with-search-container">
                                <input
                                    id="maxValueInput"
                                    type="number"
                                    className="max-value-input"
                                    placeholder="Escribe el valor máximo"
                                    value={maxValue}
                                    onChange={handleMaxValueChange}
                                />
                                <button className="search-button" type="button">
                                    <img src="/icons/search.png" alt="Buscar" className="search-icon" />
                                </button>
                            </div>
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

                <div className={styles['properties-layout__main-content']}>
                    <PropertyGrid properties={loadImages} />
                </div>
            </div>

        </div>
    );
}