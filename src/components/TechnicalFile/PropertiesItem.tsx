import styles from "@/components/TechnicalFile/TechnicalSheet.module.css";
import Image from "next/image";
import EditableField from "@/components/TechnicalFile/EditField";
import {useState} from "react";
import {Characteristic, CharacteristicCategory} from "@/types/Property";

type Props = {
    imgSrc: string;
    label: string;
    value: string;
    characterisctic: Characteristic;
    isEditing: boolean
    onSave: (category: CharacteristicCategory, newValue: string) => void;
    id: number;
    type: string
};

export default function Item({ imgSrc, label, characterisctic, isEditing, type }: Props) {
    // const [editingField, setEditingField] = useState<keyof Characteristic | null>(null);
    const [localCharacterisctic, setLocalCharacterisctic] = useState<Characteristic>(characterisctic);

    const isItem = type === "item";

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

    return (
        <div className={`${isItem ? styles.itemProperties : styles.infoCardProperties}`}>
            <Image
                src={imgSrc}
                alt={'icono acorde a la informacion proporcionada'}
                width={20}
                height={20}
            />
            <h5>
                {label}: <EditableField
                    value={localCharacterisctic.amount}
                    isEditing={isEditing}
                    type={"text"}
                    onSave={handleSaveField}
                    onCancel={handleCancelEdit}
                    className={styles.editInputProperties}
                />
            </h5>
        </div>
    )
}