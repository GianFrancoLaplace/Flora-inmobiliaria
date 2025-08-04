// hooks/useCreateProperty.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Tipo que coincide con lo que espera tu API
type CreatePropertyData = {
    description?: string;
    price: number;
    type: string; // PropertyTypeEnum
    category: string; // OperationEnum (RENT/SALE) - mapea desde 'state'
    address?: string;
    ubication?: string;
    city?: string;
    characteristics?: Array<{
        id: number;
        category: string;
        characteristic: string;
        iconUrl?: string;
    }>;
    images?: string[];
};

type CreateStatus = {
    message: string;
    type: 'success' | 'error';
};

export const useCreateProperty = () => {
    const router = useRouter();

    const [isCreating, setIsCreating] = useState(false);
    const [status, setStatus] = useState<CreateStatus | null>(null);

    const createProperty = async (propertyData: CreatePropertyData) => {
        setIsCreating(true);
        setStatus(null);

        // Validaciones básicas
        if (!propertyData.address || propertyData.price <= 0) {
            setStatus({ 
                message: 'Por favor, complete la dirección y asegúrese de que el precio sea mayor a 0.', 
                type: 'error' 
            });
            setIsCreating(false);
            return null;
        }

        try {
            console.log('Enviando datos a la API:', propertyData);

            // ¡IMPORTANTE! Usar el endpoint correcto que coincida con tu backend
            const response = await fetch('/api/properties', { // Cambia a '/api/propiedades' si ese es tu endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            const result = await response.json();
            console.log('Respuesta de la API:', result);

            if (!response.ok) {
                // Manejo mejorado de errores
                let errorMessage = 'Ocurrió un error en el servidor al crear la propiedad.';
                
                if (result.errors) {
                    if (Array.isArray(result.errors)) {
                        errorMessage = `Error de validación: ${result.errors.join(', ')}`;
                    } else if (typeof result.errors === 'object') {
                        errorMessage = `Error de validación: ${Object.values(result.errors).join(', ')}`;
                    } else {
                        errorMessage = `Error: ${result.errors}`;
                    }
                } else if (result.message) {
                    errorMessage = result.message;
                }
                
                throw new Error(errorMessage);
            }

            // Éxito en la creación
            setStatus({ message: '¡Propiedad creada con éxito!', type: 'success' });

            // Redirigir después de mostrar el mensaje de éxito
            if (result.id) {
                setTimeout(() => {
                    router.push(`/propiedades/${result.id}`);
                }, 1500);
            } else {
                // Si no hay ID específico, redirigir a la lista de propiedades
                setTimeout(() => {
                    router.push('/propiedades');
                }, 1500);
            }

            return result;

        } catch (error) {
            console.error('Error al crear la propiedad:', error);
            
            const message = error instanceof Error 
                ? error.message 
                : 'Error desconocido al crear la propiedad.';
                
            setStatus({ message, type: 'error' });
            return null;
        } finally {
            setIsCreating(false);
        }
    };

    // Función para limpiar el estado (útil si quieres resetear mensajes)
    const clearStatus = () => {
        setStatus(null);
    };

    return {
        createProperty,
        isCreating,
        status,
        clearStatus
    };
};