import React, { useState, useRef, useEffect } from 'react';
import styles from '../TechnicalSheet.module.css';
import {cactus} from "@/app/(views)/ui/fonts";

interface EditableTextFieldProps {
    value: string;
    isEditing: boolean;
    type?: 'text' | 'email' | 'url';
    className?: string;
    onSave: (value: string) => void;
    onCancel: () => void;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
                                                                 value,
                                                                 isEditing,
                                                                 type = 'text',
                                                                 className,
                                                                 onSave,
                                                                 onCancel
                                                             }) => {
    const [tempValue, setTempValue] = useState<string>(value);
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
        onSave(tempValue.trim());
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

    if (isEditing) {
        return (
            <div className={`${styles.field} ${cactus.className}`}>
                <input
                    ref={inputRef}
                    type={type}
                    className={className}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                />
            </div>
        );
    }

    return (
        <span style={{cursor: 'pointer'}} title="Click para editar">
            {value}
        </span>
    );
};

export default EditableTextField;