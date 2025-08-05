// src/hooks/useUpdateCharacteristic.ts
'use client';

import { useState } from 'react';

type UpdatePayload = {
    value_integer?: number;
    value_text?: string;
};

export const useUpdateCharacteristic = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateCharacteristic = async (id: number, data: UpdatePayload) => {
        setIsUpdating(true);
        setError(null);
        try {
            const response = await fetch(`/api/characteristics/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Error al actualizar la característica.');
            }

            return await response.json();

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error desconocido.';
            setError(message); // Podrías querer un manejo de errores más granular
            console.error(`Error actualizando característica ${id}:`, message);
            return null;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateCharacteristic, isUpdating, error };
};