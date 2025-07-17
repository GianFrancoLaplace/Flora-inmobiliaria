import { useState } from 'react';

export default function useAdminImages() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createImage = async (propertyId: number, url: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/properties/${propertyId}/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error interno al crear la imagen');

            return data;
        } catch (err: any) {
            setError(err.message);
            console.error(err);
            return null;
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
        } catch (err: any) {
            setError(err.message);
            console.error(err);
            return null;
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
