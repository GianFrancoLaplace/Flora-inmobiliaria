'use client';
import {useCallback, useState} from "react";

const States : { [key: string]: string } = {
    sold : "VENDIDA",
    rent : "ALQUILADA",
    buy: "EN VENTA"
};

console.log(States);

interface Property{
    id: number;
    address: string;
    city: string;
    state: string;
    price: number;
    description: string;
}

function getEmptyProperty() : Property{
    return {
        address: "", city: "", description: "", id: 0, price: 0, state: ""
    }
}


export const useTechnicalSheet = (mode: 'view' | 'create' | 'edit', initialProperty?: Property) => {
    // 🎯 Estado principal
    const [property, setProperty] = useState(initialProperty || getEmptyProperty());

    // 🎛️ Estado de edición por campo (¡CLAVE!)
    const [editingFields, setEditingFields] = useState<Record<string, boolean>>({});
    // const [errors, setErrors] = useState('');

    // ✏️ Activar edición de un campo específico
    const startEditing = useCallback((fieldName: string) => {
        setEditingFields(prev => ({ ...prev, [fieldName]: true }));
    }, []);

    // ✅ Confirmar edición de un campo
    const confirmEdit = useCallback((fieldName: string) => {
        // TODO: Validar el campo específico
        // TODO: Si OK, desactivar edición
        setEditingFields(prev => ({ ...prev, [fieldName]: false }));
    }, []);

    // ❌ Cancelar edición
    const cancelEdit = useCallback((fieldName: string) => {
        // TODO: Revertir cambios del campo
        setEditingFields(prev => ({ ...prev, [fieldName]: false }));
    }, []);

    // 📝 Actualizar campo
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
        // Estados útiles
        isViewMode: mode === 'view',
        isCreateMode: mode === 'create'
    };
};
