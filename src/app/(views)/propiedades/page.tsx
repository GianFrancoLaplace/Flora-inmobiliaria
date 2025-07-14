'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import styles from './propertiesstyles.module.css';
import '../ui/fonts';
import PropertyGrid from "@/components/SmallCards/SmallCardsGrid";
import UnifiedFilter from "../../../components/FilterPropertiesAdmin/UnifiedFilter";
import { useUnifiedFilter } from "@/hooks/GetProperties";

export default function Properties() {
    const {
        maxValue,
        loading,
        error,
        mappedProperties,
        handleMaxValueChange,
        fetchProperties
    } = useUnifiedFilter();

    // Opciones de filtros
    const filtrosTipoTransaccion = ["Quiero comprar", "Quiero alquilar"];
    const filtrosTipoPropiedad = [
        "Casas",
        "Departamentos", 
        "Locales",
        "Lotes",
        "Campos",
    ];

    // Render del contenido principal
    const renderMainContent = () => {
        if (loading) {
            return (
                <div className={styles.loadingContainer}>
                    <p>Cargando propiedades...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className={styles.errorContainer}>
                    <p>Error al cargar las propiedades: {error}</p>
                    <button onClick={fetchProperties} className={styles.retryButton}>
                        Intentar de nuevo
                    </button>
                </div>
            );
        }

        if (mappedProperties.length === 0) {
            return (
                <div className={styles.noPropertiesContainer}>
                    <p>No se encontraron propiedades que coincidan con los filtros seleccionados.</p>
                </div>
            );
        }

        return <PropertyGrid properties={mappedProperties} />;
    };

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
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
}