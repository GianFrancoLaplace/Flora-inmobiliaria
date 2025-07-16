// hooks/useCreateProperty.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Importamos el tipo unificado para saber qué estructura de datos manejar.
//import { Property } from '@/types/definitions';

// Tipo para el estado del proceso de creación.
type CreateStatus = {
    message: string;
    type: 'success' | 'error';
};


export const useCreateProperty = () => {
    const router = useRouter();

    // Estados para manejar el proceso de la creación.
    const [isCreating, setIsCreating] = useState(false);
    const [status, setStatus] = useState<CreateStatus | null>(null);


    const createProperty = async (propertyData: Omit<Property, 'id'>) => {
        setIsCreating(true);
        setStatus(null);

        try {
            const response = await fetch('/api/propiedades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            const result = await response.json();

            if (!response.ok) {
                // Captura errores de validación del backend si existen.
                const errorMessage = result.errors
                    ? `Error de validación: ${result.errors.join(', ')}`
                    : 'Ocurrió un error en el servidor al crear la propiedad.';
                throw new Error(errorMessage);
            }

            // Éxito en la creación
            setStatus({ message: '¡Propiedad creada con éxito!', type: 'success' });

            // Opcional: Redirigir a la página de la nueva propiedad después de un momento.
            if (result.id) { // Asumimos que la API devuelve la propiedad creada con su ID.
                setTimeout(() => {
                    router.push(`/propiedades/${result.id}`);
                }, 1500); // Espera 1.5 segundos para que el usuario pueda leer el mensaje de éxito.
            }

            return result as Property; // Devuelve la propiedad creada con su nuevo ID.

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido al crear la propiedad.';
            setStatus({ message, type: 'error' });
            return null; // Devuelve null para indicar que la creación falló.
        } finally {
            setIsCreating(false);
        }
    };

    // El hook devuelve el estado y la función para que el componente los utilice.
    return {
        createProperty,
        isCreating,
        status,
    };
};