import { useState } from "react";
import { Property } from "@prisma/client";

export const DeleteProperty = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const deleteProperty = async (id: number): Promise<boolean> => {
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al eliminar la propiedad");
            }

            return true;
        } catch (e) {
            setDeleteError(
                e instanceof Error ? e.message : "Error de conexión al eliminar la propiedad"
            );
            return false;
        } finally {
            setIsDeleting(false);
        }

    }
    const clearError = () => {
        setDeleteError(null);
    };

    return {
        deleteProperty,
        isDeleting,
        deleteError,
        clearError,
    };
}