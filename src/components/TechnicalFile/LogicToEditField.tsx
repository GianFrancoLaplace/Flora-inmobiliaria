// hooks/useFichaEditable.ts
import { useState } from "react";
import { Property } from "@/types/Property"; // Ajustá esto según tu estructura

export function useFichaEditable(initialProperty: Property, mode: "create" | "edit" | "view") {
    const [editingField, setEditingField] = useState<keyof Property | null>(null);
    const [localProperty, setLocalProperty] = useState<Property>(initialProperty);

    const isEmptyFile = mode === "create";
    const isEditableFile = mode !== "view";

    const handleStartEdit = (fieldName: keyof Property) => setEditingField(fieldName);

    const handleSaveField = async (fieldName: keyof Property, value: string | number) => {
        setLocalProperty((prev) => ({ ...prev, [fieldName]: value }));
        setEditingField(null);
        // Lógica para guardar en base de datos, si aplica
    };

    const handleCancelEdit = () => setEditingField(null);

    return {
        editingField,
        localProperty,
        isEmptyFile,
        isEditableFile,
        handleStartEdit,
        handleSaveField,
        handleCancelEdit,
        setLocalProperty,
    };
}
