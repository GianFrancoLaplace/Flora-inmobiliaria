'use client';
import ContactInformation from "@/components/features/ContactInformation/ContactInformation"
import styles from './propertiesstyles.module.css';
import { useState, useEffect } from "react";
import '../ui/fonts';
import PropertyGrid from "@/components/SmallCards/SmallCardsGrid";
import UnifiedFilter from "../../../components/FilterPropertiesAdmin/UnifiedFilter";
import { useSearchParams } from 'next/navigation';

// Tipo para las propiedades que vienen de la API
type Property = {
    id: number;
    address: string;
    city: string;
    state: string;
    price: number;
    description: string;
    type: string;
    characteristics: Array<{
        id: number;
        characteristic: string;
        amount: number;
        category: string;
    }>;
    ubication: string;
};

// Tipo para PropertyGrid (necesitamos mapear de la API a este formato)
type PropertyGridItem = {
    id: number;
    imageUrl: string;
    price: number;
    address: string;
    city: string;
    rentOrSale: string;
    state: string;
    features: {
        rooms: number;
        bedrooms: number;
        bathrooms: number;
    };
};

export default function Properties() {
    const [maxValue, setMaxValue] = useState("");
    const [properties, setProperties] = useState<PropertyGridItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const searchParams = useSearchParams();

    // Función para mapear las propiedades de la API al formato que necesita PropertyGrid
    const mapApiPropertiesToGrid = (apiProperties: Property[]): PropertyGridItem[] => {
        return apiProperties.map(property => {
            // Buscar características específicas
            const rooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('ambiente'))?.amount || 0;
            const bedrooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('dormitorio'))?.amount || 0;
            const bathrooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('baño'))?.amount || 0;
            
            return {
                id: property.id,
                imageUrl: '/backgrounds/fichaBackground.jpg', // Imagen por defecto hasta que tengas las reales
                price: property.price,
                address: property.address,
                city: property.city,
                rentOrSale: property.state, // Aquí ya viene mapeado desde la API
                state: property.state,
                features: {
                    rooms,
                    bedrooms,
                    bathrooms
                }
            };
        });
    };

    // Función para hacer fetch de las propiedades
    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Construir URL con parámetros de búsqueda
            const params = new URLSearchParams();
            
            // Obtener parámetros de la URL
            const operacion = searchParams.get('operacion');
            const tipo = searchParams.get('tipo');
            const maxValueParam = searchParams.get('maxValue');
            
            if (operacion) params.set('operacion', operacion);
            if (tipo) params.set('tipo', tipo);
            if (maxValueParam) params.set('maxValue', maxValueParam);
            
            const url = `/api/properties${params.toString() ? `?${params.toString()}` : ''}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data: Property[] = await response.json();
            
            // Mapear las propiedades al formato que necesita PropertyGrid
            const mappedProperties = mapApiPropertiesToGrid(data);
            setProperties(mappedProperties);
            
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError(err instanceof Error ? err.message : 'Error al cargar las propiedades');
            setProperties([]); // Limpiar propiedades en caso de error
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar propiedades cuando cambian los parámetros de búsqueda
    useEffect(() => {
        fetchProperties();
    }, [searchParams]);

    // Sincronizar maxValue con URL params
    useEffect(() => {
        const maxValueFromUrl = searchParams.get('maxValue');
        if (maxValueFromUrl && maxValueFromUrl !== maxValue) {
            setMaxValue(maxValueFromUrl);
        }
    }, [searchParams]);

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

        if (properties.length === 0) {
            return (
                <div className={styles.noPropertiesContainer}>
                    <p>No se encontraron propiedades que coincidan con los filtros seleccionados.</p>
                </div>
            );
        }

        return <PropertyGrid properties={properties} />;
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