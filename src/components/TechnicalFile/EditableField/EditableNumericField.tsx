import React, {useEffect, useRef, useState} from "react";
import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import {cactus} from "@/app/(views)/ui/fonts";

interface EditableNumericFieldProps {
    value: number;
    isEditing: boolean;
    className?: string;
    onSave: (value: number) => void;
    onCancel: () => void;
    min?: number;
    max?: number;
}

const EditableNumericField: React.FC<EditableNumericFieldProps> = ({
                                                                       value,
                                                                       isEditing,
                                                                       className,
                                                                       onSave,
                                                                       onCancel,
                                                                       min,
                                                                       max
                                                                   }) => {
    const [tempValue, setTempValue] = useState<number>(value);
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
        const numericValue = tempValue;

        if (isNaN(numericValue)) {
            handleCancel();
            return;
        }

        const constrainedValue = Math.min(
            Math.max(numericValue, min ?? -Infinity),
            max ?? Infinity
        );

        onSave(constrainedValue);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const inputNumber = parseInt(inputValue);
        setTempValue(inputNumber);
    };

    if (isEditing) {
        return (
            <div className={`${styles.numericField} ${cactus.className}`}>
                <input
                    ref={inputRef}
                    type="text"
                    className={className}
                    value={tempValue}
                    onChange={handleInputChange}
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

export default EditableNumericField;