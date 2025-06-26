'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import filterstyles from './propertiesstyles.module.css';
import { useState } from "react";
import '../ui/fonts';
import { cactus } from "../ui/fonts";
import styles from "@/app/page.module.css";
import PropertyGrid from "@/components/CardsImages/PropertyImagesGrid";
import UnifiedFilter from "../../components/FilterPropertiesAdmin/filterPropsAdmin";


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
        <div>
            <main>
                <ContactInformation />
            </main>
            <br />
            <div className={filterstyles['properties-layout']}>

                <div className={filterstyles['properties-layout-filter']}>
                    <UnifiedFilter
                        maxValue={maxValue}
                        onMaxValueChange={handleMaxValueChange}
                        filtrosOperacion={filtrosTipoTransaccion}
                        filtrosPropiedad={filtrosTipoPropiedad}
                    />

                </div>

                <div className={styles['properties-layout__main-content']}>
                    <PropertyGrid properties={loadImages} />
                </div>
            </div>

        </div>
    );
}