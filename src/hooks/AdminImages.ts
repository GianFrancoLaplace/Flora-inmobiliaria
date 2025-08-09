"use client"

import Error from 'next/error';
import { useState } from 'react';

export default function useAdminImages() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createImage = async (propertyId: number, file: File) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`/api/properties/${propertyId}/image`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error interno al crear la imagen');

            return data;
        } catch (error) {
            if (error instanceof Error) {
            console.error(error);
            } else {
                console.error('Unknown error', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (propertyId: number, imageId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/properties/${propertyId}/image/${imageId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error interno al eliminar la imagen');

            return data;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            } else {
                console.error('Unknown error', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        createImage,
        deleteImage,
        loading,
        error,
    };
}
