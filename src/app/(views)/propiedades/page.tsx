'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import styles from './propertiesstyles.module.css';
import { useState } from "react";
import '../ui/fonts';
import PropertyGrid from "@/components/SmallCards/SmallCardsGrid";
import UnifiedFilter from "../../../components/FilterPropertiesAdmin/UnifiedFilter";


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
        <div className={styles.conteinerPropiedades}>
            <main>
                <ContactInformation />
            </main>
            <br />
            <div className={styles.propertiesLayout}>

                <div className={styles.propertiesLayoutFilter}>
                    <UnifiedFilter
                        maxValue={maxValue}
                        onMaxValueChange={handleMaxValueChange}
                        filtrosOperacion={filtrosTipoTransaccion}
                        filtrosPropiedad={filtrosTipoPropiedad}
                    />

                </div>

                 <div className={styles.propertiesLayoutMainContent}>
                    <PropertyGrid properties={loadImages} />
                </div>
            </div>

        </div>
    );
}