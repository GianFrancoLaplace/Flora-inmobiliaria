import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface EditableSelectFieldProps {
    value: string;
    options: SelectOption[];
    isEditing: boolean;
    className?: string;
    onSave: (value: string) => void;
    onCancel: () => void;
    placeholder?: string;
}

const EditableSelectField: React.FC<EditableSelectFieldProps> = ({
                                                                     value,
                                                                     options,
                                                                     isEditing,
                                                                     className,
                                                                     onSave,
                                                                     onCancel,
                                                                     placeholder = "Seleccionar..."
                                                                 }) => {
    const [tempValue, setTempValue] = useState<string>(value);
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && selectRef.current) {
            selectRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        onSave(tempValue);
    };

    const handleCancel = () => {
        setTempValue(value);
        onCancel();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            handleCancel();
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTempValue(e.target.value);
    };

    // Encontrar el label del valor actual para mostrar
    const currentOption = options.find(option => option.value === value);
    const displayLabel = currentOption ? currentOption.label : value;

    if (isEditing) {
        return (
            <select
                ref={selectRef}
                className={className}
                value={tempValue}
                onChange={handleSelectChange}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <span style={{ cursor: 'pointer' }} title="Click para editar">
            {displayLabel}
        </span>
    );
};

export default EditableSelectField;