import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import Image from "next/image";
import { Characteristic, CharacteristicCategory } from "@/types/Characteristic";
import EditableNumericField from "@/components/TechnicalFile/EditableField/EditableNumericField";
import EditableTextField from "@/components/TechnicalFile/EditableField/EditableTextField";
import React from "react";

type Props = {
    imgSrc: string;
    label: string;
    characteristic: Characteristic;
    isEditing: boolean;

    onSave: (newValue: number | string) => void;
    id: number;
    type: string;
    onDelete?: () => void;
  showDeleteButton: boolean;
};

export default function Item({
                                 imgSrc,
                                 label,
                                 characteristic,
                                 isEditing,
                                 onSave,
                                 type,
                                 onDelete
                             }: Props) {


    const isItem = type === "item";
    const dataType = characteristic.data_type || 'text';


    const handleSave = (value: number | string) => {
        console.log(`Item con ID ${characteristic.id} guardando el valor:`, value);
        onSave(value);
    };

    const handleCancelEdit = () => {
        // La lógica de cancelar también la maneja el padre si es necesario.
        console.log("Edición cancelada en el item.");
    };

    const renderEditableField = () => {
        if (dataType === 'integer') {
            return (
                <EditableNumericField
                    // Usamos los valores directamente de las props
                    value={characteristic.value_integer ?? 0}
                    isEditing={isEditing}
                    // Pasamos nuestra nueva función handleSave
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                    className={styles.editInputProperties}
                />
            );
        } else {
            return (
                <EditableTextField
                    value={characteristic.value_text ?? ''}
                    isEditing={isEditing}
                    type="text"
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                    className={styles.editInputProperties}
                />
            );
        }
    };




    return (
        <div className={`${isItem ? styles.itemProperties : styles.infoCardProperties}`}>
            <div className={styles.itemInfo}>
                <Image
                    src={imgSrc || "/icons/agua.png"}
                    alt={'icono acorde a la informacion proporcionada'}
                    width={20}
                    height={20}
                />
                <h5>
                    {label}: {renderEditableField()}
                </h5>
            </div>
            {onDelete && (
                <button
                    onClick={onDelete}
                    className={styles.deleteButton}
                >
                    <h5>✖</h5>
                </button>
            )}
        </div>
    );
}