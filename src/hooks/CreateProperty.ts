// hooks/useCreateProperty.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

type CreatePropertyData = {
    description?: string;
    price: number;
    type: string;
    category: string;
    address?: string;
    ubication?: string;
    city?: string;
    characteristics?: Array<{
        id?: number;
        characteristic: string;
        iconUrl?: string;
        category?: string | null;
        value_integer?: number | null;
        value_text?: string | null;
        data_type?: string;
    }>;
    images?: File[]; // array de objetos con `file: File`
};

type CreateStatus = {
    message: string;
    type: "success" | "error";
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
            setStatus({ message: "Por favor, complete la dirección de la propiedad.", type: "error" });
            setIsCreating(false);
            return null;
        }
        if (!propertyData.price || propertyData.price <= 0) {
            setStatus({ message: "Por favor, ingrese un precio válido mayor a 0.", type: "error" });
            setIsCreating(false);
            return null;
        }

        // Limpiar datos
        const cleanedData: any = {
            ...propertyData,
            description: propertyData.description === "Descripción" ? "" : propertyData.description,
            city: propertyData.city === "Ciudad" ? "" : propertyData.city,
            ubication: propertyData.ubication === " " ? "" : propertyData.ubication,
            characteristics: (propertyData.characteristics || []).filter(
                (char) =>
                    (char.value_text && String(char.value_text).trim() !== "") ||
                    (char.value_integer !== undefined && char.value_integer !== null)
            )
        };

        try {
            console.log("Enviando datos a la API (solo propiedad):", cleanedData);

            // 1) Crear la propiedad (JSON)
            const response = await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedData)
            });

            const result = await response.json().catch(() => null);
            console.log("Respuesta de create property:", result);

            if (!response.ok) {
                let errorMessage = "Ocurrió un error en el servidor al crear la propiedad.";
                if (result?.errors) {
                    if (Array.isArray(result.errors)) {
                        errorMessage = `Error de validación: ${result.errors.join(", ")}`;
                    } else if (typeof result.errors === "object") {
                        const msgs = Object.entries(result.errors)
                            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
                            .join("; ");
                        errorMessage = `Errores de validación: ${msgs}`;
                    } else {
                        errorMessage = `Error: ${result.errors}`;
                    }
                } else if (result?.message) {
                    errorMessage = result.message;
                } else if (result?.error) {
                    errorMessage = result.error;
                }
                throw new Error(errorMessage);
            }

            console.log("propiedad creada con exito, ahora a subir imagenes");
            console.log("result class: "+result.class);
            console.log("result: "+result.property);

            // Determinar el id creado (flexible según la forma de respuesta)
            const createdId =
                result?.idProperty ||
                result?.property?.idProperty ||
                result?.property?.id ||
                result?.data?.id ||
                (result && typeof result === "number" ? result : undefined);

            if (!createdId) {
                console.warn("No se pudo determinar el id de la propiedad creada. result:", result);
                setStatus({ message: "Propiedad creada pero no se pudo obtener su id.", type: "error" });
                setIsCreating(false);
                return result;
            }

            setStatus({ message: "Propiedad creada. Subiendo recursos (imágenes y características)...", type: "success" });

            // 2) Subir imágenes (si hay). propertyData.images = [{ file: File }, ...]
            const uploadImageResults: Array<{ ok: boolean; data?: any; error?: any }> = [];
            if (propertyData.images && Array.isArray(propertyData.images) && propertyData.images.length > 0) {
                console.log(`Subiendo ${propertyData.images.length} imágenes para property ${createdId}`);
                // Subir en paralelo con Promise.all
                // dentro del map de uploads en tu hook
                const uploads = propertyData.images.map(async (imgObj, idx) => {
                    try {
                        // Normalizar: soporta File | { file: File } | dataURL string | url string
                        let file: File | null = null;

                        // Caso 1: si directamente es un File
                        if (imgObj instanceof File) {
                            file = imgObj as File;
                        }

                        // Caso 2: si es un objeto con propiedad file (ej: { file: File })
                        if (!file && (imgObj as any)?.file) {
                            const possible = (imgObj as any).file;
                            if (possible instanceof File) {
                                file = possible;
                            } else if (typeof possible === "string") {
                                // posible dataURL o url dentro de .file
                                const maybeUrl = possible as string;
                                if (maybeUrl.startsWith("data:") || maybeUrl.startsWith("http")) {
                                    const resp = await fetch(maybeUrl);
                                    const blob = await resp.blob();
                                    file = new File([blob], (imgObj as any).filename || `img_${idx}.jpg`, { type: blob.type });
                                }
                            }
                        }

                        // Caso 3: si imgObj es string (dataURL o url)
                        if (!file && (imgObj as any)?.file) {
                            const possible = (imgObj as any).file as File | string;
                            if (possible instanceof File) {
                                file = possible;
                            } else if (typeof possible === "string") {
                                const maybeUrl: string = possible; // 👈 acá lo forzás a string
                                if (maybeUrl.startsWith("data:") || maybeUrl.startsWith("http")) {
                                    const resp = await fetch(maybeUrl);
                                    const blob = await resp.blob();
                                    file = new File([blob], (imgObj as any).filename || `img_${idx}.jpg`, { type: blob.type });
                                }
                            }
                        }


                        // Si aún no tenemos File, falla con mensaje claro
                        if (!file) {
                            throw new Error(`Imagen ${idx} no es un File válido. Valor recibido: ${JSON.stringify(imgObj).slice(0, 200)}`);
                        }

                        // Opcional: logs de verificación (borralos en prod)
                        console.log(`Preparando imagen ${idx}:`, { name: file.name, size: file.size, type: file.type });

                        const formData = new FormData();
                        formData.append("file", file);

                        const resp = await fetch(`/api/properties/${createdId}/image`, {
                            method: "POST",
                            body: formData,
                        });

                        if (!resp.ok) {
                            const text = await resp.text().catch(() => null);
                            throw new Error(`Error subiendo imagen ${idx}: ${resp.status} ${text ?? ""}`);
                        }

                        const json = await resp.json().catch(() => null);
                        console.log("Imagen subida OK:", json);
                        uploadImageResults.push({ ok: true, data: json });
                        return { ok: true, data: json };
                    } catch (err) {
                        console.error("Error subiendo imagen:", err);
                        uploadImageResults.push({ ok: false, error: err instanceof Error ? err.message : err });
                        return { ok: false, error: err };
                    }
                });


                // Esperar todas las subidas
                await Promise.all(uploads);
            }

            // 3) Enviar características (si hay) al endpoint /api/characteristics
            const characteristicsResults: Array<{ ok: boolean; data?: any; error?: any }> = [];
            if (cleanedData.characteristics && Array.isArray(cleanedData.characteristics) && cleanedData.characteristics.length > 0) {
                try {
                    // Adjuntamos propertyId a cada caracteristica
                    const payload = cleanedData.characteristics.map((ch: any) => ({
                        ...ch,
                        property_id: createdId,
                        property: result.property
                    }));

                    const resp = await fetch(`/api/characteristics`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ characteristics: payload })
                    });

                    const json = await resp.json().catch(() => null);
                    characteristicsResults.push({ ok: resp.ok, data: json });

                    if (!resp.ok) {
                        console.error("Error creando características (batch):", json);
                        // fallback: intentar uno por uno
                        for (const ch of payload) {
                            try {
                                const respSingle = await fetch(`/api/characteristics`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(ch)
                                });
                                const singleJson = await respSingle.json().catch(() => null);
                                characteristicsResults.push({ ok: respSingle.ok, data: singleJson });
                            } catch (e) {
                                characteristicsResults.push({ ok: false, error: e });
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error en creación batch de características:", err);
                    characteristicsResults.push({ ok: false, error: err });
                }
            }

            // 4) Resultado final: podés retornar info combinada
            const finalResult = {
                property: result?.property ?? result,
                id: createdId,
                imagesResults: uploadImageResults,
                characteristicsResults
            };

            // Redirección después de todo (si querés esperar a uploads)
            setTimeout(() => {
                router.push(`/propiedades/ficha/${createdId}`);
            }, 1200);

            setIsCreating(false);
            return finalResult;
        } catch (error) {
            console.error("Error al crear la propiedad:", error);
            let message = "Error desconocido al crear la propiedad.";
            if (error instanceof Error) message = error.message;
            setStatus({ message, type: "error" });
            setIsCreating(false);
            return null;
        }
    };

    const clearStatus = () => setStatus(null);

    const validatePropertyData = (data: CreatePropertyData): string[] => {
        const errors: string[] = [];
        if (!data.address || data.address.trim() === "" || data.address === "Dirección") errors.push("La dirección es obligatoria");
        if (!data.price || data.price <= 0) errors.push("El precio debe ser mayor a 0");
        if (!data.type) errors.push("El tipo de propiedad es obligatorio");
        if (!data.category) errors.push("La operación (venta/alquiler) es obligatoria");
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
