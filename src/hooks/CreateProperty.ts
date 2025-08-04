
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
        id?: number;
        characteristic: string;
        iconUrl?: string;
        // **CORRECCIÓN AQUÍ:** Permite que category sea string, undefined o null
        category?: string | null;
        // **CORRECCIÓN AQUÍ:** Permite que value_integer sea number, undefined o null
        value_integer?: number | null;
        // **CORRECCIÓN AQUÍ:** Permite que value_text sea string, undefined o null
        value_text?: string | null;
        // **CORRECCIÓN AQUÍ:** Permite que data_type sea string o undefined
        data_type?: string;
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
        if (!propertyData.address || propertyData.address === "Dirección") {
            setStatus({
                message: 'Por favor, complete la dirección de la propiedad.',
                type: 'error'
            });
            setIsCreating(false);
            return null;
        }

        if (!propertyData.price || propertyData.price <= 0) {
            setStatus({
                message: 'Por favor, ingrese un precio válido mayor a 0.',
                type: 'error'
            });
            setIsCreating(false);
            return null;
        }

        // Limpiar datos antes de enviar
        const cleanedData = {
            ...propertyData,
            description: propertyData.description === "Descripción" ? "" : propertyData.description,
            city: propertyData.city === "Ciudad" ? "" : propertyData.city,
            ubication: propertyData.ubication === " " ? "" : propertyData.ubication,
            // Filtrar características vacías
            characteristics: (propertyData.characteristics || []).filter(char =>
                (char.value_text && char.value_text.trim() !== "") ||
                (char.value_integer !== undefined && char.value_integer !== null)
            ),
            // Filtrar imágenes vacías
            images: (propertyData.images || []).filter(img => img && img.trim() !== "")
        };

        try {
            console.log('Enviando datos a la API:', cleanedData);

            // Usar el endpoint que coincide con tu backend actual
            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanedData),
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
                        const errorMessages = Object.entries(result.errors)
                            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                            .join('; ');
                        errorMessage = `Errores de validación: ${errorMessages}`;
                    } else {
                        errorMessage = `Error: ${result.errors}`;
                    }
                } else if (result.message) {
                    errorMessage = result.message;
                } else if (result.error) {
                    errorMessage = result.error;
                }

                throw new Error(errorMessage);
            }

            // Éxito en la creación
            setStatus({ message: '¡Propiedad creada con éxito!', type: 'success' });

            // Redirigir después de mostrar el mensaje de éxito
            if (result.id) {
                setTimeout(() => {
                    router.push(`/propiedades/${result.id}`);
                }, 2000); // Aumenté el tiempo para que el usuario pueda leer el mensaje
            } else if (result.data && result.data.id) {
                setTimeout(() => {
                    router.push(`/propiedades/${result.data.id}`);
                }, 2000);
            } else {
                // Si no hay ID específico, redirigir a la lista de propiedades
                setTimeout(() => {
                    router.push('/propiedades');
                }, 2000);
            }

            return result.data || result;

        } catch (error) {
            console.error('Error al crear la propiedad:', error);

            let message = 'Error desconocido al crear la propiedad.';

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }

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

    // Función para validar datos antes de enviar
    const validatePropertyData = (data: CreatePropertyData): string[] => {
        const errors: string[] = [];

        if (!data.address || data.address.trim() === "" || data.address === "Dirección") {
            errors.push("La dirección es obligatoria");
        }

        if (!data.price || data.price <= 0) {
            errors.push("El precio debe ser mayor a 0");
        }

        if (!data.type) {
            errors.push("El tipo de propiedad es obligatorio");
        }

        if (!data.category) {
            errors.push("La operación (venta/alquiler) es obligatoria");
        }

        return errors;
    };

    return {
        createProperty,
        isCreating,
        status,
        clearStatus,
        validatePropertyData
    };
};