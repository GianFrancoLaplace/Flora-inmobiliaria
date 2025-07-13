'use client';
import {useCallback, useEffect, useState} from "react";
import {Property} from "@/types/Property"


export const usePropertyEditor = (mode: 'view' | 'create' | 'edit', initialProperty: Property) => {
    // Estado principal
    const [property, setProperty] = useState(initialProperty);

    // Estado de edición por campo
    const [editingFields, setEditingFields] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (initialProperty) {
            setProperty({...initialProperty})
        }
    }, [initialProperty])

    // Activar edición de un campo específico
    const startEditing = useCallback((fieldName: string) => { // fieldName puede ser cualquier campo
        // prev, mantiene todos lo datos previos, se especifica solo que cambiar
        setEditingFields(prev => ({ ...prev, [fieldName]: true }));
    }, []);

    // Confirmar edición de un campo
    const confirmEdit = useCallback((fieldName: string) => {
        // const result = Service.updateAsync
        console.log(`Guardando edición de: ${fieldName}`, property[fieldName as keyof Property]);

        const isSuccess = true;
        if(isSuccess) // result.isSuccess
            setEditingFields(prev => ({...prev, [fieldName]: false }));
        else
            cancelEdit(fieldName)
    }, [property]);

    // Cancelar edición
    const cancelEdit = useCallback((fieldName: string, error? : string) => {
        setEditingFields(prev => ({ ...prev, [fieldName]: false }));
        if(error)
            console.error(error); // Implementar mensaje de error
    }, []);

    // Actualizar campo
    const updateField = useCallback((fieldName: string, value: string | number) => {
        console.log(fieldName, value);
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
