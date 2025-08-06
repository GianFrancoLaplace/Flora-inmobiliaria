'use client'

import styles from './characteristicsForm.module.css';
import { useState, useEffect } from "react";
import { Characteristic, CharacteristicCategory, CharacteristicCreate } from "@/types/Characteristic";
import Item from '../PropertiesItem';
import {cactus} from "@/app/(views)/ui/fonts";

type SubFeature = {
    name: string;
    inputType: "number" | "text" | "date";
};

type Feature = {
    name: string;
    inputType: "number" | "text" | "date";
    subtypes?: SubFeature[];
};

type CharacteristicsFormProps = {
    onCharacteristicsChange?: (characteristics: CharacteristicCreate[]) => void;
    initialCharacteristics?: CharacteristicCreate[];
    propertyId?: number;
};

//available characteristics
const FEATURES: Feature[] = [
    { name: "Superficie", inputType: "number", subtypes: [
        { name: "Total", inputType: "number" },
        { name: "Cubierta", inputType: "number" },
        { name: "Descubierta", inputType: "number" },
        { name: "Semicubierta", inputType: "number" },
    ]},
    { name: "Ambientes", inputType: "number" },
    { name: "Dormitorios", inputType: "number", subtypes: [
        { name: "Total", inputType: "number" },
        { name: "En Suite", inputType: "number" },
    ]},
    { name: "Baños", inputType: "number" },
    { name: "Cocheras", inputType: "number", subtypes: [
        { name: "Cantidad", inputType: "number" },
        { name: "Cobertura cochera", inputType: "text" },
    ]},
    { name: "Balcón/Terraza", inputType: "text" },
    { name: "Expensas", inputType: "text", subtypes: [
        { name: "Valor", inputType: "number" },
        { name: "Fecha", inputType: "date" },
    ]},
    { name: "Agua", inputType: "text" },
    { name: "Tipo de piso", inputType: "text" },
    { name: "Estado del inmueble", inputType: "text" },
    { name: "Orientación", inputType: "text" },
    { name: "Luminosidad", inputType: "text" },
    { name: "Disposición", inputType: "text" },
    { name: "Antigüedad", inputType: "text" },
    { name: "Ubicación en la cuadra", inputType: "text" },
    { name: "Cantidad de plantas", inputType: "number" },
];

//map
const CATEGORY_MAP: Record<string, CharacteristicCategory> = {
    "Superficie - Total": CharacteristicCategory.SUPERFICIE_TOTAL,
    "Superficie - Cubierta": CharacteristicCategory.SUPERFICIE_CUBIERTA,
    "Superficie - Descubierta": CharacteristicCategory.SUPERFICIE_DESCUBIERTA,
    "Superficie - Semicubierta": CharacteristicCategory.SUPERFICIE_SEMICUBIERTA,
    "Ambientes": CharacteristicCategory.AMBIENTES,
    "Dormitorios": CharacteristicCategory.DORMITORIOS,
    "Dormitorios - Total": CharacteristicCategory.DORMITORIOS,
    "Dormitorios - En Suite": CharacteristicCategory.DORMITORIOS_SUITE,
    "Baños": CharacteristicCategory.BANOS,
    "Cocheras": CharacteristicCategory.COCHERAS,
    "Cocheras - Cantidad": CharacteristicCategory.COCHERAS,
    "Cocheras - Cobertura cochera": CharacteristicCategory.COBERTURA_COCHERA,
    "Balcón/Terraza": CharacteristicCategory.BALCON_TERRAZA,
    "Expensas": CharacteristicCategory.EXPENSAS,
    "Expensas - Valor": CharacteristicCategory.EXPENSAS,
    "Expensas - Fecha": CharacteristicCategory.FECHA_EXPENSA,
    "Agua": CharacteristicCategory.AGUA,
    "Tipo de piso": CharacteristicCategory.TIPO_PISO,
    "Estado del inmueble": CharacteristicCategory.ESTADO_INMUEBLE,
    "Orientación": CharacteristicCategory.ORIENTACION,
    "Luminosidad": CharacteristicCategory.LUMINOSIDAD,
    "Disposición": CharacteristicCategory.DISPOSICION,
    "Antigüedad": CharacteristicCategory.ANTIGUEDAD,
    "Ubicación en la cuadra": CharacteristicCategory.UBICACION_CUADRA,
    "Cantidad de plantas": CharacteristicCategory.CANTIDAD_PLANTAS,
};

export default function CharacteristicsForm({
    onCharacteristicsChange,
    initialCharacteristics = [],
    propertyId = 0
}: CharacteristicsFormProps) {
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [selectedSubtype, setSelectedSubtype] = useState<SubFeature | null>(null);
    const [inputValue, setInputValue] = useState<string | number>("");
    const [characteristics, setCharacteristics] = useState<CharacteristicCreate[]>(initialCharacteristics);

    useEffect(() => {
        if (onCharacteristicsChange) {
            onCharacteristicsChange(characteristics);
        }
    }, [characteristics, onCharacteristicsChange]);

    const handleSubmit = () => {
        if (!selectedFeature) {
            alert('Por favor selecciona una característica');
            return;
        }

        if (!inputValue || inputValue === "") {
            alert('Por favor ingresa un valor');
            return;
        }

        const fullLabel = selectedSubtype
            ? `${selectedFeature.name} - ${selectedSubtype.name}`
            : selectedFeature.name;

        const existingChar = characteristics.find(char => char.characteristic === fullLabel);
        if (existingChar) {
            alert('Esta característica ya existe. Puedes editarla desde la lista.');
            return;
        }

        const category = CATEGORY_MAP[fullLabel] ?? CharacteristicCategory.OTROS;
        const inputType = selectedSubtype?.inputType ?? selectedFeature.inputType;

        const characteristicData: CharacteristicCreate = {
            id: Date.now(),
            characteristic: fullLabel,
            property_id: propertyId,
            data_type: inputType === "number" ? "integer" : "text",
            value_integer: inputType === "number" ? Number(inputValue) : undefined,
            value_text: inputType === "text" || inputType === "date" ? String(inputValue) : undefined,
            category: category,
            iconUrl: getIconForCategory(category),
        };

        setCharacteristics((prev) => [...prev, characteristicData]);
        resetForm();
    };

    const handleDelete = (index: number) => {
        setCharacteristics(prev => prev.filter((_, i) => i !== index));
    };

    const getIconForCategory = (category: CharacteristicCategory): string => {
        const iconMap: Record<CharacteristicCategory, string> = {
            [CharacteristicCategory.SUPERFICIE_TOTAL]: '/icons/sup.png',
            [CharacteristicCategory.SUPERFICIE_CUBIERTA]: '/icons/sup.png',
            [CharacteristicCategory.SUPERFICIE_DESCUBIERTA]: '/icons/sup.png',
            [CharacteristicCategory.SUPERFICIE_SEMICUBIERTA]: '/icons/sup.png',
            [CharacteristicCategory.AMBIENTES]: '/icons/ambientes.png',
            [CharacteristicCategory.DORMITORIOS]: '/icons/dormitorios.png',
            [CharacteristicCategory.DORMITORIOS_SUITE]: '/icons/dormitorios.png',
            [CharacteristicCategory.BANOS]: '/icons/banos.png',
            [CharacteristicCategory.COCHERAS]: '/icons/cochera.png',
            [CharacteristicCategory.COBERTURA_COCHERA]: '/icons/cochera.png',
            [CharacteristicCategory.BALCON_TERRAZA]: '/icons/balcon.png',
            [CharacteristicCategory.EXPENSAS]: '/icons/expensas.png',
            [CharacteristicCategory.FECHA_EXPENSA]: '/icons/expensas.png',
            [CharacteristicCategory.AGUA]: '/icons/agua.png',
            [CharacteristicCategory.TIPO_PISO]: '/icons/piso.png',
            [CharacteristicCategory.ESTADO_INMUEBLE]: '/icons/estado.png',
            [CharacteristicCategory.ORIENTACION]: '/icons/orientacion.png',
            [CharacteristicCategory.LUMINOSIDAD]: '/icons/luz.png',
            [CharacteristicCategory.DISPOSICION]: '/icons/disposicion.png',
            [CharacteristicCategory.ANTIGUEDAD]: '/icons/antiguedad.png',
            [CharacteristicCategory.UBICACION_CUADRA]: '/icons/ubicacion.png',
            [CharacteristicCategory.CANTIDAD_PLANTAS]: '/icons/plantas.png',
            [CharacteristicCategory.OTROS]: '/icons/default.png',
        };
        return iconMap[category] || '/icons/agua.png';
    };

    const resetForm = () => {
        setSelectedFeature(null);
        setSelectedSubtype(null);
        setInputValue("");
    };

    const clearAllCharacteristics = () => {
        if (characteristics.length > 0) {
            const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar todas las características?');
            if (confirmDelete) {
                setCharacteristics([]);
            }
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <label><h3>Característica:</h3></label>
                    <select
                        value={selectedFeature?.name || ""}
                        onChange={(e) => {
                            const feature = FEATURES.find(f => f.name === e.target.value) || null;
                            setSelectedFeature(feature);
                            setSelectedSubtype(null);
                            setInputValue("");
                        }}
                    >
                        <option value="">Seleccionar característica</option>
                        {FEATURES.map((feature) => (
                            <option key={feature.name} value={feature.name}>{feature.name}</option>
                        ))}
                    </select>
                </div>

                {selectedFeature?.subtypes && (
                    <div className={styles.field}>
                        <label><h5>Variante:</h5></label>
                        <select
                            value={selectedSubtype?.name || ""}
                            onChange={(e) => {
                                const subtype = selectedFeature.subtypes?.find(s => s.name === e.target.value) || null;
                                setSelectedSubtype(subtype);
                                setInputValue("");
                            }}
                        >
                            <option value="">Seleccionar...</option>
                            {selectedFeature.subtypes.map((sub) => (
                                <option key={sub.name} value={sub.name}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {(selectedFeature && (!selectedFeature.subtypes || selectedSubtype)) && (
                    <div className={styles.field}>
                        <label><h5>Valor:</h5></label>
                        <input
                            type={selectedSubtype?.inputType ?? selectedFeature?.inputType ?? "text"}
                            value={inputValue}
                            onChange={(e) => {
                                const inputType = selectedSubtype?.inputType ?? selectedFeature?.inputType;
                                if (inputType === "number") {
                                    const numValue = e.target.value;
                                    setInputValue(numValue === "" ? "" : Number(numValue));
                                } else {
                                    setInputValue(e.target.value);
                                }
                            }}
                            placeholder={
                                selectedSubtype?.inputType === "number" || selectedFeature?.inputType === "number"
                                    ? "Ingrese un número"
                                    : selectedSubtype?.inputType === "date" || selectedFeature?.inputType === "date"
                                    ? "Seleccione una fecha"
                                    : "Ingrese el valor"
                            }
                            min={selectedSubtype?.inputType === "number" || selectedFeature?.inputType === "number" ? "0" : undefined}
                        />
                    </div>
                )}

                <div className={styles.formButtons}>
                    <button
                        className={styles.addCharacteristicButton}
                        onClick={handleSubmit}
                        disabled={!selectedFeature || !inputValue || inputValue === ""}
                        title="Agregar característica"
                    >
                        <h5 className={cactus.className}>Agregar ✔</h5>
                    </button>
                    <button
                        type="button"
                        className={styles.addCharacteristicButton}
                        onClick={resetForm}
                        title="Limpiar formulario"
                    >
                        <h5 className={cactus.className}>Recargar ↻</h5>
                    </button>
                </div>
            </div>

            {characteristics.length > 0 && (
                <div className={styles.characteristicsList}>
                    <div className={styles.formButtons}>
                        <h5>Características agregadas ({characteristics.length})</h5>
                        <button
                            onClick={clearAllCharacteristics}
                            className={`${styles.clearAllButton} ${cactus.className}`}
                        >
                            <h6>Limpiar todas</h6>
                        </button>
                    </div>
                    <div className={styles.characteristicsGrid}>
                        {characteristics.map((c, index) => (
                            <Item
                                key={`char-${index}-${c.id}`}
                                imgSrc={c.iconUrl || "/icons/agua.png"}
                                label={c.characteristic}
                                characteristic={{
                                    id: c.id,
                                    characteristic: c.characteristic,
                                    value_integer: c.value_integer,
                                    value_text: c.value_text,
                                    data_type: c.data_type,
                                }}
                                isEditing={false}
                                id={index}
                                type="item"
                                onSave={() => {}}
                                onDelete={() => handleDelete(index)}
                                showDeleteButton={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {characteristics.length === 0 && (
                <div style={{ textAlign: 'center', color: '#666', margin: '20px 0', fontStyle: 'italic' }}>
                    No hay características agregadas aún
                </div>
            )}
        </main>
    );
}
