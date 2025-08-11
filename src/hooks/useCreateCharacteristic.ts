// src/hooks/useCreateCharacteristic.ts
"use client"

import { useState } from 'react';
import { Characteristic, CharacteristicCreate } from '@/types/Characteristic';

export const useCreateCharacteristic = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // La función espera el objeto sin el ID temporal del frontend.
    const createCharacteristic = async (data: Omit<CharacteristicCreate, 'id'>) => {
        setIsCreating(true);
        setError(null);
        try {
            const response = await fetch('/api/characteristics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Error al crear la característica.');
            }
            return await response.json() as Characteristic;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error desconocido.';
            setError(message);
            console.error('Error creando característica:', message);
            return null;
        } finally {
            setIsCreating(false);
        }
    };

    return { createCharacteristic, isCreating, error };
};