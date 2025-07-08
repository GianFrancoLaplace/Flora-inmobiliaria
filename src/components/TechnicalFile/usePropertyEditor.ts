'use client';
import {useCallback, useState} from "react";
import {Property, PropertyState, PropertyType} from "@/app/models/Property/Property"

function getEmptyProperty() : Property{
    return {
        address: "",
        city: "",
        description: "",
        id: 0,
        price: 0,
        state: PropertyState.RENT,
        type: PropertyType.HOME,
        bathrooms: 0,
        bedrooms: 0,
        squareMeters: 0
    }
}

export const usePropertyEditor = (mode: 'view' | 'create' | 'edit', initialProperty?: Property) => {
    // Estado principal
    const [property, setProperty] = useState(initialProperty || getEmptyProperty());

    // Estado de edición por campo
    const [editingFields, setEditingFields] = useState<Record<string, boolean>>({});

    // Activar edición de un campo específico
    const startEditing = useCallback((fieldName: string) => { // fieldName puede ser cualquier campo
        // prev, mantiene todos lo datos previos, se especifica solo que cambiar
        setEditingFields(prev => ({ ...prev, [fieldName]: true }));
    }, []);

    // Confirmar edición de un campo
    const confirmEdit = useCallback((fieldName: string) => {
        // const result = Service.updateAsync
        const isSuccess = true;
        if(isSuccess) // result.isSuccess
            setEditingFields(prev => ({...prev, [fieldName]: false }));
        else
            cancelEdit(fieldName)
    }, []);

    // Cancelar edición
    const cancelEdit = useCallback((fieldName: string, error? : string) => {
        setEditingFields(prev => ({ ...prev, [fieldName]: false }));
        if(error)
            console.error(error); // Implementar mensaje de error
    }, []);

    // Actualizar campo
    const updateField = useCallback((fieldName: string, value: string | number) => {
        setProperty(prev => ({ ...prev, [fieldName]: value }));
    }, []);

    return {
        property,
        editingFields,
        // errors,
        // Funciones por campo
        startEditing,
        confirmEdit,
        cancelEdit,
        updateField,
        isViewMode: mode === 'view',
        isEditMode: mode === 'edit',
        isCreateMode: mode === 'create'
    };
};
