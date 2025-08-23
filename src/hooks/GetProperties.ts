"use client"

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {images} from "next/dist/build/webpack/config/blocks/images";

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
    images: { id: number; url: string }[];
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

    // mapeo a property grid para seccion propiedades
    const mapApiPropertiesToGrid = (apiProperties: Property[]): PropertyGridItem[] => {
        return apiProperties.map(property => {
            const rooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('Ambientes'))?.amount || 0;
            const bedrooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('Dormitorios'))?.amount || 0;
            const bathrooms = property.characteristics.find(c => c.characteristic.toLowerCase().includes('Baños'))?.amount || 0;

            return {
                id: property.id,
                imageUrl: property.images[0]?.url?.trim(),
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

    // traigo con un fetch las propiedades desde mi route
    const fetchProperties = useCallback(async () => {
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

            const url = `/api/properties${params.toString() ? `?${params.toString()}` : ''}`; //creo la url

            const response = await fetch(url); //llamo al metodo mediante el fetch y la url creada

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
    }, [searchParams]);

    // Función para refrescar las propiedades (útil después de eliminar)
    const refetchProperties = useCallback(async () => {
        await fetchProperties();
    }, [fetchProperties]);

    // Función para eliminar una propiedad del estado local (optimización)
    const removePropertyFromState = useCallback((propertyId: number) => {
        setProperties(prev => prev.filter(prop => prop.id !== propertyId));
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    useEffect(() => {
        const maxValueFromUrl = searchParams.get('maxValue');
        if (maxValueFromUrl !== null && maxValueFromUrl !== maxValue) {
            setMaxValue(maxValueFromUrl);
        }
    }, [searchParams]);


    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setMaxValue(e.target.value);
    };

    const formatPrice = (price: number): string => {
        return `USD ${price.toLocaleString()}`;
    };

    // mapeo las caracteristicas para que se vean en la card
    const formatCharacteristics = (characteristics: Property['characteristics']): string => {
        const rooms = characteristics.find(c => c.category === 'Ambientes')?.amount || 0;
        const bathrooms = characteristics.find(c => c.category === 'Baños')?.amount || 0;
        const bedrooms = characteristics.find(c => c.category === 'Dormitorios' || c.category === 'dormitorios_suite')?.amount || 0;

        return `${rooms} ambientes | ${bedrooms} dormitorios | ${bathrooms} baños`;
    };

    return {
        maxValue,
        properties,
        loading,
        error,

        handleMaxValueChange,
        mapApiPropertiesToGrid,
        fetchProperties,
        refetchProperties, // Nueva función para refrescar
        removePropertyFromState, // Nueva función para optimización
        formatPrice,
        formatCharacteristics,

        // Propiedades mapeadas para PropertyGrid
        mappedProperties: mapApiPropertiesToGrid(properties)
    };
};