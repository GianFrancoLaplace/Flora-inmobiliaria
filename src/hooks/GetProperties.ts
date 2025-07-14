import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Tipo para las propiedades de la API
export type Property = {
    id: number;
    address: string;
    city: string;
    state: string;
    price: number;
    description: string;
    type: string;
    characteristics: {
        id: number;
        characteristic: string;
        amount: number;
        category: string;
    }[];
    ubication: string;
};

// Tipo para PropertyGrid
export type PropertyGridItem = {
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

export const useUnifiedFilter = () => {
    const [maxValue, setMaxValue] = useState("");
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Función para mapear propiedades de API a PropertyGrid
    const mapApiPropertiesToGrid = (apiProperties: Property[]): PropertyGridItem[] => {
        return apiProperties.map(property => {
            const rooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('ambiente'))?.amount || 0;
            const bedrooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('dormitorio'))?.amount || 0;
            const bathrooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('baño'))?.amount || 0;
            
            return {
                id: property.id,
                imageUrl: '/backgrounds/fichaBackground.jpg',
                price: property.price,
                address: property.address,
                city: property.city,
                rentOrSale: property.state,
                state: property.state,
                features: {
                    rooms,
                    bedrooms,
                    bathrooms
                }
            };
        });
    };

    // Función para hacer fetch de propiedades
    const fetchProperties = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const params = new URLSearchParams();
            
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
            setProperties(data);
            
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError(err instanceof Error ? err.message : 'Error al cargar las propiedades');
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar propiedades cuando cambian los parámetros
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

    // Handler para cambio de valor máximo
    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxValue(e.target.value);
    };

    // Función para formatear precio
    const formatPrice = (price: number): string => {
        return `USD ${price.toLocaleString()}`;
    };

    // Función para formatear características
    const formatCharacteristics = (characteristics: Property['characteristics']): string => {
        const rooms = characteristics.find(c => c.category === 'ROOMS')?.amount || 0;
        const bathrooms = characteristics.find(c => c.category === 'BATHROOMS')?.amount || 0;
        const bedrooms = characteristics.find(c => c.category === 'BEDROOMS')?.amount || 0;
        
        return `${rooms} ambientes | ${bedrooms} dormitorios | ${bathrooms} baños`;
    };

    return {
        // Estados
        maxValue,
        properties,
        loading,
        error,
        
        // Funciones
        handleMaxValueChange,
        mapApiPropertiesToGrid,
        fetchProperties,
        formatPrice,
        formatCharacteristics,
        
        // Propiedades mapeadas para PropertyGrid
        mappedProperties: mapApiPropertiesToGrid(properties)
    };
};