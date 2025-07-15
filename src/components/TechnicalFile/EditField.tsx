import React, { useState, useRef, useEffect } from 'react';

interface EditableFieldProps {
    value: string | number;
    isEditing: boolean;
    type: string;
    className?: string;
    onSave: (value: string|number ) => void;
    onCancel: () => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
                                                         value,
                                                         isEditing,
                                                         type = "text",
                                                         className,
                                                         onSave,
                                                         onCancel
                                                     }) => {

    const [tempValue, setTempValue] = useState<string | number>(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);


    const handleSave = () => {
        onSave(tempValue);
    };

    const handleCancel = () => {
        setTempValue(tempValue);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.target.value);
    };


    if (isEditing) {
        return (
            <input
                ref={inputRef}
                type={type}
                className={className}
                value={tempValue}
                onChange={handleInputChange}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
            />
        );
    }

    return (
        <span
            style={{ cursor: 'pointer' }}
            title="Click para editar"
        >
            {value}
        </span>
    );
};

export default EditableField;