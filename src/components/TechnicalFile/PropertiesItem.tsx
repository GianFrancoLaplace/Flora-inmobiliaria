import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import Image from "next/image";
import EditableField from "@/components/TechnicalFile/EditField";
import {useState} from "react";
import {Characteristic, CharacteristicCategory, Property} from "@/types/Property";

type Props = {
    imgSrc: string;
    label: string;
    value: string;
    property: Property;
    isEditing: boolean
    onSave: (field: CharacteristicCategory, value: string | number) => void;
    category: CharacteristicCategory;
};

export default function Item({ imgSrc, label, value, property, isEditing, category, onSave }: Props) {
    const [editingField, setEditingField] = useState<keyof Property | null>(null);
    const [localProperty, setLocalProperty] = useState<Property>(property);

    console.log(editingField)

    const handleSaveField = async (fieldName: keyof Property, value: string | number) => {
        console.log(`Guardando ${fieldName}:`, value);

        setLocalProperty(prev => ({ ...prev, [fieldName]: value }));

        setEditingField(null)
        console.log("2. LocalProperty después del update:", localProperty); // Para debug
        // Implementar llamada a la API
    };

    const handleCancelEdit = () => {
        console.log(`Cancelando edición`);

        setEditingField(null);
    };

    return (
        <div className={styles.itemProperties}>
            <Image
                src={imgSrc}
                alt={'icono acorde a la informacion proporcionada'}
                width={20}
                height={20}
            />
            <h5>
                {label}:
                <EditableField
                    value={value}
                    isEditing={isEditing}
                    type={"text"}
                    onSave={(newValue) => onSave(category, newValue)}
                    onCancel={handleCancelEdit}
                    className={styles.inputProperties}
                />
            </h5>
        </div>
    )
}