// src/hooks/useUpdateProperty.ts
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property, PropertyUpdateData } from '@/types/Property';

type UpdateStatus = {
    message: string;
    type: 'success' | 'error';
};

export const useUpdateProperty = () => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState<UpdateStatus | null>(null);

    const updateProperty = async (id: number, propertyData: PropertyUpdateData) => {
        setIsUpdating(true);
        setStatus(null);

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMessage = result.errors
                    ? `Error de validación: ${result.errors.map((e: any) => e.message).join(', ')}`
                    : result.message || 'Ocurrió un error en el servidor.';
                throw new Error(errorMessage);

            }

            setStatus({ message: '¡Propiedad actualizada con éxito!', type: 'success' });

            // Opcional: Refrescar la página para ver los cambios
            router.refresh();

            return result.property as Property;

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la propiedad.';
            setStatus({ message, type: 'error' });
            return null;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        updateProperty,
        isUpdating,
        status,
    };
};