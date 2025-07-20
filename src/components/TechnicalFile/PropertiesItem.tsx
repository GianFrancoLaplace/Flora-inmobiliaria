import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import Image from "next/image";
import EditableField from "@/components/TechnicalFile/EditableField/EditableTextField";
import {useState} from "react";
import {Characteristic, CharacteristicCategory} from "@/types/Characteristic";
import EditableNumericField from "@/components/TechnicalFile/EditableField/EditableNumericField";
import EditableTextField from "@/components/TechnicalFile/EditableField/EditableTextField";

type Props = {
    imgSrc: string;
    label: string;
    value: string | number;
    characteristic: Characteristic;
    isEditing: boolean
    onSave: (category: CharacteristicCategory, newValue: string) => void;
    id: number;
    type: string
};

export default function Item({ imgSrc, label, characteristic, isEditing, type }: Props) {
    // const [editingField, setEditingField] = useState<keyof Characteristic | null>(null);
    const [localCharacterisctic, setLocalCharacterisctic] = useState<Characteristic>(characteristic);

    const isItem = type === "item";

    const dataType = characteristic.data_type || 'text';

    const handleSaveField = async (value : number | string) => {
        console.log(value);
        if (typeof value === "string") {
            value = parseInt(value);
        }
        setLocalCharacterisctic(prev => ({ ...prev, ["amount"]: value }));
    };

    const handleCancelEdit = () => {
        console.log("hola");
    };


    const renderEditableField = () => {
        if (dataType === 'integer') {
            return (
                <EditableNumericField
                    value={characteristic.value_integer as number}
                    isEditing={isEditing}
                    onSave={handleSaveField}
                    onCancel={handleCancelEdit}
                    className={styles.editInputProperties}
                    min={0} // Opcional: valores mínimos como mi autoestima
                    max={999999} // Opcional: valores máximos más realistas que mis fantasías
                />
            );
        } else {
            return (
                <EditableTextField
                    value={characteristic.value_text as string}
                    isEditing={isEditing}
                    type="text"
                    onSave={handleSaveField}
                    onCancel={handleCancelEdit}
                    className={styles.editInputProperties}
                />
            );
        }
    }
    return (
        <div className={`${isItem ? styles.itemProperties : styles.infoCardProperties}`}>
            <Image
                src={imgSrc}
                alt={'icono acorde a la informacion proporcionada'}
                width={20}
                height={20}
            />
            <h5>
                {label}: {renderEditableField()}
            </h5>
        </div>
    )
}