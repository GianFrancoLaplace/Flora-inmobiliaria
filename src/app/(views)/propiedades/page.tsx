// app/(views)/propiedades/page.tsx

'use client';
import { Suspense } from 'react'; // 1. IMPORTA Suspense
import ContactInformation from "@/components/features/ContactInformation/ContactInformation";
import styles from './propertiesstyles.module.css';
import '../ui/fonts';
import PropertyGrid from "@/components/SmallCards/SmallCardsGrid";
import UnifiedFilter from "../../../components/FilterPropertiesAdmin/UnifiedFilter";
import { useUnifiedFilter } from "@/hooks/GetProperties";

function PropertiesContent() {
    const {
        maxValue,
        loading,
        error,
        mappedProperties,
        handleMaxValueChange,
        fetchProperties
    } = useUnifiedFilter();

    const filtrosTipoTransaccion = ["Quiero comprar", "Quiero alquilar"];
    const filtrosTipoPropiedad = ["Casas", "Departamentos", "Locales", "Lotes", "Campos"];

    const renderMainContent = () => {
        if (loading) {
            return <div className={styles.loadingContainer}><h3>Cargando propiedades...</h3></div>;
        }
        if (error) {
            return (
                <div className={styles.errorContainer}>
                    <h3>Error: {error}</h3>
                    <button onClick={fetchProperties} className={styles.retryButton}>Intentar de nuevo</button>
                </div>
            );
        }
        if (mappedProperties.length === 0) {
            return <div className={styles.noPropertiesContainer}><p>No se encontraron propiedades.</p></div>;
        }
        return <PropertyGrid properties={mappedProperties} />;
    };

    return (
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
                {renderMainContent()}
            </div>
        </div>
    );
}


export default function Properties() {
    return (
        <div className={styles.conteinerPropiedades}>
            <main>
                <ContactInformation />
            </main>
            <br />
            {/* Envolvemos el contenido que depende del cliente en Suspense */}
            <Suspense fallback={<div className={styles.loadingContainer}><h3>Cargando filtros y propiedades...</h3></div>}>
                <PropertiesContent />
            </Suspense>
        </div>
    );
}